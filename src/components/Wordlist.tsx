import styles from "./Wordlist.module.css";

export default function Wordlist({
  typedString,
  wordList,
}: {
  typedString: string;
  wordList: string[];
}) {
  function renderWordList() {
    let charCount = -1;
    return wordList.map((word, i) => {
      charCount++; // space beetween words
      return (
        <div key={`${word}-${i}`} className={styles.word}>
          {word.split("").map((char, j) => {
            const typedChar = typedString[charCount];
            const isNext = charCount === typedString.length;
            const isWrong = typedChar ? typedChar !== char : undefined;
            charCount++;
            return (
              <div key={`${char}-${j}`} className={styles.charContainer}>
                <div className={styles.char}>
                  <div
                    className={[
                      styles.main,
                      isNext ? styles.next : undefined,
                      typedChar != undefined && isWrong
                        ? styles.wrong
                        : undefined,
                      isWrong === false ? styles.correct : undefined,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {isWrong ? typedChar : char}
                  </div>
                  <div className={styles.sub}>{isWrong ? char : " "}</div>
                </div>
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
