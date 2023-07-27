import { $, useComputed$, useContext } from '@builder.io/qwik';
import { PokemonGameContext } from '~/context';


export const usePokemonGame = () => {

    const pokemonGame = useContext( PokemonGameContext );

    const changePokemonId = $(( value: number ) => {
        if ( ( pokemonGame.pokemonId + value) <= 0 ) return;
    
        pokemonGame.pokemonId += value;
    })

    const toogleFromBack = $(() => {
        pokemonGame.postionImagenPokemon = !pokemonGame.postionImagenPokemon
    });

    const toogleVisible = $(() => {
        pokemonGame.revelationImage = !pokemonGame.revelationImage
    });

    return {
        pokemonId           : useComputed$(() => pokemonGame.pokemonId),
        postionImagenPokemon: useComputed$(() => pokemonGame.postionImagenPokemon),
        revelationImage     : useComputed$(() => pokemonGame.revelationImage),

        nextPokemon: () => changePokemonId(+1),
        prevPokemon: () => changePokemonId(-1),

        toogleFromBack: toogleFromBack, // Aqui cambiamos por medio de una funcion la posicion de la imagen
        toogleVisible : toogleVisible, // Aqui cambiamos por medio de una funcion la visibilidad de la imagen

    }

}