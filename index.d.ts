import type { BundledTheme } from "shiki";
import Showdown from "showdown";
type Themes =
  | {
      darkMode: true;
      theme?: { light: BundledTheme; dark: BundledTheme };
    }
  | {
      darkMode: false;
      theme?: BundledTheme;
    };
type Options = {
  themes?: Themes;
};

export default function showdownShiki(
  opts: Options
): Showdown.Extension | Showdown.Extension[];
