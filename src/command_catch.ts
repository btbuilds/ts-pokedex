import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js"

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("You must provide a Pokemon name");
    }

    let name = args[0];
    const pokemon = await state.pokeAPI.fetchPokemon(name);
    const baseExp = pokemon.base_experience;
    console.log(`Throwing a Pokeball at ${pokemon.name}...`);

    let catchPower = 40;
    const result = Math.floor(Math.random() * baseExp);

    // Failure state
    if (result > catchPower) {
        console.log(`${pokemon.name} escaped!`);
        return;
    }

    // Success state
    console.log(`${pokemon.name} was caught!`);
    console.log(`You may now inspect it with the inspect command!`);
    state.caughtPokemon[pokemon.name] = pokemon;

}