import { Layout } from "../utils/artsey";
import { Config } from "../utils/config";

import styles from "./ComboConfig.module.css";

type Props = {
  config: Config;
  onKeyBindChange: (keyBind: Config["keyBind"]) => void;
  onComboTimeoutChange: (comboTimeout: Config["comboTimeout"]) => void;
  onWordCountChange: (wordCount: Config["wordCount"]) => void;
  onPracticeModeChange: (practiceMode: Config["practiceMode"]) => void;
};

export default function ComboConfig({
  config: { keyBind, comboTimeout, wordCount, practiceMode },
  onKeyBindChange,
  onComboTimeoutChange,
  onWordCountChange,
  onPracticeModeChange,
}: Props) {
  return (
    <>
      <div className={[styles.inner, styles.practiceMode].join(" ")}>
        <input
          type="checkbox"
          onChange={(e) => onPracticeModeChange(e.target.checked)}
          checked={practiceMode}
        />
        <div className={styles.label}>Practice Mode</div>
      </div>

      <div>
        <h3>Key Bind</h3>
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
    </>
  );
}
