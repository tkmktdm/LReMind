import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";

const DELETE_THRESHOLD = 72; // px: この幅を超えたらスナップして削除ボタンを表示

type Props = {
  id: string;
  onDelete: (id: string) => void;
  children: React.ReactNode;
};

export const SwipeableTask = ({ id, onDelete, children }: Props) => {
  const [offset, setOffset] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(id), 350);
  };

  const handleCancel = () => {
    setOffset(0);
    setIsRevealed(false);
  };

  const handlers = useSwipeable({
    onSwiping: (e) => {
      if (isDeleting) return;
      if (e.dir === "Left") {
        if (isRevealed) {
          // 2回目スワイプ: DELETE_THRESHOLD を起点にさらに左へ追従
          setOffset(-DELETE_THRESHOLD - e.absX);
        } else {
          // 1回目スワイプ: DELETE_THRESHOLD まで追従
          setOffset(Math.max(-DELETE_THRESHOLD, -e.absX));
        }
      } else if (e.dir === "Right" && isRevealed) {
        setOffset(Math.min(0, -DELETE_THRESHOLD + e.absX));
      }
    },
    onSwipedLeft: (e) => {
      if (isDeleting) return;
      if (isRevealed) {
        // 2回目の左スワイプ → 削除
        handleDeleteConfirm();
      } else if (e.absX >= DELETE_THRESHOLD / 2) {
        // 1回目: 閾値を超えたらスナップして削除ボタンを表示
        setOffset(-DELETE_THRESHOLD);
        setIsRevealed(true);
      } else {
        setOffset(0);
      }
    },
    onSwipedRight: () => {
      if (isDeleting) return;
      setOffset(0);
      setIsRevealed(false);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (isDeleting) {
    return (
      <motion.div
        style={{ overflow: "hidden", position: "relative" }}
        initial={{ x: -DELETE_THRESHOLD, opacity: 1 }}
        animate={{ x: -400, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeIn" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* 背景の削除ボタン */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: DELETE_THRESHOLD,
          backgroundColor: "#E53E3E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          borderRadius: "0 8px 8px 0",
        }}
        onClick={isRevealed ? handleDeleteConfirm : undefined}
        title="削除"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: Math.min(1, Math.abs(offset) / DELETE_THRESHOLD),
            transition: "opacity 0.1s",
          }}
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </div>

      {/* スワイプするカード本体 */}
      <motion.div
        {...handlers}
        style={{ touchAction: "pan-y", position: "relative", zIndex: 1 }}
        animate={{ x: offset }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        onClick={isRevealed ? handleCancel : undefined}
      >
        {children}
      </motion.div>

      {/* オーバーレイ: 削除ボタン表示中に他の場所をタップしたらキャンセル */}
      {isRevealed && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 0 }}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};
