import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapBack, commandMapForward } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Display a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Get the next page of locations.",
            callback: commandMapForward,
        },
        mapb: {
            name: "mapb",
            description: "Get the previous page of locations.",
            callback: commandMapBack,
        },
        explore: {
            name: "explore <location_name>",
            description: "Get a list of Pokemon in a specified location. Usage example: 'explore oreburgh-mine-1f'",
            callback: commandExplore,
        },
        catch: {
            name: "catch <pokemon_name>",
            description: "Try to catch the specified Pokemon.",
            callback: commandCatch,
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        }
    };
}