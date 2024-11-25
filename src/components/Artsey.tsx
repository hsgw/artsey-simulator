import { useState } from "react";
import { defaultConfig } from "../utils/config";
import ComboConfig from "./ComboConfig";
import ComboInput from "./ComboInput";

import styles from "./Artsey.module.css";

export default function Artsey() {
  const [keyBind, setKeyBind] = useState(defaultConfig.keyBind);
  const [comboTimeout, setComboTimeout] = useState(defaultConfig.comboTimeout);
  const [wordCount, setWordCount] = useState(defaultConfig.wordCount);
  const [practiceMode, setPracticeMode] = useState(defaultConfig.practiceMode);

  return (
    <>
      <div className={styles.artseyInput}>
        <ComboInput
          config={{ keyBind, comboTimeout, wordCount, practiceMode }}
        />
      </div>
      <div className={styles.artseyConfig}>
        <ComboConfig
          config={{ keyBind, comboTimeout, wordCount, practiceMode }}
          onKeyBindChange={setKeyBind}
          onComboTimeoutChange={setComboTimeout}
          onWordCountChange={setWordCount}
        />
      </div>
    </>
  );
}
