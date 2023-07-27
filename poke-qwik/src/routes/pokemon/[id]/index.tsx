
import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemos/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>(( {params, redirect} ) => { // Constante creada para obtener por la URL el Id del pokemon
    // console.log(params);
    const id = Number(params.id); // Se castea a number el parametro recibido
    if (isNaN( id )) throw redirect(301, '/'); // Verificacion para cuando no sea un numero lo que se manda se redirecciona a la pagina principal, el throw hace que funcione el redireccionamiento   
    if (id <= 0 || id > 1010) throw redirect(301, '/'); // Verificacion para cuando sea un numero fuera del rango lo que se manda se redirecciona a la pagina principal, el throw hace que funcione el redireccionamiento


    return id;
})

export default component$(() => {

    // const location = useLocation().params // Como se hizo la primera vez
    // const pokemonGame = useContext( PokemonGameContext );

    const {
        toggleVisible,
        toggleFromBack,
        postionImagenPokemon,
        revelationImage,
    } = usePokemonGame();

    const pokemonId = usePokemonId();

    return (
        <>
            {/* <span class="text-5xl">Pokemon: {location.id}</span> */} {/* Como se hizo la primera vez */}
            <span class="text-5xl">Pokemon: {pokemonId}</span>
            <PokemonImage 
                id={ pokemonId.value }
                backImage={ postionImagenPokemon.value }
                showImage={ revelationImage.value }
            />

            <div class="mt-2">
                <button onClick$={ toggleFromBack } class="btn btn-primary mr-2">Voltear</button>
                <button onClick$={ toggleVisible } class="btn btn-primary mr-2">Revelar</button>
            </div>

        </> 
    )
});

export const head: DocumentHead = {
    title: "Pokemon",
};