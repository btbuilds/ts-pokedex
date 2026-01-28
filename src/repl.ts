/**
 * Normalizes user input into a list of lowercase tokens.
 *
 * Collapses all whitespace, trims leading/trailing space,
 * converts to lowercase, and splits into words.
 *
 * @param input Raw user input string
 * @returns Array of normalized words; empty if input contains no words
 */
export function cleanInput(input: string): string[] {
    let normalized: string = input
    .replace(/\s+/g, ' ') // Regex to replace any run of whitespace characters with a single space (handles tabs, newlines, and multiple spaces)
    .trim()
    .toLowerCase();

    if (normalized === "") return [];

    return normalized.split(" ");
}