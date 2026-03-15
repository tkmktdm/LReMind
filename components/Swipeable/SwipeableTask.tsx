import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

const DELETE_THRESHOLD = 72;

type Props = {
  id: string;
  onDelete: (id: string) => void;
  isSorting?: boolean;
  children: React.ReactNode;
};

export const SwipeableTask = ({ id, onDelete, isSorting, children }: Props) => {
  const x = useMotionValue(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ゴミ箱アイコンの透明度を x から自動計算
  const trashOpacity = useTransform(x, [-DELETE_THRESHOLD, -DELETE_THRESHOLD / 2, 0], [1, 0.5, 0]);

  // ソート完了時にゴミ箱を閉じる
  const prevIsSortingRef = useRef(isSorting);
  useEffect(() => {
    if (prevIsSortingRef.current === true && isSorting === false) {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 40 });
      setIsRevealed(false);
    }
    prevIsSortingRef.current = isSorting;
  }, [isSorting, x]);

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(id), 350);
  };

  const handleCancel = () => {
    animate(x, 0, { type: "spring", stiffness: 400, damping: 40 });
    setIsRevealed(false);
  };

  const handleDragEnd = () => {
    const current = x.get();

    if (!isRevealed) {
      if (current < -(DELETE_THRESHOLD / 2)) {
        animate(x, -DELETE_THRESHOLD, { type: "spring", stiffness: 400, damping: 40 });
        setIsRevealed(true);
      } else {
        animate(x, 0, { type: "spring", stiffness: 400, damping: 40 });
      }
    } else {
      // reveal済みの状態でさらに左スワイプ → 削除
      if (current < -(DELETE_THRESHOLD * 1.5)) {
        handleDeleteConfirm();
      } else if (current > -(DELETE_THRESHOLD / 2)) {
        // 右に戻した → キャンセル
        animate(x, 0, { type: "spring", stiffness: 400, damping: 40 });
        setIsRevealed(false);
      } else {
        // どちらでもなければ revealed 位置に戻す
        animate(x, -DELETE_THRESHOLD, { type: "spring", stiffness: 400, damping: 40 });
      }
    }
  };

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
          zIndex: 0,
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (isRevealed) handleDeleteConfirm();
        }}
        title="削除"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: trashOpacity }}
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </motion.svg>
      </div>

      {/* スワイプするカード本体 */}
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{
          left: isRevealed ? -DELETE_THRESHOLD * 2 : -DELETE_THRESHOLD,
          right: 0,
        }}
        dragElastic={0.05}
        style={{ x, position: "relative", zIndex: 1 }}
        onDragEnd={handleDragEnd}
        onClick={isRevealed ? handleCancel : undefined}
      >
        {children}
      </motion.div>

      {/* reveal 中に他の場所をタップしたらキャンセル */}
      {isRevealed && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 0 }}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};
