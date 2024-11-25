import Keymap from "./Keymap";
import styles from "./Wordlist.module.css";

export default function Wordlist({
  typedString,
  wordList,
  isOpenHint,
}: {
  typedString: string;
  wordList: string[];
  isOpenHint: boolean;
}) {
  function renderWordList() {
    let charCount = 0;
    return wordList.map((word, i) => {
      word = word + " ";
      const isCurrentWord =
        typedString.length >= charCount &&
        typedString.length < charCount + word.length + 1;
      return (
        <div key={`${word}-${i}`} className={styles.word}>
          {word.split("").map((char, j) => {
            const typedChar = typedString[charCount];
            const isNext = charCount === typedString.length;
            const isWrong = typedChar ? typedChar !== char : undefined;
            const isSpace = isCurrentWord && char === " ";
            charCount++;
            return (
              <div
                key={`${char}-${j}`}
                className={[styles.char, isNext ? styles.next : undefined]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div
                  className={[
                    typedChar != undefined && isWrong
                      ? styles.wrong
                      : undefined,
                    isWrong === false ? styles.correct : undefined,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isSpace && isNext && "␣"}
                  {isWrong ? typedChar : char}
                </div>
                {isOpenHint && isNext && (
                  <div className={styles.hint}>
                    <Keymap char={char} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <>
      <div className={styles.container}>{renderWordList()}</div>
    </>
  );
}
