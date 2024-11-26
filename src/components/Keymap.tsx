import { useMemo } from "react";
import { Combos, Layout } from "../utils/artsey";
import styles from "./Keymap.module.css";
import { KeyBind } from "../utils/config";

export default function Keymap({
  char,
  isHighlighted,
  keyBind,
}: {
  char: string;
  isHighlighted?: boolean;
  keyBind?: KeyBind;
}) {
  const [keymap, printChar] = useMemo(() => {
    const c =
      char === " " ? "Space" : char.length === 1 ? char.toLowerCase() : char;
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
    <div
      className={[styles.container, isHighlighted ? styles.highlight : null]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.char}>{printChar}</div>
      <div className={styles.keymap}>
        {keymap.length > 0 ? (
          Layout.map((row, i) => (
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
                    {keyBind ? keyBind[keycode] : keycode}
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div>UNKNOWN</div>
        )}
      </div>
    </div>
  );
}
