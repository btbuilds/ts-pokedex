import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './command.js';

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
export function startREPL() {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();

    rl.on("line", async (line) => {
        let input = cleanInput(line);

        if (input.length === 0) {
            rl.prompt();
            return;
        }

        let commandName = input[0];
        let commands = getCommands();
        let cmd = commands[commandName];

        if (!cmd) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
            rl.prompt();
            return;
        }

        try {
            cmd.callback(commands);
        } catch (err) {
            console.log(err);
        }

        rl.prompt();
    })
}

