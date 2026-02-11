import { createInterface, type Interface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
}

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
}

export function initState(): State {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > ",
    });
    const commands = getCommands();
    return {
        readline: rl,
        commands: commands,
        pokeAPI: new PokeAPI(),
        nextLocationsURL: "",
        prevLocationsURL: "",
    }
}