import { useEffect, useMemo, useState } from "react";
import * as RandomWords from "random-words";

import styles from "./ComboInput.module.css";

import { Config } from "../utils/config";
import { Keycode, processKeycodes } from "../utils/artsey";
import Wordlist from "./Wordlist";

type Props = {
  config: Config;
  onNextCharChange: (nextChar: string) => void;
};

type PrevInput = {
  key: string;
  char: string | undefined;
};

export default function ComboInput({
  config: { keyBind, comboTimeout, wordCount, practiceMode },
  onNextCharChange,
}: Props) {
  const generateWords = () => {
    const words = (RandomWords.generate(wordCount) as string[]).map((word) =>
      word.toLowerCase()
    );
    return words;
  };

  const reset = () => {
    setWordList(() => generateWords());
    setKeyBuffer(() => []);
    setEnteredString(() => "");
  };

  const [isFocus, setIsFocus] = useState(false);
  const [wordList, setWordList] = useState(() => generateWords());
  const [keyBuffer, setKeyBuffer] = useState<Keycode[]>([]);
  const [enteredString, setEnteredString] = useState("");
  const [prevInput, setPrevInput] = useState<PrevInput>({
    key: "None",
    char: undefined,
  });

  const nextChar = useMemo(() => {
    let next = (wordList.join(" ") + " ")[enteredString.length];
    if (next) {
      if (next === " ") next = "Space";
      return next;
    }
  }, [enteredString, wordList]);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordCount]);

  useEffect(() => {
    if (nextChar) onNextCharChange(nextChar);
  }, [nextChar, onNextCharChange]);

  // Process keycodes and update enteredString
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keyBuffer.length) {
        const enteredChar = processKeycodes(keyBuffer);
        if (enteredChar) {
          if (enteredChar === "Backspace") {
            setEnteredString((prev) => prev.slice(0, -1));
          } else if (enteredChar === nextChar || nextChar !== "Space") {
            // Ignore non-space char when next is a space between words
            if (enteredChar === "Space") {
              setEnteredString((prev) => prev + " ");
              if (wordList.join(" ").length === enteredString.length) {
                if (practiceMode) {
                  reset();
                } else {
                  // TODO: calculate speed
                }
              }
            } else {
              setEnteredString((prev) => prev + enteredChar);
            }
          }
        } else {
          // TODO: handle invalid keycodes
        }
        setPrevInput(() => {
          return {
            key: keyBuffer.join("+"),
            char: enteredChar ? enteredChar : "invalid",
          };
        });
        setKeyBuffer(() => []);
      }
    }, comboTimeout);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyBuffer]);

  return (
    <div
      className={`${styles.input} ${isFocus ? styles.focus : ""}`}
      tabIndex={0}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onKeyDown={(e) => {
        if (e.repeat) return;
        const keycode = Object.keys(keyBind).find(
          (key) => keyBind[key as Keycode] === e.key
        ) as Keycode | undefined;

        if (keycode && !keyBuffer.includes(keycode)) {
          setKeyBuffer([...keyBuffer, keycode]);
        }
        e.preventDefault();
      }}
    >
      {!isFocus && <div className={styles.placeholder}>Focus to type</div>}
      <Wordlist typedString={enteredString} wordList={wordList} />
      <div className={styles.prevInput}>
        <div>
          Prev Input:
          <span className={styles.char}>{prevInput.char}</span>
          <span className={styles.key}>{prevInput.key}</span>
        </div>
      </div>
    </div>
  );
}
