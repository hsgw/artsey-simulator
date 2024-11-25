import { KeyBind } from "../utils/config";
import Keymap from "./Keymap";

import styles from "./KeymapList.module.css";

export default function KeymapList({
  highlightedChar,
  keyBind,
}: {
  highlightedChar: string | undefined;
  keyBind: KeyBind;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.keymapList}>
        {"abcdefghijklmnopqrstuvwxyz".split("").map((char) => (
          <Keymap
            key={char}
            char={char}
            isHighlighted={char === highlightedChar}
            keyBind={keyBind}
          />
        ))}
      </div>
      <div className={styles.keymapList}>
        {["Space", "Backspace"].map((char) => (
          <Keymap
            key={char}
            char={char}
            isHighlighted={char === highlightedChar}
            keyBind={keyBind}
          />
        ))}
      </div>
    </div>
  );
}
