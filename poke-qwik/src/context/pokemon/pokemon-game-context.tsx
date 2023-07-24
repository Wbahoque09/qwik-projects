import { createContextId } from '@builder.io/qwik';



export interface PokemonGameState { // Interfaz cereada para manejar el tipo de datos de juego
    pokemonId           : number;
    postionImagenPokemon: boolean;
    revelationImage     : boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context'); // Creacion del context y se le asigna un tipo de dato