import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("You must provide a Pokemon name.");
    }
    const pokemonName = args[0]
    if (!state.caughtPokemon[pokemonName]) {
        throw new Error(`You have not caught a ${pokemonName}.`);
    }
    const pokemon = state.caughtPokemon[pokemonName]
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    for (const stat of pokemon.stats) {
        console.log(`   - ${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types:`)
    for (const typeInfo of pokemon.types) {
        console.log(`   - ${typeInfo.type.name}`);
    }
}