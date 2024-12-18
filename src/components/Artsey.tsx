import { useState } from "react";
import { defaultConfig } from "../utils/config";
import ComboConfig from "./ComboConfig";
import ComboInput from "./ComboInput";

import styles from "./Artsey.module.css";
import Accordion from "./Accordion";
import KeymapList from "./KeymapList";
import StringToKeymaps from "./StringToKeymaps";

export default function Artsey() {
  const [keyBind, setKeyBind] = useState(defaultConfig.keyBind);
  const [comboTimeout, setComboTimeout] = useState(defaultConfig.comboTimeout);
  const [wordCount, setWordCount] = useState(defaultConfig.wordCount);
  const [practiceMode, setPracticeMode] = useState(defaultConfig.practiceMode);

  const [nextChar, setNextChar] = useState<string | undefined>(undefined);

  return (
    <div translate="no">
      <div className={styles.keymapList}>
        <Accordion title="Keymap List" defaultOpen>
          <KeymapList
            highlightedChar={practiceMode ? nextChar : undefined}
            // keyBind={keyBind}
          />
        </Accordion>
      </div>
      <div className={styles.input}>
        <ComboInput
          config={{ keyBind, comboTimeout, wordCount, practiceMode }}
          onChangeNextChar={setNextChar}
        />
      </div>
      <div className={styles.config}>
        <Accordion title="Config" defaultOpen>
          <ComboConfig
            config={{
              keyBind,
              comboTimeout,
              wordCount,
              practiceMode,
            }}
            onKeyBindChange={setKeyBind}
            onComboTimeoutChange={setComboTimeout}
            onWordCountChange={setWordCount}
            onPracticeModeChange={setPracticeMode}
          />
        </Accordion>
      </div>
      <div className={styles.extra}>
        <Accordion title="Extra">
          <StringToKeymaps />
        </Accordion>
      </div>
    </div>
  );
}
