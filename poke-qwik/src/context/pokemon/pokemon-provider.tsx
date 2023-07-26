
import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type PokemonGameState, PokemonGameContext } from './pokemon-game-context';
import { type PokemonListState, PokemonListContext } from './pokemon-list.context';

export const PokemonProvider = component$(() => {
    
    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 1,
        postionImagenPokemon: false,
        revelationImage: true,
    });
    
    const pokemonLoading = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: false,
        pokemons: []
    });
    
    useContextProvider( PokemonGameContext, pokemonGame ); // Este useContextProvider se coloca aqui para tener informacion global del estado en los componentes hijos
    useContextProvider( PokemonListContext, pokemonLoading );

    useVisibleTask$(() => { // Se utiliza para leer la data guardada en el LocalStorage
        if ( localStorage.getItem('pokemon-game') ) {
            const { 
                revelationImage = true,
                pokemonId = 1,
                postionImagenPokemon = false, 
            } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState ; // Se desestructura de local storage y se vuelve a su estado inicial, los valores asignados son por defecto por si no viene nada 
            // Se asignan al store los valores traidos del localStorage
            pokemonGame.pokemonId = pokemonId;
            pokemonGame.revelationImage = revelationImage;
            pokemonGame.postionImagenPokemon = postionImagenPokemon;

        }
    });
    
    useVisibleTask$(({ track }) => { // Se utiliza este useVisibleTask para guardar datos en el localStorage
        track( () => [ pokemonGame.pokemonId, pokemonGame.postionImagenPokemon, pokemonGame.revelationImage ] );

        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
    });

    return <Slot />


});

// Estaba en layout

// export const useServerTimeLoader = routeLoader$(() => {
//   return {
//     date: new Date().toISOString(),
//   };
// });

// const pokemonGame = useStore<PokemonGameState>({
  //   pokemonId: 4,
  //   postionImagenPokemon: false,
  //   revelationImage: true,
  // });

  // useContextProvider( PokemonGameContext, pokemonGame ); // Este useContextProvider se coloca aqui para tener informacion global del estado en los componentes hijos

  // const pokemonLoading = useStore<PokemonListState>({
  //   currentPage: 0,
  //   isLoading: false,
  //   pokemons: []
  // });

  // useContextProvider( PokemonListContext, pokemonLoading );