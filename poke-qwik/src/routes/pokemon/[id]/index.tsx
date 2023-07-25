
import { component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemos/pokemon-image';
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$<number>(( {params, redirect} ) => { // Constante creada para obtener por la URL el Id del pokemon
    // console.log(params);
    const id = Number(params.id); // Se castea a number el parametro recibido
    if (isNaN( id )) throw redirect(301, '/'); // Verificacion para cuando no sea un numero lo que se manda se redirecciona a la pagina principal, el throw hace que funcione el redireccionamiento   
    if (id <= 0 || id > 1010) throw redirect(301, '/'); // Verificacion para cuando sea un numero fuera del rango lo que se manda se redirecciona a la pagina principal, el throw hace que funcione el redireccionamiento


    return id;
})

export default component$(() => {

    // const location = useLocation().params // Como se hizo la primera vez
    const pokemonGame = useContext( PokemonGameContext );

    const pokemonId = usePokemonId();

    return (
        <>
            {/* <span class="text-5xl">Pokemon: {location.id}</span> */} {/* Como se hizo la primera vez */}
            <span class="text-5xl">Pokemon: {pokemonGame.pokemonId}</span>
            <PokemonImage 
                id={ pokemonId.value }
                backImage={ pokemonGame.postionImagenPokemon }
                showImage={ pokemonGame.revelationImage }
            />
        </> 
    )
});

export const head: DocumentHead = {
    title: "Pokemon",
};