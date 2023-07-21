import { component$, useStore, } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { type SmallPokemon } from '~/interfaces';
// import styles from '../../styles.css?inline'; Se importa con el signo de pregunta y inline para evitar errores y funcione correctamente

interface PokemonPageState {
    currentPage: number;
    pokemons: SmallPokemon[];
}

export default component$(() => {

    // useStylesScoped$(styles); // El stylesScoped se declara dentro del componente y se le pasa el nombre del archivo css, solo sirve para la agregar de manera global al componente y lo que este dentro de el 
    const pokemonState = useStore<PokemonPageState>({
        currentPage: 0,
        pokemons: [],
    })

    return (
        <>

            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Pagina actual: { pokemonState.currentPage }</span>
                <span>Esta cargando: </span>

            </div>

            <div class="mt-10">
                <button
                    onClick$={() => pokemonState.currentPage--}
                    class= { pokemonState.currentPage === 0 ? "btn btn-block pointer-events-none mr-2" : "btn btn-primary mr-2"}
                >
                    Anteriores
                </button>

                <button 
                    onClick$={() => pokemonState.currentPage++}
                    class="btn btn-primary mr-2"
                >
                    Siguientes
                </button>
            </div>

            <div class="grid grid-cols-6 mt-5">
                {
                    // pokemonResp.value.map(({ name, id }) => (
                    //     <div 
                    //         key={ name }
                    //         class="m-5 flex flex-col justify-center items-center"
                    //     >
                    //         <PokemonImage id={id} />
                    //         <span class="capitalize">{ name }</span>
                    //     </div>
                    // ))
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