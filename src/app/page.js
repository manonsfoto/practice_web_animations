"use client";
import styles from "./page.module.css";
import Link from "next/link";

const animationProjects = [
  {
    title: "Gallery Mouse Hover",
    description: "Interactive gallery with mouse hover animations",
    path: "/gallery-hover",
    color: "#000000",
  },
  {
    title: "Cartoon Cursor Trailing",
    description: "Animated cursor following the mouse",
    path: "/cartoon-cursor-trailing",
    color: "#000000",
  },
  {
    title: "Gallery Colored Card",
    description: "Interactive gallery with colored cards",
    path: "/gallery-colored-card",
    color: "#000000",
  },
  {
    title: "Bezier Curve",
    description: "Interactive bezier curve animation",
    path: "/bezier-curve",
    color: "#000000",
  },
  {
    title: "3D Perspective Text",
    description: "3D perspective text animation",
    path: "/3d-perspective-text",
    color: "#000000",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Web Animation Projects</h1>

      <div className={styles.grid}>
        {animationProjects.map((project, index) => (
          <Link href={project.path} key={index} className={styles.card}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
