import styles from "./App.module.css";
import Artsey from "./components/Artsey";

function App() {
  return (
    <div className={styles.root}>
      <header>
        <h1 className={styles.title}>Artsey Simulator</h1>
        <div className={styles.description}>
          <p>
            これは手元のキーボードでArtseyキーマップを試すためのシミュレータです。
          </p>
          <p>
            Artseyキーマップのうち、
            <b>アルファベット+スペース+バックスペース</b>が入力できます。
            <br />
            練習モードでは次の文字のキーマップを表示しながら入力します。
          </p>
          <p>
            Artseyキーマップについて書いた記事は<a href="#">こちら</a>。
          </p>
        </div>
      </header>
      <main>
        <Artsey />
      </main>
      <footer>
        <h3>ソースコード</h3>
        <ul>
          <li>
            <a href="#">Github</a>
            <br />
            ライセンスについてはgithubリポジトリを参照してください。
          </li>
        </ul>
        <h3>参考にしたサイト</h3>
        <ul>
          <li>
            <a href="http://artsey.io">http://artsey.io</a>
          </li>
          <li>
            <a href="https://artseyio.github.io/artseyio-tester/">
              https://artseyio.github.io/artseyio-tester/
            </a>
          </li>
        </ul>
        <div className={styles.copyright}>© 2024 5z6p Instruments, hsgw</div>
      </footer>
    </div>
  );
}

export default App;
