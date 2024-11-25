import { useMemo } from "react";
import { Combos, Layout } from "../utils/artsey";
import styles from "./Keymap.module.css";

export default function Keymap({ char }: { char: string }) {
  const [keymap, printChar] = useMemo(() => {
    const c = char === " " ? "Space" : char;
    let printChar = c;
    if (!c || !Combos[c]) {
      return [[], char];
    }
    switch (c) {
      case "Space":
        printChar = "␣";
        break;
      case "Backspace":
        printChar = "⌫";
        break;
    }
    return [Combos[c].split("_"), printChar];
  }, [char]);

  return (
    <div className={styles.container}>
      <div className={styles.char}>{printChar}</div>
      <div className={styles.keymap}>
        {Layout.map((row, i) => (
          <div key={`cs-${i}`} className={styles.row}>
            {row.map((keycode, j) => {
              const isIncluded = keymap.includes(keycode);
              return (
                <div
                  key={`cs-${i}-${j}`}
                  className={[
                    styles.key,
                    isIncluded ? styles.included : undefined,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {keycode}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
