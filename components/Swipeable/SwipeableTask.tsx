import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  id: string;
  onDelete: (id: string) => void;
  children: React.ReactNode;
};
export const SwipeableTask = ({ id, onDelete, children }: Props) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setIsSwiped(true);
      setTimeout(() => onDelete(id), 300); // アニメーション後に削除
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <AnimatePresence>
      {!isSwiped && (
        <motion.div
          {...handlers}
          style={{ touchAction: "pan-y" }}
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }} // → 右にスライドしてフェードアウト
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
