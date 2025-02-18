"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRef } from "react";

export default function CartoonCursorTrailing() {
  const container = useRef();
  const img = useRef();

  const manageMouseMove = (event) => {
    const { clientX, clientY } = event;
    const containerPosition = container.current.getBoundingClientRect();
    const x = clientX - containerPosition.x;
    const y = clientY - containerPosition.y;
    img.current.style.top = y + "px";
    img.current.style.left = x + "px";
    draw(x, y);
  };

  const draw = (x, y) => {
    const div = document.createElement("div");
    div.classList.add(styles["circle"]);
    div.style.top = y + "px";
    div.style.left = x + "px";
    container.current.append(div);
    
    if (container.current.childNodes.length > 25) {
      erase();
    } else {
      setTimeout(() => {
        erase();
      }, 1500);
    }
  };
  const erase = () => {
    container.current.removeChild(container.current.childNodes[1]);
  };

  return (
    <div className={styles.main}>
      <div
        ref={container}
        onMouseMove={(e) => {
          manageMouseMove(e);
        }}
        className={styles.container}
      >
        <Image
          ref={img}
          className={styles.img}
          src="/images/smiley.svg"
          alt="Smiley face cursor"
          width={32}
          height={32}
          priority
        />
      </div>
    </div>
  );
}
