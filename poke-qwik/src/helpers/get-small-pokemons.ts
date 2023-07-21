import type { PokemonListResponse, SmallPokemon } from '~/interfaces';

// La funcion creada aqui es para hacer la consulta de la data (Peticion a poke api)
export const getSmallPokemons = async( offset: number = 0, limit: number = 10 ): Promise<SmallPokemon[]> => {

    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await resp.json() as PokemonListResponse;

    // console.log(data);
    
    return data.results.map(({ url, name }) => {

        const segments = url.split('/');
        // console.log(segments);
        const id = segments.at(-2)!;

        return {id, name}

    });

}