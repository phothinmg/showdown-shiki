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
declare function decodeHtml(encodedString: string): string;
export default function showdownShiki(
  opts?: Options
): Showdown.ShowdownExtension | Showdown.ShowdownExtension[];
