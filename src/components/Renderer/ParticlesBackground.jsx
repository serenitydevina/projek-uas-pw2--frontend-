import React, { useEffect, useRef } from 'react';
import Particles from 'react-tsparticles';

function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const screenSize = useRef({ width: window.innerWidth, height: window.innerHeight });

  const calculateDynamicValues = () => {
    const { width, height } = screenSize.current;
    const screenArea = width * height;
    const particleCount = Math.floor(screenArea / 10000);
    const maxDistance = Math.min(width, height) / 5;
    return { particleCount, maxDistance };
  };

  const initializeParticles = (width, height, count) => {
    return Array.from({ length: count }, () => ({
      position: { x: Math.random() * width, y: Math.random() * height },
      velocity: {
        x: (Math.random() * 2 - 1) * 0.3,
        y: (Math.random() * 2 - 1) * 0.3,
      },
      blinkPhase: Math.random() * Math.PI * 2,
    }));
  };

  const updateParticles = (width, height) => {
    const particles = particlesRef.current;
    particles.forEach((particle) => {
      particle.position.x += particle.velocity.x;
      particle.position.y += particle.velocity.y;

      if (particle.position.x < 0 || particle.position.x > width) {
        particle.velocity.x *= -1;
      }
      if (particle.position.y < 0 || particle.position.y > height) {
        particle.velocity.y *= -1;
      }

      particle.velocity.x = Math.sign(particle.velocity.x) * Math.min(Math.abs(particle.velocity.x), 0.1);
      particle.velocity.y = Math.sign(particle.velocity.y) * Math.min(Math.abs(particle.velocity.y), 0.1);
    });
  };

  const drawLines = (ctx, width, height, maxDistance) => {
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];

        const dx = p2.position.x - p1.position.x;
        const dy = p2.position.y - p1.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          const lineAlpha = Math.min(1, alpha);

          ctx.beginPath();
          ctx.moveTo(p1.position.x, p1.position.y);
          ctx.lineTo(p2.position.x, p2.position.y);
          ctx.strokeStyle = `rgba(0, 0, 0, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const { width: oldWidth, height: oldHeight } = screenSize.current;

      const widthRatio = newWidth / oldWidth;
      const heightRatio = newHeight / oldHeight;

      canvas.width = newWidth;
      canvas.height = newHeight;

      const { particleCount, maxDistance } = calculateDynamicValues();

      particlesRef.current = initializeParticles(newWidth, newHeight, particleCount).map((particle, index) => {
        if (index < particlesRef.current.length) {
          const oldParticle = particlesRef.current[index];
          particle.position.x = oldParticle.position.x * widthRatio;
          particle.position.y = oldParticle.position.y * heightRatio;
          particle.velocity = oldParticle.velocity;
        }
        return particle;
      });

      screenSize.current = { width: newWidth, height: newHeight };
    };

    canvas.width = screenSize.current.width;
    canvas.height = screenSize.current.height;

    const { particleCount, maxDistance } = calculateDynamicValues();
    particlesRef.current = initializeParticles(screenSize.current.width, screenSize.current.height, particleCount);

    window.addEventListener('resize', resizeCanvas);

    const interval = 1000 / 60;
    const intervalId = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles(screenSize.current.width, screenSize.current.height);
      drawLines(ctx, screenSize.current.width, screenSize.current.height, maxDistance);
    }, interval);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          particles: {
            number: { value: 50 },
            color: { value: '#000' },
            move: { enable: true, speed: 1 },
          },
        }}
      />
    </>
  );
}

export default ParticleBackground;
