import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

interface BlockchainElement {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  type: "block" | "node" | "ai" | "data";
  rotation: number;
  rotationSpeed: number;
  pulsePhase: number;
}

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const elementsRef = useRef<BlockchainElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "rgba(255, 255, 255, 0.8)", // Branco
      "rgba(99, 102, 241, 0.6)", // Azul primário
      "rgba(139, 92, 246, 0.5)", // Roxo
      "rgba(245, 158, 11, 0.4)", // Laranja
    ];

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = Math.max(
          window.innerHeight,
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        );
        initStars();
        initBlockchainElements();
      }
    };

    const initStars = () => {
      const stars: Star[] = [];
      const starCount = Math.floor((window.innerWidth * canvas.height) / 5000);

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          opacity: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 0.05 + 0.01,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      starsRef.current = stars;
    };

    const initBlockchainElements = () => {
      const elements: BlockchainElement[] = [];
      const elementCount = Math.floor(
        (window.innerWidth * canvas.height) / 15000
      );

      const types: ("block" | "node" | "ai" | "data")[] = [
        "block",
        "node",
        "ai",
        "data",
      ];

      for (let i = 0; i < elementCount; i++) {
        elements.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * canvas.height,
          size: Math.random() * 8 + 4,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.02 + 0.005,
          type: types[Math.floor(Math.random() * types.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      elementsRef.current = elements;
    };

    const drawBlock = (
      ctx: CanvasRenderingContext2D,
      element: BlockchainElement
    ) => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate(element.rotation);

      // Bloco principal
      ctx.strokeStyle = `rgba(99, 102, 241, ${element.opacity})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(
        -element.size / 2,
        -element.size / 2,
        element.size,
        element.size
      );

      // Linhas internas simulando dados
      ctx.strokeStyle = `rgba(139, 92, 246, ${element.opacity * 0.7})`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 3; i++) {
        const y = -element.size / 2 + (element.size / 4) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(-element.size / 3, y);
        ctx.lineTo(element.size / 3, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawNode = (
      ctx: CanvasRenderingContext2D,
      element: BlockchainElement
    ) => {
      ctx.save();
      ctx.translate(element.x, element.y);

      // Nó central
      ctx.beginPath();
      ctx.arc(0, 0, element.size / 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 158, 11, ${element.opacity})`;
      ctx.fill();

      // Conexões
      ctx.strokeStyle = `rgba(245, 158, 11, ${element.opacity * 0.5})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const angle = ((Math.PI * 2) / 4) * i + element.rotation;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(
          Math.cos(angle) * element.size,
          Math.sin(angle) * element.size
        );
        ctx.stroke();

        // Pequenos nós nas pontas
        ctx.beginPath();
        ctx.arc(
          Math.cos(angle) * element.size,
          Math.sin(angle) * element.size,
          2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(245, 158, 11, ${element.opacity * 0.7})`;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawAI = (
      ctx: CanvasRenderingContext2D,
      element: BlockchainElement
    ) => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate(element.rotation);

      // Círculo principal (cérebro)
      ctx.beginPath();
      ctx.arc(0, 0, element.size / 2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 92, 246, ${element.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Padrão neural interno
      ctx.strokeStyle = `rgba(139, 92, 246, ${element.opacity * 0.6})`;
      ctx.lineWidth = 0.5;

      // Linhas neurais
      for (let i = 0; i < 6; i++) {
        const angle1 = ((Math.PI * 2) / 6) * i;
        const angle2 = ((Math.PI * 2) / 6) * ((i + 2) % 6);
        ctx.beginPath();
        ctx.moveTo(
          (Math.cos(angle1) * element.size) / 3,
          (Math.sin(angle1) * element.size) / 3
        );
        ctx.lineTo(
          (Math.cos(angle2) * element.size) / 3,
          (Math.sin(angle2) * element.size) / 3
        );
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawData = (
      ctx: CanvasRenderingContext2D,
      element: BlockchainElement
    ) => {
      ctx.save();
      ctx.translate(element.x, element.y);

      // Partícula de dados (hexágono)
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = ((Math.PI * 2) / 6) * i + element.rotation;
        const x = (Math.cos(angle) * element.size) / 2;
        const y = (Math.sin(angle) * element.size) / 2;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      const pulse = Math.sin(element.pulsePhase) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(99, 102, 241, ${element.opacity * pulse})`;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Create twinkling effect
        star.opacity = Math.max(
          0.2,
          star.opacity + (Math.random() * 0.04 - 0.02)
        );

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace(/[\d.]+\)$/, `${star.opacity})`);
        ctx.fill();

        // Move star (slight parallax effect)
        star.y += star.speed;

        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Update and draw blockchain elements
      elementsRef.current.forEach((element) => {
        // Update rotation
        element.rotation += element.rotationSpeed;

        // Update pulse phase
        element.pulsePhase += 0.02;

        // Subtle opacity variation
        element.opacity = Math.max(
          0.05,
          element.opacity + (Math.random() * 0.02 - 0.01)
        );

        // Draw based on type
        switch (element.type) {
          case "block":
            drawBlock(ctx, element);
            break;
          case "node":
            drawNode(ctx, element);
            break;
          case "ai":
            drawAI(ctx, element);
            break;
          case "data":
            drawData(ctx, element);
            break;
        }

        // Move element
        element.y += element.speed;
        element.x += Math.sin(element.pulsePhase * 0.5) * 0.1;

        // Reset element position if it goes off screen
        if (element.y > canvas.height + 50) {
          element.y = -50;
          element.x = Math.random() * canvas.width;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Função para atualizar o canvas quando o conteúdo da página muda
    const updateCanvasSize = () => {
      const newHeight = Math.max(
        window.innerHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );

      if (canvas.height !== newHeight) {
        resizeCanvas();
      }
    };

    // Observer para detectar mudanças no tamanho do documento
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(document.body);

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Atualizar tamanho periodicamente para capturar mudanças dinâmicas
    const intervalId = setInterval(updateCanvasSize, 1000);

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      resizeObserver.disconnect();
      clearInterval(intervalId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none z-0"
      style={{
        background:
          "linear-gradient(135deg, #0f0f23 0%, #1e1b4b 30%, #312e81 60%, #1e1b4b 90%, #0f0f23 100%)",
        minHeight: "100vh",
      }}
    />
  );
};

export default StarBackground;
