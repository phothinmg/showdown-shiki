import Showdown from "showdown";
import * as shiki from "shiki";

//------------------------------------------

const hlter = await shiki.createHighlighter({
  langs: Object.keys(shiki.bundledLanguages),
  themes: Object.keys(shiki.bundledThemes),
});
/**
 *
 * @param {string} code
 * @param {import("shiki").BuiltinLanguage} lang
 * @param {import("./index").Themes} themes
 * @returns {string}
 */
function shikiHL(code, lang, themes) {
  if (themes && themes.darkMode) {
    const dk = themes.theme?.dark ?? "github-dark";
    const lg = themes.theme?.light ?? "github-light";
    return hlter.codeToHtml(code, {
      lang: lang,
      themes: { light: lg, dark: dk },
    });
  }
  const df = themes?.theme ?? "github-light";
  return hlter.codeToHtml(code, {
    lang: lang,
    theme: df,
  });
}
/**
 *
 * @param {import("./index").Options} [opts]
 * @returns {Showdown.Extension | Showdown.Extension[]}
 */
function showdownShiki(opts) {
  function filter(text, converter, options) {
    const params = {
      left: "<pre><code\\b[^>]*>",
      right: "</code></pre>",
      flags: "g",
    };
    function replacement(wholeMatch, match, left, right) {
      const _match = decodeHtml(match);
      const regex = /class=\"([^ \"]+)/;
      const lan = left.match(regex)?.[1] || "";
      if (!lan || lan === "") {
        return wholeMatch;
      }

      return shikiHL(_match, lan, opts?.themes);
    }
    return Showdown.helper.replaceRecursiveRegExp(
      text,
      replacement,
      params.left,
      params.right,
      params.flags
    );
  }
  return [
    {
      type: "output",
      filter: filter,
    },
  ];
}

Showdown.extension("showdown-shiki", showdownShiki);
export default showdownShiki;
