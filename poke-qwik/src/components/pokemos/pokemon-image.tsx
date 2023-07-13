import { component$, useSignal, useTask$ } from '@builder.io/qwik';


interface pokemonProps {
    id     : number;
    size?  : number;
    backImage: boolean;
    showImage: boolean;
}

export const PokemonImage = component$(( {id, size = 200, backImage, showImage}:pokemonProps ) => {

    const imageLoader = useSignal(false);

    useTask$(({track}) => {

        track( () => id );

        imageLoader.value = false;

    });

    return (
        <>
            <div class="flex items-center justify-center" style={{ width: `${ size }px`, height: `${ size }px` }}>
                { !imageLoader.value && <span>Cargando...</span> }
                <img width="96" height="96" 
                    src= { !backImage ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png` : 
                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`
                    }  
                    alt="Pokemon Sprite"
                    style={{ width:`${ size }px` }}
                    onLoad$={() => {
                        // setTimeout(() => {
                            imageLoader.value = true;
                        // },1000);
                    }} // Onload$ (carga perezosa) el onload es una propiedad de la imagen para verificar si se cargo la imagen y se le pasa una funcion que cambiar el valor del signal
                    class={{
                        "hidden": !imageLoader.value,
                        "brightness-0": showImage
                    }}
                />
            </div>
        </>
    )

});