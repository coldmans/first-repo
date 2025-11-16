import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Roulette from './components/Roulette';
import ResultModal from './components/ResultModal';
import ParticleBackground from './components/ParticleBackground';
import { getRandomChicken, getRandomFortune } from './data/chickenData';
import { playClickSound, playSpinningLoop, playResultSound } from './utils/sound';
import { GiChickenOven } from 'react-icons/gi';
import './App.css';

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedChicken, setSelectedChicken] = useState(null);
  const [fortune, setFortune] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [shake, setShake] = useState(false);
  const stopSpinningSound = useRef(null);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    // 클릭 사운드
    playClickSound();

    // 이스터에그: 5번 연속 클릭
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return 0;
      }
      setTimeout(() => setClickCount(0), 2000);
      return newCount;
    });

    setIsSpinning(true);

    // 치킨 선택
    const chicken = getRandomChicken();
    const selectedFortune = getRandomFortune(chicken);

    setSelectedChicken(chicken);
    setFortune(selectedFortune);

    // 회전 사운드 시작
    stopSpinningSound.current = playSpinningLoop();

    // 진동 효과
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100, 50, 100]);
    }
  }, [isSpinning]);

  const handleSpinComplete = useCallback(() => {
    // 회전 사운드 중지
    if (stopSpinningSound.current) {
      stopSpinningSound.current();
      stopSpinningSound.current = null;
    }

    setTimeout(() => {
      setIsSpinning(false);
      setShowResult(true);

      // 결과 사운드
      playResultSound();

      // 화면 플래시 효과
      document.body.style.animation = 'flash 0.5s';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 500);
    }, 500);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowResult(false);
    setSelectedChicken(null);
    setFortune('');
  }, []);

  return (
    <div className={`app ${shake ? 'shake' : ''}`}>
      <ParticleBackground />

      <div className="container">
        {/* 헤더 */}
        <motion.header
          className="header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div
            className="title-wrapper"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="title-icon"
              animate={{
                rotate: [0, -15, 15, -15, 15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <GiChickenOven />
            </motion.div>

            <h1 className="title">
              <motion.span
                className="emoji-bounce"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                🍗
              </motion.span>
              <span className="title-text">오늘 뭐 먹지?</span>
              <motion.span
                className="emoji-bounce"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 1
                }}
              >
                🍗
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            치킨 선택 장애? 운명에 맡겨봐! 🎰
          </motion.p>

          <motion.div
            className="subtitle-extra"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="stat-badge">😋 12개 브랜드</span>
            <span className="stat-badge">✨ 매일 다른 운세</span>
          </motion.div>
        </motion.header>

        {/* 룰렛 */}
        <Roulette
          isSpinning={isSpinning}
          onSpinComplete={handleSpinComplete}
          selectedChicken={selectedChicken}
        />

        {/* 스핀 버튼 */}
        <motion.div
          className="button-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="spin-button"
            onClick={handleSpin}
            disabled={isSpinning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isSpinning ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              scale: {
                duration: 0.5,
                repeat: isSpinning ? Infinity : 0
              }
            }}
          >
            <motion.span
              className="button-icon"
              animate={isSpinning ? {
                rotate: 360
              } : {}}
              transition={{
                duration: 1,
                repeat: isSpinning ? Infinity : 0,
                ease: "linear"
              }}
            >
              🎰
            </motion.span>
            <span className="button-text">
              {isSpinning ? '운명을 결정하는 중...' : '운명의 룰렛 돌리기!'}
            </span>
          </motion.button>

          {!isSpinning && (
            <motion.p
              className="hint-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              💡 Tip: 버튼을 5번 연속으로 눌러보세요!
            </motion.p>
          )}
        </motion.div>

        {/* 푸터 */}
        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          <p>Made with 💛 for 치킨러버들</p>
        </motion.footer>
      </div>

      {/* 결과 모달 */}
      <ResultModal
        isOpen={showResult}
        chicken={selectedChicken}
        fortune={fortune}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
