import { Keycode } from "./artsey";

export type KeyBind = {
  [key in Keycode]: string;
};

export type Config = {
  keyBind: KeyBind;
  comboTimeout: number;
  wordCount: number;
  practiceMode: boolean;
};

export const defaultConfig: Config = {
  keyBind: {
    A: "r",
    R: "e",
    T: "w",
    S: "q",
    E: "f",
    Y: "d",
    I: "s",
    O: "a",
  },
  comboTimeout: 30,
  wordCount: 20,
  practiceMode: true,
};
