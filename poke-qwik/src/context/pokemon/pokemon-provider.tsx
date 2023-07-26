
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

    useVisibleTask$(() => {
        // TODO: leer del local storage
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