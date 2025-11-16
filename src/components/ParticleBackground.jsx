import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);
  const emojis = ['🍗', '🍖', '🍔', '🍕', '⭐', '✨', '💫', '🌟', '🎉', '🎊'];

  useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 20 + Math.random() * 20
    });

    // 초기 파티클 생성
    const initialParticles = Array.from({ length: 20 }, createParticle);
    setParticles(initialParticles);

    // 주기적으로 새 파티클 추가
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = prev.filter(p => Date.now() - p.createdAt < 12000);
        if (newParticles.length < 20) {
          return [...newParticles, { ...createParticle(), createdAt: Date.now() }];
        }
        return newParticles;
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 0
    }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: '100vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
            rotate: 360
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: Math.random() * 2
          }}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            fontSize: `${particle.size}px`,
            zIndex: 0
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleBackground;
