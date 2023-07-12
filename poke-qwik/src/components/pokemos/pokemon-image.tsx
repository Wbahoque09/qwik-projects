import { component$ } from '@builder.io/qwik';

interface pokemonProps {
    id     : number;
    size?  : number;
    backImage: boolean;
}

export const PokemonImage = component$(( {id, size = 200, backImage}:pokemonProps ) => {


    return (
        <>
            <img width="96" height="96" 
                src= { !backImage ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png` : 
                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`
                }  
                alt="Pokemon Sprite"
                style={{ width:`${ size }px` }} 
            />
        </>
    )

});