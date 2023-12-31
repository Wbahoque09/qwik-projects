import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemos/pokemon-image';
import { Modal } from '~/components/shared';
// import { getDetailByPokemonId } from '~/helpers/get-information-pokemon-response';
import { getFuncFactAboutPokemon } from '~/helpers/get-chat-gpt-response';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

// Esta funcion (routeLoader), es para validar los segmentos de las url y mandar a llamar la data  
export const usePokemonList = routeLoader$<SmallPokemon[]>(async({query, redirect, pathname}) => { 

    // console.log({query,pathname});
    const offset = Number( query.get('offset') || '0' );
    if (isNaN(offset)) throw redirect(301, pathname);
    if (offset < 0) throw redirect(301, pathname);
    
    const pokemons = await getSmallPokemons(offset);
    // console.log(pokemons);
    return pokemons;
    // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
    // const data = await resp.json() as PokemonListResponse;

    // console.log(data);
    

    // return data.results;

})

export default component$(() => {

    const pokemonResp = usePokemonList();
    const location = useLocation();
    const modalVisible = useSignal(false);
    const modalPokemon = useStore({
        id:'',
        name:''
    });

    const chatGptPokemonFact = useSignal('');

    useVisibleTask$(({ track }) => {
        track( () => modalPokemon.name );

        chatGptPokemonFact.value = '';

        if (modalPokemon.name.length > 0) {
            getFuncFactAboutPokemon( modalPokemon.name )
                .then( resp => chatGptPokemonFact.value = resp );
        }
        // if (modalPokemon.name.length > 0){
        //     chatGptPokemonFact.value = '';
        //     getDetailByPokemonId(modalPokemon.id).then(
        //         (resp) => (chatGptPokemonFact.value = resp)
        //     );
        // }

    })

    // Modal functions
    const showModal = $(( id: string, name: string ) => {
        // console.log(id, name);
        modalPokemon.id = id;
        modalPokemon.name = name;

        modalVisible.value = true;
    })

    const closeModal = $(() => {
        modalVisible.value = false;
    })

    const currentOffset = useComputed$<number>(() => {
        // const offsetString = location.url.searchParams.get('offset'); No encuentra el offset
        const offsetString = new URLSearchParams( location.url.search ); 

        // console.log(offsetString.get('offset'));


        return Number(offsetString.get('offset') || 0);
    })

    // console.log(location.url);

    return (
        <>

            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Pagina actual: { currentOffset }</span>
                <span>Esta cargando pagina: { location.isNavigating ? 'Si':'No' }</span>

            </div>

            <div class="mt-10">
                <Link href={`/pokemons/list-ssr/?offset=${ currentOffset.value - 10 }`} 
                    class={currentOffset.value >= 10 ? "btn btn-primary mr-2" : "btn btn-block pointer-events-none mr-2"}>
                    Anteriores
                </Link>

                <Link href={`/pokemons/list-ssr/?offset=${ currentOffset.value + 10 }`} 
                    class="btn btn-primary mr-2">
                    Siguientes
                </Link>
            </div>

            <div class="grid grid-cols-6 mt-5">
                {
                    pokemonResp.value.map(({ name, id }) => (
                        <div 
                            key={ name }
                            onClick$={() => showModal(id,name) }
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
            
            <Modal
                persistent
                // size='lg'
                showModal={modalVisible.value} 
                closeFn={closeModal}>
                <div q:slot='title'>{ modalPokemon.name }</div>
                <div q:slot='content' class="flex flex-col justify-center items-center">
                    <PokemonImage id={ modalPokemon.id } />

                    <span>
                        { chatGptPokemonFact.value === '' 
                            ? 'Preguntandole a ChatGPT' 
                            :  chatGptPokemonFact
                        }
                    </span>
                </div>
            </Modal>

        </>
    )
});

export const head: DocumentHead = {
    title: "SSR-List",
};