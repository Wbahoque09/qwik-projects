import { $, useComputed$, useContext } from '@builder.io/qwik';
import { PokemonGameContext } from '~/context';


export const usePokemonGame = () => {

    const pokemonGame = useContext( PokemonGameContext );

    const changePokemonId = $(( value: number ) => {
        if ( ( pokemonGame.pokemonId + value) <= 0 ) return;
    
        pokemonGame.pokemonId += value;
    })

    const toggleFromBack = $(() => {
        pokemonGame.postionImagenPokemon = !pokemonGame.postionImagenPokemon
    });

    const toggleVisible = $(() => {
        pokemonGame.revelationImage = !pokemonGame.revelationImage
    });

    return {
        pokemonId           : useComputed$(() => pokemonGame.pokemonId),
        postionImagenPokemon: useComputed$(() => pokemonGame.postionImagenPokemon),
        revelationImage     : useComputed$(() => pokemonGame.revelationImage),

        nextPokemon: $(() => changePokemonId(+1)),
        prevPokemon: $(() => changePokemonId(-1)),

        toggleFromBack: toggleFromBack, // Aqui cambiamos por medio de una funcion la posicion de la imagen
        toggleVisible : toggleVisible, // Aqui cambiamos por medio de una funcion la visibilidad de la imagen

    }

}