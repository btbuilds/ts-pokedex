import { stat } from "node:fs";
import { PokeAPI } from "./pokeapi.js"
import { State } from "./state.js"

export async function commandMapForward(state: State): Promise<void> {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const location of locations.results) {
        console.log(location.name);
    }
}

export async function commandMapBack(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        throw new Error(`You're on the first page. Please use 'map' command first.`)
    }

    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const location of locations.results) {
        console.log(location.name);
    }
}