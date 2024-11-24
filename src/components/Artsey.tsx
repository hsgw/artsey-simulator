import { useState } from "react";
import { defaultConfig } from "../utils/config";
import ComboConfig from "./ComboConfig";
import ComboInput from "./ComboInput";
import CheatSheet from "./CheatSheet";

export default function Artsey() {
  const [keyBind, setKeyBind] = useState(defaultConfig.keyBind);
  const [comboTimeout, setComboTimeout] = useState(defaultConfig.comboTimeout);
  const [wordCount, setWordCount] = useState(defaultConfig.wordCount);
  const [practiceMode, setPracticeMode] = useState(defaultConfig.practiceMode);
  const [nextChar, setNextChar] = useState("");

  return (
    <div>
      <div>
        <CheatSheet nextChar={nextChar} />
      </div>
      <div>
        <ComboInput
          config={{ keyBind, comboTimeout, wordCount, practiceMode }}
          onNextCharChange={setNextChar}
        />
      </div>
      <div>
        <ComboConfig
          config={{ keyBind, comboTimeout, wordCount, practiceMode }}
          onKeyBindChange={setKeyBind}
          onComboTimeoutChange={setComboTimeout}
          onWordCountChange={setWordCount}
        />
      </div>
    </div>
  );
}
