import { useEffect, useMemo, useState } from "react";
import * as RandomWords from "random-words";

import styles from "./ComboInput.module.css";

import { Config } from "../utils/config";
import { Keycode, processKeycodes } from "../utils/artsey";
import Wordlist from "./Wordlist";

type Props = {
  config: Config;
  onChangeNextChar: (nextChar: string | undefined) => void;
};

type PrevInput = {
  key: string;
  char: string | undefined;
};

export default function ComboInput({
  config: { keyBind, comboTimeout, wordCount, practiceMode },
  onChangeNextChar,
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
    setStartTime(() => undefined);
    setWpm(() => undefined);
  };

  const [isFocus, setIsFocus] = useState(false);
  const [wordList, setWordList] = useState(() => generateWords());
  const [keyBuffer, setKeyBuffer] = useState<Keycode[]>([]);
  const [enteredString, setEnteredString] = useState("");
  const [prevInput, setPrevInput] = useState<PrevInput>({
    key: "None",
    char: undefined,
  });
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [wpm, setWpm] = useState<number | undefined>(undefined);

  const nextChar = useMemo(() => {
    let next = (wordList.join(" ") + " ")[enteredString.length];
    if (next) {
      if (next === " ") next = "Space";
      return next;
    }
  }, [enteredString, wordList]);

  useEffect(() => {
    onChangeNextChar(nextChar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextChar]);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordCount, practiceMode]);

  // Process keycodes and update enteredString
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keyBuffer.length === 0) return;

      const enteredChar = processKeycodes(keyBuffer);

      // check game state is over
      if (wpm !== undefined) {
        // wait for Space
        if (enteredChar === "Space") reset();
        else setKeyBuffer(() => []);
        return;
      }

      // reset keybuffer and set prevInput
      setPrevInput(() => {
        return {
          key: keyBuffer.join("+"),
          char: enteredChar ? enteredChar : "invalid",
        };
      });
      setKeyBuffer(() => []);

      // ignore invalid enter
      if (!enteredChar) {
        return;
      }

      // check practice mode and start timer if not started
      if (!practiceMode && !startTime) {
        setStartTime(() => new Date());
      }

      // first process backspace
      if (enteredChar === "Backspace") {
        if (enteredString.length > 0) {
          setEnteredString((prev) => prev.slice(0, -1));
        }
        return;
      }

      // check space beetween words or last
      if (nextChar === "Space") {
        if (enteredChar !== "Space") {
          // ignore non-space char when next is a space between words
          return;
        } else {
          setEnteredString((prev) => prev + " ");

          // check if game is over
          if (wordList.join(" ").length === enteredString.length) {
            if (practiceMode) {
              reset();
              return;
            } else {
              // game over
              if (!startTime) {
                console.error("no start time");
                return;
              }

              // calculate wpm
              const time = new Date().getTime() - startTime.getTime();
              const { correctWordCount } = wordList.reduce(
                ({ correctWordCount, charCount }, word) => {
                  const enteredWord = enteredString.slice(
                    charCount,
                    charCount + word.length
                  );

                  if (word === enteredWord) {
                    correctWordCount += 1;
                  }

                  return {
                    correctWordCount,
                    charCount: charCount + word.length + 1,
                  };
                },
                { correctWordCount: 0, charCount: 0 }
              );
              const wpm = (correctWordCount * 60) / (time / 1000);
              setWpm(() => wpm);
              console.log({ correctWordCount, time, wpm });
              return;
            }
          }
          return;
        }
      }

      // normal update
      switch (enteredChar) {
        case "Space":
          setEnteredString((prev) => prev + " ");
          break;
        default:
          setEnteredString((prev) => prev + enteredChar);
          break;
      }
    }, comboTimeout);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyBuffer]);

  return (
    <>
      <h2>Input</h2>
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
        {wpm !== undefined && (
          <div className={styles.placeholder}>
            {wpm.toFixed(2)} wpm
            <div className={styles.sub}>Type SPACE to Restart</div>
          </div>
        )}
        {!isFocus && <div className={styles.placeholder}>Focus to type</div>}
        <Wordlist typedString={enteredString} wordList={wordList} />
        <div className={styles.statusBar}>
          <div className={styles.status}>
            Input:
            <span className={styles.char}>{prevInput.char}</span>
            <span className={styles.key}>[{prevInput.key}]</span>
          </div>
          <div className={styles.status}>
            <span className={styles.wpm}>
              {practiceMode
                ? "Practice Mode"
                : startTime
                  ? "Mesuring..."
                  : wpm === undefined && "Type to start mesuring"}
            </span>
            <a
              className={styles.reset}
              href="javascript:void(0)"
              onClick={() => {
                reset();
                return false;
              }}
            >
              Reset
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
