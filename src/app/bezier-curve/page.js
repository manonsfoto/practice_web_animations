"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const path = useRef(null);
  const [width, setWidth] = useState(0);

  let progress = 0;
  let reqId = null;
  let x = 0.5;
  let time = Math.PI / 2;

  useEffect(() => {
    // Set initial width and draw initial path
    const updateDimensions = () => {
      const newWidth = window.innerWidth * 0.7;
      setWidth(newWidth);
      if (path.current) {
        path.current.setAttributeNS(
          null,
          "d",
          `M 0 50 Q ${newWidth * 0.5} 50 ${newWidth} 50`
        );
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const setPath = (value) => {
    if (!path.current) return;
    path.current.setAttributeNS(
      null,
      "d",
      `M 0 50 Q ${width * x} ${50 + value} ${width} 50`
    );
  };

  const animateIn = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      time = Math.PI / 2;
    }
    progress += 1;
    setPath(progress);
    reqId = requestAnimationFrame(animateIn);
  };

  const manageMouseMove = (e) => {
    const { movementY } = e;
    const box = e.target.getBoundingClientRect();
    x = (e.clientX - box.left) / box.width;
    progress = Math.max(-100, Math.min(100, progress + movementY));
    setPath(progress);
  };

  const resetAnimation = () => {
    cancelAnimationFrame(reqId);
    animateOut();
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const animateOut = () => {
    let newProgress = progress * Math.sin(time);
    setPath(newProgress);
    progress = lerp(progress, 0, 0.04);
    time += 0.2;

    if (Math.abs(progress) > 0.5) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      time = Math.PI / 2;
      progress = 0;
      setPath(0);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.line}>
          <div
            onMouseEnter={() => {
              animateIn();
            }}
            onMouseLeave={() => {
              resetAnimation();
            }}
            onMouseMove={(e) => {
              manageMouseMove(e);
            }}
            className={styles.box}
          ></div>
          <svg width="100%" height="100" viewBox={`0 0 ${width} 100`}>
            <path ref={path} stroke="white" fill="none" strokeWidth="2"></path>
          </svg>
        </div>

        <div className={styles.description}>
          <p>Smart Development</p>

          <p>
            Combining unique design and rich technology, we build digital
            products exactly as they were designed, without shortcuts or
            simplifications.
          </p>
        </div>

        <div className={styles.tagsContainer}>
          <p>Areas</p>

          <div className={styles.tags}>
            <p>E-commerce</p>

            <p>Finance</p>

            <p>Education</p>

            <p>Social</p>

            <p>Entertainment</p>

            <p>Medicine</p>
          </div>
        </div>
      </div>
    </div>
  );
}
