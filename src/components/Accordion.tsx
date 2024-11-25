import { useState } from "react";
import styles from "./Accordion.module.css";

export default function Accordion({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  return (
    <div className={styles.container}>
      <button
        className={styles.title}
        onClick={() => {
          setIsOpen(!isOpen);
          return false;
        }}
      >
        <h2>
          {`${title}`}
          <span className={styles.arrow}>{isOpen ? "▲ close" : "▼ open"}</span>
        </h2>
      </button>
      <div className={isOpen ? styles.open : styles.closed}>{children}</div>
    </div>
  );
}
