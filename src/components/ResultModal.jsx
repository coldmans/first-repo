import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import Confetti from 'react-canvas-confetti/dist/presets/realistic';
import { FaInstagram, FaShareAlt } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import './ResultModal.css';

const ResultModal = ({ isOpen, chicken, fortune, onClose, onShare }) => {
  const handleShare = useCallback(() => {
    const shareText = `🍗 오늘의 치킨 운세!\n\n${chicken.emoji} ${chicken.brand}\n${chicken.menu}\n\n${fortune}\n\n나도 치킨 뽑기 👉`;

    if (navigator.share) {
      navigator.share({
        title: '🍗 오늘 뭐 먹지? 치킨 룰렛!',
        text: shareText,
        url: window.location.href
      }).catch(err => {
        if (err.name !== 'AbortError') {
          fallbackShare(shareText);
        }
      });
    } else {
      fallbackShare(shareText);
    }
  }, [chicken, fortune]);

  const fallbackShare = (text) => {
    const fullText = `${text}\n${window.location.href}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText).then(() => {
        alert('✅ 클립보드에 복사되었습니다!\n인스타 스토리에 붙여넣기 해보세요!');
      }).catch(() => {
        alert('📋 공유 텍스트:\n\n' + fullText);
      });
    } else {
      alert('📋 공유 텍스트:\n\n' + fullText);
    }
  };

  // 진동 효과
  useEffect(() => {
    if (isOpen && navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  }, [isOpen]);

  if (!chicken) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 + 모달 래퍼 */}
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* 컨페티 효과 */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10000 }}>
              <Confetti autorun={{ speed: 3, duration: 3000 }} />
            </div>

            {/* 모달 컨텐츠 */}
            <motion.div
              className="modal-content"
              initial={{ scale: 0.3, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              onClick={(e) => e.stopPropagation()}
            >
            {/* 결과 애니메이션 */}
            <motion.div
              className="result-animation"
              animate={{
                rotate: [0, -5, 5, -5, 5, 0],
              }}
              transition={{
                duration: 0.5,
                delay: 0.2
              }}
            >
              <motion.div
                className="result-emoji"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.3
                }}
              >
                🎉
              </motion.div>

              <motion.h2
                className="result-title"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                오늘의 치킨은!
              </motion.h2>

              <motion.div
                className="result-brand"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.5
                }}
              >
                <div className="result-image-wrapper">
                  <img
                    src={chicken.image}
                    alt={chicken.brand}
                    className="result-chicken-image"
                  />
                  <div className="result-image-overlay" style={{ background: chicken.gradient }}></div>
                </div>
                <span className="brand-name">{chicken.brand}</span>
              </motion.div>

              <motion.div
                className="result-menu"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {chicken.menu}
              </motion.div>

              <motion.div
                className="result-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {chicken.description}
              </motion.div>

              <motion.div
                className="result-tags"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {chicken.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="tag"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="result-fortune"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                💫 {fortune}
              </motion.div>
            </motion.div>

            {/* 버튼 영역 */}
            <motion.div
              className="result-buttons"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <motion.button
                className="share-button instagram"
                onClick={handleShare}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram /> 인스타 공유하기
              </motion.button>

              <motion.button
                className="retry-button"
                onClick={onClose}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoMdRefresh /> 다시 돌리기
              </motion.button>
            </motion.div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
