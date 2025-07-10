import { useRef, useEffect } from 'react';

export default function ParticlesBG() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');  // corrected
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Particle settings
    const particles = [];
    const PARTICLE_COUNT = 150;  // reasonable number
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,  // radius between 1 and 3
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines first
      const maxDistance = 120;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const opacity = 1 - dist / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles (dots)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function update() {
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      });
    }

    let animationId;
    function animate() {
      draw();
      update();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
