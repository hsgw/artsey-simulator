import styles from "./App.module.css";
import Accordion from "./components/Accordion";
import Artsey from "./components/Artsey";
import "./Global.css";

function App() {
  return (
    <div className={styles.root}>
      <header>
        <h1 className={styles.title}>
          <div>Artsey Simulator</div>
          <div className={styles.subtitle}>
            by <a href="https://5z6p.com">5z6p Instruments</a>
          </div>
        </h1>
        <div className={styles.description}>
          <p>
            これは手元のキーボードでArtseyキーマップを試すためのシミュレータです。
          </p>
          <p>
            Artseyキーマップについて書いた記事は<a href="#">こちら</a>。
          </p>
        </div>
        <Accordion title="使い方" defaultOpen>
          <p>
            Artseyキーマップのうち、
            <b>アルファベット+スペース+バックスペース</b>が入力できます。
          </p>
          <p>
            Artseyの左手キーマップ用に作られています。
            <br />
            キーバインドを変更してkeymapを読み替えることで右手でも入力できます。
            <br />
            キーマップは<b>Config</b>の<b>key bind</b>で確認・変更できます。
          </p>
          <p>
            <b>練習モード</b>
            では次の文字のキーマップをキーマップリスト上でハイライト表示します。(デフォルトでON)
            <br />
            Artsey特有の運指を気軽に試せます。
          </p>
          <p>
            スペースだけ4key同時押しのため難易度が高めです。
            <br />
            Combo
            Timeoutを増やすと同時押し受付時間が調整出来るので長めにしてください。
          </p>
        </Accordion>
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
