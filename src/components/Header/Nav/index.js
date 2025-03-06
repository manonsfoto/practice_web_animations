"use client";
import styles from "./style.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../anim";
import Body from "./body";
import Imagebox from "./imagebox";
import Footer from "./footer";

const links = [
  {
    title: "Home",
    href: "/",
    src: "3.jpg",
  },
  {
    title: "Shop",
    href: "/",
    src: "7.jpg",
  },
  {
    title: "About Us",
    href: "/",
    src: "11.jpg",
  },
  {
    title: "Lookbook",
    href: "/",
    src: "14.jpg",
  },
  {
    title: "Contact",
    href: "/",
    src: "18.jpg",
  },
];

export default function Nav() {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />
          <Footer />
        </div>
        <Imagebox
          src={links[selectedLink.index].src}
          selectedLink={selectedLink}
        />
      </div>
    </motion.div>
  );
}
