import { State } from './state.js';

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

/**
 * Read–eval–print loop (REPL) interface for the Pokedex CLI.
 *
 * Uses Node's readline API to accept user input from stdin,
 * normalize it, and respond interactively.
 */
export async function startREPL(state: State) {
    const rl = state.readline;
    rl.prompt();

    rl.on("line", async (line) => {
        let input = cleanInput(line);

        if (input.length === 0) {
            rl.prompt();
            return;
        }

        let commandName = input[0];
        let commands = state.commands;
        let cmd = commands[commandName];

        if (!cmd) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
            rl.prompt();
            return;
        }

        try {
            await cmd.callback(state);
        } catch (err) {
            console.log((err as Error).message);
        }

        rl.prompt();
    })
}

