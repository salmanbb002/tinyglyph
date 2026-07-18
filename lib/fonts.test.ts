import { describe, expect, it } from "vitest";
import { textStyles, transformText } from "./fonts";

describe("Unicode text transformations", () => {
  it("keeps every style slug unique", () => {
    expect(new Set(textStyles.map((style) => style.slug)).size).toBe(textStyles.length);
  });

  it("converts small caps without changing spaces or punctuation", () => {
    expect(transformText("small-caps", "Hello, world!"))
      .toBe("ʜᴇʟʟᴏ, ᴡᴏʀʟᴅ!");
  });

  it("converts superscript letters and digits", () => {
    expect(transformText("superscript", "a2 + B3")).toBe("ᵃ² + ᴮ³");
  });

  it("preserves unsupported subscript letters", () => {
    expect(transformText("subscript", "H2O + bc")).toBe("ₕ₂ₒ + bc");
  });

  it("uses astral mathematical Unicode code points safely", () => {
    expect(transformText("bold", "Az0")).toBe("𝐀𝐳𝟎");
    expect(Array.from(transformText("bold", "Az0"))).toHaveLength(3);
  });

  it("converts bubble letters and digits", () => {
    expect(transformText("bubble", "Az0")).toBe("Ⓐⓩ⓪");
  });

  it("reverses and flips punctuation for upside-down text", () => {
    expect(transformText("upside-down", "Hi!"))
      .toBe("¡ᴉH");
  });

  it("does not attach underline marks to line breaks", () => {
    expect(transformText("underline", "a\nb")).toBe("a̲\nb̲");
  });

  it("leaves non-Latin text readable", () => {
    expect(transformText("small-caps", "سلام 🌿")).toBe("سلام 🌿");
  });
});
