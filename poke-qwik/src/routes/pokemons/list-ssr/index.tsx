import { component$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import type { BasicPokemonInfo, PokemonListResponse } from '~/interfaces';

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async() => {

    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=10`);
    const data = await resp.json() as PokemonListResponse;

    console.log(data);

    return data.results;

})

export default component$(() => {

    const pokemonResp = usePokemonList();
    const location = useLocation();

    console.log(location.url);

    return (
        <>

            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Pagina actual: xxxx</span>
                <span>Esta cargando pagina: xxxx</span>

            </div>

            <div class="mt-10">
                <Link href={'/pokemons/list-ssr/?offset=10'} 
                    class="btn btn-primary mr-2">
                    Anteriores
                </Link>

                <Link href={'/pokemons/list-ssr/?offset=20'} 
                    class="btn btn-primary mr-2">
                    Siguientes
                </Link>
            </div>

            <div class="grid grid-cols-6 mt-5">
                {
                    pokemonResp.value.map(({ name }) => (
                        <div 
                            key={ name }
                            class="m-5 flex flex-col justify-center items-center"
                        >
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
    title: "SSR-List",
};