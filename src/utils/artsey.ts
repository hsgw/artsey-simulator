export type Keycode = "A" | "R" | "T" | "S" | "E" | "Y" | "I" | "O";

// Default left layout
export const Layout: Keycode[][] = [
  ["S", "T", "R", "A"],
  ["O", "I", "Y", "E"],
];

export const Combos: { [key: string]: string } = {
  a: "A",
  r: "R",
  t: "T",
  s: "S",
  e: "E",
  y: "Y",
  i: "I",
  o: "O",
  b: "E_O",
  c: "E_Y",
  d: "A_R_T",
  f: "A_R",
  g: "R_T",
  h: "E_I",
  j: "S_T",
  k: "O_Y",
  l: "E_I_Y",
  m: "I_O_Y",
  n: "I_O",
  p: "E_I_O",
  q: "A_S_T",
  u: "I_Y",
  v: "R_S",
  w: "A_S",
  x: "R_S_T",
  z: "A_R_S_T",
  Space: "E_I_O_Y",
  Backspace: "E_R",
};

export const processKeycodes = (keycodes: Keycode[]) => {
  const comboKey = keycodes.sort().join("_");
  return Object.keys(Combos).find((key) => Combos[key] === comboKey);
};
