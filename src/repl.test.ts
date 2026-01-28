import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: " hello   World  ",
        expected: ["hello", "world"],
    },
    {
        input: "Charmander Bulbasaur PIKACHU",
        expected: ["charmander", "bulbasaur", "pikachu"]
    },
    {
        input: "    Vaporeon Flareon Jolteon eevee UMBREON EsPeOn\nGlaceon  Sylveon",
        expected: ["vaporeon", "flareon", "jolteon", "eevee", "umbreon", "espeon", "glaceon", "sylveon"]
    },
    {
        input: "",
        expected: [],
    },
    {
        input: "     ",
        expected: [],
    },
    {
        input: "\n\t\r",
        expected: [],
    },
    {
        input: "Pikachu",
        expected: ["pikachu"],
    },
    {
        input: "   Pikachu   ",
        expected: ["pikachu"],
    },
    {
        input: "PIKAchu\t\tEEVEE\n\nSnOrLaX",
        expected: ["pikachu", "eevee", "snorlax"],
    },
    {
        input: "pikachu, eevee, snorlax",
        expected: ["pikachu,", "eevee,", "snorlax"], // documents current behavior
    },
    {
        input: "pikachu-eevee-snorlax",
        expected: ["pikachu-eevee-snorlax"],
    },
    {
        input: "pikachu  eevee   pikachu",
        expected: ["pikachu", "eevee", "pikachu"], // no deduping assumed
    },
    {
        input: "123 Pikachu 456",
        expected: ["123", "pikachu", "456"],
    },
    {
        input: " Mr. Mime ",
        expected: ["mr.", "mime"],
    },
    {
        input: "Farfetch’d",
        expected: ["farfetch’d"], // unicode apostrophe check
    },
    {
        input: "Nidoran♀ Nidoran♂",
        expected: ["nidoran♀", "nidoran♂"],
    },
    {
        input: "🔥 Charizard 💀 Gengar",
        expected: ["🔥", "charizard", "💀", "gengar"],
    },
    {
        input: "pikachu\r\neevee\r\nsnorlax",
        expected: ["pikachu", "eevee", "snorlax"], // Windows line endings
    },
    {
        input: "  one   two\tthree\nfour  ",
        expected: ["one", "two", "three", "four"],
    }
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        let actual = cleanInput(input);

        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    })
})