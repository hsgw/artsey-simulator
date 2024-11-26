import { useState } from "react";
import Keymap from "./Keymap";

import styles from "./StringToKeymaps.module.css";

export default function StringToKeymaps() {
  const [string, setString] = useState("hello world");
  return (
    <div className={styles.container}>
      <h3>To Keymaps</h3>
      <input value={string} onChange={(e) => setString(e.target.value)} />
      <div className={styles.keymapList}>
        {string.split("").map((char, i) => (
          <Keymap key={`StringTokeymap-${char}-${i}`} char={char} />
        ))}
      </div>
    </div>
  );
}
