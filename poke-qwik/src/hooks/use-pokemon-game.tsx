import { $, useComputed$, useContext } from '@builder.io/qwik';
import { PokemonGameContext } from '~/context';


export const usePokemonGame = () => {

    const pokemonGame = useContext( PokemonGameContext );

    const changePokemonId = $(( value: number ) => {
        if ( ( pokemonGame.pokemonId + value) <= 0 ) return;
    
        pokemonGame.pokemonId += value;
    })

    return {
        pokemonId           : useComputed$(() => pokemonGame.pokemonId),
        postionImagenPokemon: useComputed$(() => pokemonGame.postionImagenPokemon),
        revelationImage     : useComputed$(() => pokemonGame.revelationImage),
    }

}