import { motion } from 'framer-motion';
import { chickenData } from '../data/chickenData';
import './Roulette.css';

const Roulette = ({ isSpinning, onSpinComplete, selectedChicken }) => {
  const rotation = isSpinning ? 1800 + Math.random() * 360 : 0;

  return (
    <div className="roulette-wrapper">
      <motion.div
        className="roulette-pointer"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -10, 0, 10, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        👇
      </motion.div>

      <motion.div
        className="roulette-container"
        animate={{
          rotate: rotation,
          scale: isSpinning ? [1, 1.05, 1] : 1
        }}
        transition={{
          rotate: {
            duration: 4,
            ease: [0.17, 0.67, 0.12, 0.99],
          },
          scale: {
            duration: 0.3,
            repeat: isSpinning ? Infinity : 0
          }
        }}
        onAnimationComplete={() => {
          if (isSpinning) {
            onSpinComplete();
          }
        }}
      >
        <motion.div
          className={`roulette-wheel ${isSpinning ? 'spinning' : ''}`}
          animate={isSpinning ? {
            boxShadow: [
              '0 20px 60px rgba(255, 107, 53, 0.3), 0 0 0 10px rgba(255, 215, 0, 0.5)',
              '0 20px 60px rgba(255, 107, 53, 0.5), 0 0 0 10px rgba(255, 107, 53, 0.8)',
              '0 20px 60px rgba(255, 107, 53, 0.3), 0 0 0 10px rgba(255, 215, 0, 0.5)',
            ]
          } : {}}
          transition={{
            duration: 0.3,
            repeat: isSpinning ? Infinity : 0
          }}
        >
          {chickenData.map((chicken, index) => (
            <motion.div
              key={chicken.id}
              className="chicken-item"
              style={{
                background: chicken.gradient,
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              whileHover={{ scale: 1.1, rotate: 5, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="chicken-emoji">{chicken.emoji}</span>
              <span className="chicken-brand">{chicken.brand}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Roulette;
