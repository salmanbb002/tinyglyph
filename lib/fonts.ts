export type StyleCategory = "Tiny" | "Classic" | "Decorated" | "Playful";

export type TextStyle = {
  slug: string;
  name: string;
  category: StyleCategory;
  description: string;
  transform: (text: string) => string;
};

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";

function mapFromStrings(text: string, upper: string, lower: string, digits?: string) {
  const upperChars = Array.from(upper);
  const lowerChars = Array.from(lower);
  const digitChars = digits ? Array.from(digits) : [];

  return Array.from(text)
    .map((char) => {
      const upperIndex = UPPER.indexOf(char);
      if (upperIndex >= 0) return upperChars[upperIndex] ?? char;
      const lowerIndex = LOWER.indexOf(char);
      if (lowerIndex >= 0) return lowerChars[lowerIndex] ?? char;
      const digitIndex = "0123456789".indexOf(char);
      if (digitIndex >= 0 && digitChars.length) return digitChars[digitIndex] ?? char;
      return char;
    })
    .join("");
}

function mapCodePoint(text: string, upperBase: number, lowerBase: number, digitBase?: number) {
  return Array.from(text)
    .map((char) => {
      if (/[A-Z]/.test(char)) return String.fromCodePoint(upperBase + char.charCodeAt(0) - 65);
      if (/[a-z]/.test(char)) return String.fromCodePoint(lowerBase + char.charCodeAt(0) - 97);
      if (digitBase !== undefined && /[0-9]/.test(char)) {
        return String.fromCodePoint(digitBase + Number(char));
      }
      return char;
    })
    .join("");
}

const smallCaps = (text: string) =>
  mapFromStrings(
    text,
    "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ",
    "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ",
  );

const superscript = (text: string) =>
  mapFromStrings(
    text,
    "ᴬᴮꟲᴰᴱꟳᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ",
    "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ",
    "⁰¹²³⁴⁵⁶⁷⁸⁹",
  );

const subscript = (text: string) =>
  mapFromStrings(
    text,
    "ₐBCDₑFGₕᵢJₖₗₘₙₒₚQᵣₛₜᵤᵥWₓYZ",
    "ₐbcdₑfgₕᵢjₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz",
    "₀₁₂₃₄₅₆₇₈₉",
  );

const italic = (text: string) =>
  mapFromStrings(
    text,
    "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍",
    "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
  );

const script = (text: string) =>
  mapFromStrings(
    text,
    "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵",
    "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
  );

const doubleStruck = (text: string) =>
  mapFromStrings(
    text,
    "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
    "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
    "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
  );

const fraktur = (text: string) =>
  mapFromStrings(
    text,
    "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
    "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷",
  );

const upsideDownMap: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
  k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
  u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z", A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ",
  E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ", K: "⋊", L: "⅃", M: "W", N: "N",
  O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X",
  Y: "⅄", Z: "Z", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9",
  "7": "ㄥ", "8": "8", "9": "6", "0": "0", ".": "˙", ",": "'", "?": "¿", "!": "¡",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{",
};

const zalgoMarks = ["̴", "̵", "̶", "̷", "͞", "̸", "̡", "̢", "̧", "̛", "̖", "̗", "̘", "̙"];
const zalgo = (text: string) =>
  Array.from(text)
    .map((char, index) => (char.trim() ? `${char}${zalgoMarks[index % zalgoMarks.length]}${zalgoMarks[(index + 5) % zalgoMarks.length]}` : char))
    .join("");

export const textStyles: TextStyle[] = [
  { slug: "small-caps", name: "Small caps", category: "Tiny", description: "Compact, even, and highly readable", transform: smallCaps },
  { slug: "superscript", name: "Superscript", category: "Tiny", description: "Raised miniature letters and numbers", transform: superscript },
  { slug: "subscript", name: "Subscript", category: "Tiny", description: "Low-set characters for notes and formulas", transform: subscript },
  { slug: "bold", name: "Bold", category: "Classic", description: "Strong mathematical Unicode lettering", transform: (text) => mapCodePoint(text, 0x1d400, 0x1d41a, 0x1d7ce) },
  { slug: "italic", name: "Italic", category: "Classic", description: "A clean editorial slant", transform: italic },
  { slug: "bold-italic", name: "Bold italic", category: "Classic", description: "Expressive and high-impact", transform: (text) => mapCodePoint(text, 0x1d468, 0x1d482) },
  { slug: "cursive", name: "Cursive", category: "Classic", description: "Elegant script-style characters", transform: script },
  { slug: "monospace", name: "Monospace", category: "Classic", description: "Technical, measured letterforms", transform: (text) => mapCodePoint(text, 0x1d670, 0x1d68a, 0x1d7f6) },
  { slug: "double-struck", name: "Double struck", category: "Classic", description: "Outlined mathematical lettering", transform: doubleStruck },
  { slug: "fraktur", name: "Fraktur", category: "Classic", description: "Sharp blackletter forms", transform: fraktur },
  { slug: "bubble", name: "Bubble", category: "Playful", description: "Soft circled letters and numbers", transform: (text) => mapFromStrings(text, "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ", "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ", "⓪①②③④⑤⑥⑦⑧⑨") },
  { slug: "squared", name: "Squared", category: "Playful", description: "Bold enclosed capitals", transform: (text) => mapFromStrings(text, "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉", "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉") },
  { slug: "fullwidth", name: "Full width", category: "Decorated", description: "Airy arcade-style characters", transform: (text) => Array.from(text).map((c) => (/[!-~]/.test(c) ? String.fromCharCode(c.charCodeAt(0) + 0xfee0) : c)).join("") },
  { slug: "underline", name: "Underline", category: "Decorated", description: "Portable combining underline", transform: (text) => Array.from(text).map((c) => (c === "\n" ? c : `${c}̲`)).join("") },
  { slug: "strikethrough", name: "Strikethrough", category: "Decorated", description: "A line through every character", transform: (text) => Array.from(text).map((c) => (c === "\n" ? c : `${c}̶`)).join("") },
  { slug: "spaced", name: "Letter spaced", category: "Decorated", description: "Give every character more room", transform: (text) => Array.from(text).join(" ") },
  { slug: "upside-down", name: "Upside down", category: "Playful", description: "Flip and reverse the whole line", transform: (text) => Array.from(text).reverse().map((c) => upsideDownMap[c] ?? c).join("") },
  { slug: "reversed", name: "Reversed", category: "Playful", description: "Read the phrase from right to left", transform: (text) => Array.from(text).reverse().join("") },
  { slug: "sparkles", name: "Sparkles", category: "Playful", description: "A bright social-ready frame", transform: (text) => `✦ ${text} ✦` },
  { slug: "hearts", name: "Hearts", category: "Playful", description: "A warm decorative frame", transform: (text) => `♡ ${text} ♡` },
  { slug: "brackets", name: "Editorial brackets", category: "Decorated", description: "Clean full-width bookends", transform: (text) => `【${text}】` },
  { slug: "zalgo", name: "Glitch", category: "Playful", description: "A restrained corrupted-text effect", transform: zalgo },
];

export const toolPages = [
  "small-caps",
  "superscript",
  "subscript",
  "bold",
  "cursive",
  "bubble",
  "underline",
  "strikethrough",
  "upside-down",
  "zalgo",
] as const;

export function getStyle(slug: string) {
  return textStyles.find((style) => style.slug === slug);
}

export function transformText(slug: string, text: string) {
  return getStyle(slug)?.transform(text) ?? text;
}
