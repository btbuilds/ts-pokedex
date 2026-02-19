import { State } from "./state.js"

export async function commandExplore(state: State, ...args: string[]){
    if (args.length !== 1) {
        throw new Error("You must provide a location name.")
    }
    const area = args[0]
    const location = await state.pokeAPI.fetchLocation(area);

    console.log(`Exploring ${area}...`)
    for (const pokemon of location.pokemon_encounters) {
        console.log(` - ${pokemon.pokemon.name}`);
    }
}