import { useState } from "react";
import { Keycode } from "../utils/artsey";

export type Keybind = {
  [key in Keycode]: string;
};

export default function useKeybind(initialKeybind: Keybind) {
  const [keyBind, setKeybind] = useState(initialKeybind);

  function getKeycode(keyName: string) {
    return Object.keys(keyBind).find(
      (key) => keyBind[key as Keycode] === keyName
    );
  }

  return { keyBind, setKeybind, getKeycode };
}
