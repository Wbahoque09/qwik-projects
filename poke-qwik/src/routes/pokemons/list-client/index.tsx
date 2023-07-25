import { $, component$, useContext, useOnDocument, useVisibleTask$, } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemos/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
// import { type SmallPokemon } from '~/interfaces';
// import styles from '../../styles.css?inline'; Se importa con el signo de pregunta y inline para evitar errores y funcione correctamente

// interface PokemonPageState {
//     currentPage: number;
//     isLoading  : boolean;
//     pokemons   : SmallPokemon[];
// }

export default component$(() => {

    // useStylesScoped$(styles); // El stylesScoped se declara dentro del componente y se le pasa el nombre del archivo css, solo sirve para la agregar de manera global al componente y lo que este dentro de el 
    // const pokemonState = useStore<PokemonPageState>({
    //     currentPage: 0,
    //     isLoading: true,
    //     pokemons: [],
    // })

    const pokemonList = useContext(PokemonListContext);

    // Solo el cliente (navegador), ve esta parte del codigo
    useVisibleTask$(async({track}) => {
        track(() => pokemonList.currentPage); // Modificador de useVisibleTask

        const pokemons = await getSmallPokemons( pokemonList.currentPage * 30, 30 );
        pokemonList.pokemons = [...pokemonList.pokemons,...pokemons];
        // Se hace un spread operator de los pokemones que se tenian antes y se concatenan los siguientes 

        pokemonList.isLoading = false; // Para controlar las peticiones
    });

    useOnDocument('scroll', $(() => {
        // console.log('scroll', event);
        const maxScroll = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;

        if (( currentScroll + 200 ) >= maxScroll && !pokemonList.isLoading ) {
            pokemonList.isLoading = true; // Para controlar las peticiones
            pokemonList.currentPage++; // Para controlar las peticiones
        }

    }))

    return (
        <>

            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Pagina actual: { pokemonList.currentPage }</span>
                <span>Esta cargando: </span>

            </div>

            <div class="mt-10">
                {/* <button
                    onClick$={() => pokemonState.currentPage--}
                    class= { pokemonState.currentPage === 0 ? "btn btn-block pointer-events-none mr-2" : "btn btn-primary mr-2"}
                >
                    Anteriores
                </button> */}

                <button 
                    onClick$={() => pokemonList.currentPage++}
                    class="btn btn-primary mr-2"
                >
                    Siguientes
                </button>
            </div>

            <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
                {
                    pokemonList.pokemons.map(({ name, id }) => (
                        <div 
                            key={ name }
                            class="m-5 flex flex-col justify-center items-center"
                        >
                            <PokemonImage id={id} />
                            <span class="capitalize">{ name }</span>
                        </div>
                    ))
                }
                
            </div>

            {/* <div>
                { JSON.stringify(pokemonResp.value) }
            </div> */}

        </>
    )
});

export const head: DocumentHead = {
    title: "List Client",
};


/**
 * Diferencias entre useVisibleTask y useTask
 * useVisibleTask: Solo se ejecuta en el navegador y después de la representación inicial, se ejecutará al menos una vez en el navegador y puede ser reactivo y volver a ejecutarse cuando cambie algún estado.
 * useTask: 
    Cuándo: ANTES del primer procesamiento del componente y cuando se realiza un seguimiento de los cambios de estado
    Veces: al menos una vez
    Plataforma: servidor y navegador
 */