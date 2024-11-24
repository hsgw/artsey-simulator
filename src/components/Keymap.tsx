import { useMemo } from "react";
import { Combos, Layout } from "../utils/artsey";
import styles from "./Keymap.module.css";

export default function Keymap({ char }: { char: string }) {
  const keymap = useMemo(() => {
    if (!char || !Combos[char]) {
      return [];
    }
    return Combos[char].split("_");
  }, [char]);
  return (
    <div className={styles.keymapViewer}>
      {Layout.map((row, i) => (
        <div key={`cs-${i}`} className={styles.row}>
          {row.map((keycode, j) => {
            const isIncluded = keymap.includes(keycode);
            return (
              <div key={`cs-${i}-${j}`} className={styles.key}>
                {isIncluded ? "o" : "x"}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
