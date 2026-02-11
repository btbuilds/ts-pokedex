export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() { }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const endpoint = "location-area";
        let url = pageURL || `${PokeAPI.baseURL}/${endpoint}`;
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            const locations: ShallowLocations = await response.json();
            return locations;
        } catch (err) {
            throw new Error(`Error retrieving locations: ${(err as Error).message}`)
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const endpoint = "location-area"
        const url = `${PokeAPI.baseURL}/${endpoint}/${locationName}`;
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            const location: Location = await response.json();
            return location;
        } catch (err) {
            throw new Error(`Error retrieving location: ${(err as Error).message}`)
        }
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            encounter_details: {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                };
                min_level: number;
            }[];
            max_chance: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
};