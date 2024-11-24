import { Layout } from "../utils/artsey";
import { Config } from "../utils/config";

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
      <div>
        <h2>Config</h2>
        <div>
          <h3>Key Config</h3>
          <div>
            {Layout.map((row, i) => (
              <div key={`keybind-row-${i}`}>
                {row.map((keycode, j) => (
                  <label key={`keybind-col-${j}`}>
                    {`${keycode}: `}
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
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>Combo Timeout</h3>
          <label>
            milliseconds:{" "}
            <input
              type="number"
              value={comboTimeout}
              onChange={(e) => onComboTimeoutChange(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <h3>Word Count</h3>
          <label>
            words:{" "}
            <input
              type="number"
              value={wordCount}
              onChange={(e) => onWordCountChange(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
