import { useRef, useEffect } from 'react';

export default function ParticlesBG() {
  const canvasRef = useRef();
  const mouse = { x: null, y: null, radius: 100 }; // radius is hover distance

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const PARTICLE_COUNT = 150;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseR: Math.random() * 2 + 1,
        r: 0, // will be set to baseR
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
      });
    }

    // Initialize r
    particles.forEach(p => (p.r = p.baseR));

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const maxDistance = 120;

      // Draw lines first
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const opacity = 1 - dist / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        // Hover effect: increase radius if near mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          p.r = Math.min(p.baseR + 2.5, 6); // max zoom radius
        } else {
          p.r = Math.max(p.r - 0.1, p.baseR); // shrink back smoothly
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
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

    // Track mouse position
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    let animationId;
    function animate() {
      draw();
      update();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', () => {});
      canvas.removeEventListener('mouseleave', () => {});
    };
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
