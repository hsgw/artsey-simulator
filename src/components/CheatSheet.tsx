import Keymap from "./Keymap";

export default function CheatSheet({ nextChar }: { nextChar: string }) {
  return (
    <div>
      <h2>Next Character</h2>
      <h3>{nextChar}</h3>
      <Keymap char={nextChar} />
    </div>
  );
}
