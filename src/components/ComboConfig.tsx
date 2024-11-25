import { Layout } from "../utils/artsey";
import { Config } from "../utils/config";

import styles from "./ComboConfig.module.css";

type Props = {
  config: Config;
  onKeyBindChange: (keyBind: Config["keyBind"]) => void;
  onComboTimeoutChange: (comboTimeout: Config["comboTimeout"]) => void;
  onWordCountChange: (wordCount: Config["wordCount"]) => void;
};

export default function ComboConfig({
  config: { keyBind, comboTimeout, wordCount },
  onKeyBindChange,
  onComboTimeoutChange,
  onWordCountChange,
}: Props) {
  return (
    <div>
      <h2 className={styles.title}>Config</h2>
      <div>
        <h3>Keybind</h3>
        <div className={[styles.keybind, styles.inner].join(" ")}>
          {Layout.map((row, i) => (
            <div key={`keybind-row-${i}`} className={styles.row}>
              {row.map((keycode, j) => (
                <div key={`keybind-col-${j}`} className={styles.col}>
                  <div className={styles.key}>{keycode}</div>
                  <input
                    type="text"
                    readOnly
                    value={keyBind[keycode]}
                    onKeyDown={(e) => {
                      const newKeyBind = {
                        ...keyBind,
                        [keycode]: e.key,
                      };
                      onKeyBindChange(newKeyBind);
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Combo Timeout</h3>
        <div className={[styles.inner, styles.comboTimeout].join(" ")}>
          <input
            type="number"
            value={comboTimeout}
            onChange={(e) => onComboTimeoutChange(Number(e.target.value))}
          />
          <div className={styles.label}>milliseconds</div>
        </div>
      </div>
      <div>
        <h3>Word Count</h3>
        <div className={[styles.inner, styles.wordCount].join(" ")}>
          <input
            type="number"
            value={wordCount}
            onChange={(e) => onWordCountChange(Number(e.target.value))}
          />
          <div className={styles.label}>words</div>
        </div>
      </div>
    </div>
  );
}
