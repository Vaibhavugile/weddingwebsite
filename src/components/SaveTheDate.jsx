
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./SaveTheDate.css";

const COUPLE_GIF = "/assets/animated-indian-wedding-couple.gif";

const WEDDING = {
  bride: "Shreyash",
  groom: "Divya",
  day: "10",
  month: "DECEMBER",
  year: "2026",
  location: "",
  venue: "",
};

function ScratchCard() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);

  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;

    if (!canvas || !card || revealed) return;

    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gradient = ctx.createLinearGradient(
      0, 0, rect.width, rect.height
    );

    gradient.addColorStop(0, "#fff0d1");
    gradient.addColorStop(0.3, "#d8b779");
    gradient.addColorStop(0.55, "#fff3dc");
    gradient.addColorStop(0.8, "#c99d5e");
    gradient.addColorStop(1, "#f6e4c0");

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Champagne foil texture
    for (let i = 0; i < 250; i += 1) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      ctx.fillStyle =
        i % 2 === 0
          ? "rgba(255,255,255,.24)"
          : "rgba(117,75,32,.07)";

      ctx.fillRect(x, y, 1, 1);
    }

    // Embossed inner frame
    ctx.strokeStyle = "rgba(255,250,229,.9)";
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, rect.width - 16, rect.height - 16);

    ctx.strokeStyle = "rgba(125,78,37,.3)";
    ctx.strokeRect(12, 12, rect.width - 24, rect.height - 24);

    // Scratch instructions
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#71333a";
    ctx.font = "600 10px Arial, sans-serif";
    ctx.fillText(
      "A LITTLE SURPRISE",
      rect.width / 2,
      rect.height / 2 - 20
    );

    ctx.font = "italic 23px Georgia, serif";
    ctx.fillText(
      "Scratch to reveal",
      rect.width / 2,
      rect.height / 2 + 3
    );

    ctx.font = "10px Arial, sans-serif";
    ctx.fillStyle = "rgba(91,48,43,.8)";
    ctx.fillText(
      "OUR WEDDING DETAILS",
      rect.width / 2,
      rect.height / 2 + 25
    );
  }, [revealed]);

  useEffect(() => {
    paintCover();

    const card = cardRef.current;
    if (!card) return;

    const observer = new ResizeObserver(() => {
      paintCover();
    });

    observer.observe(card);

    return () => observer.disconnect();
  }, [paintCover]);

  const getPoint = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const scratchAt = (point) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 36;

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = point;
  };

  const measureScratch = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let transparent = 0;
    let total = 0;

    for (let i = 3; i < pixels.length; i += 128) {
      total += 1;
      if (pixels[i] < 80) transparent += 1;
    }

    const amount = Math.min(
      100,
      Math.round((transparent / Math.max(total, 1)) * 100)
    );

    setProgress(amount);

    if (amount >= 38) {
      setRevealed(true);
    }
  };

  const handlePointerDown = (event) => {
    if (revealed) return;

    event.preventDefault();

    drawingRef.current = true;
    lastPointRef.current = null;

    event.currentTarget.setPointerCapture?.(event.pointerId);
    scratchAt(getPoint(event));
  };

  const handlePointerMove = (event) => {
    if (!drawingRef.current || revealed) return;

    event.preventDefault();
    scratchAt(getPoint(event));
  };

  const handlePointerUp = () => {
    if (!drawingRef.current) return;

    drawingRef.current = false;
    lastPointRef.current = null;

    measureScratch();
  };

  const revealAll = () => {
    setProgress(100);
    setRevealed(true);
  };

  return (
    <div
      className={`scratch-card ${revealed ? "is-revealed" : ""}`}
      ref={cardRef}
    >
      <div className="scratch-card-inner">
        <div className="scratch-reveal-content" aria-live="polite">
          <span className="reveal-eyebrow">
            THE DAY WE SAY I DO
          </span>

          <strong className="revealed-date">
            {WEDDING.day} · 12 · {WEDDING.year}
          </strong>

          <span className="revealed-names">
            {WEDDING.groom} <i>&</i> {WEDDING.bride}
          </span>

          <div className="revealed-location">
            <span className="revealed-location-icon">⌖</span>
            <strong>{WEDDING.location}</strong>
            <small>{WEDDING.venue}</small>
          </div>

          <span className="reveal-heart">♡</span>
        </div>

        {!revealed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            aria-label="Scratch to reveal wedding details"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onLostPointerCapture={handlePointerUp}
          />
        )}
      </div>

      {!revealed && (
        <div className="scratch-footer">
          <span className="scratch-hint">
            <span className="scratch-hand">✧</span>
            Scratch gently to reveal
          </span>

          <span className="scratch-progress">
            {progress}%
          </span>

          <button
            type="button"
            className="reveal-button"
            onClick={revealAll}
          >
            Reveal details <span>↗</span>
          </button>
        </div>
      )}

      {revealed && (
        <div className="scratch-success-note">
          A beautiful day is waiting for us ♡
        </div>
      )}
    </div>
  );
}

export default function SaveTheDate() {
  return (
    <section className="save-date-section" id="save-the-date">
      <div className="save-date-decoration save-date-decoration-one" />
      <div className="save-date-decoration save-date-decoration-two" />

      <div className="save-date-shell">

        <header className="save-date-heading">
          <span className="save-date-kicker">
            <i />
            A CELEBRATION OF LOVE
            <i />
          </span>

          <h2>Save the Date</h2>

          <span className="heading-heart">♡</span>
        </header>

        {/* Animated couple and names only */}
        <div className="save-date-artwork">
          <img
            src={COUPLE_GIF}
            alt="Animated Indian bride and groom in traditional wedding attire"
            className="save-date-couple-gif"
            loading="lazy"
          />

          <div className="artwork-vignette" />

          <div className="artwork-content">
            <span className="artwork-overline">
              WITH THE BLESSINGS OF OUR FAMILIES
            </span>

            <h3>
              {WEDDING.groom}
              <span> & </span>
              {WEDDING.bride}
            </h3>

            <div className="artwork-divider">
              <i />
              <span>♡</span>
              <i />
            </div>

            <p className="artwork-tagline">
              A beautiful beginning to forever
            </p>
          </div>
        </div>

        {/* Date and venue appear only after scratching */}
        <div className="scratch-heading">
          <span />
          <p>A little surprise for you</p>
          <span />
        </div>

        <ScratchCard />

      </div>
    </section>
  );
}
