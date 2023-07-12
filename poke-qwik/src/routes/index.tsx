import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// import Counter from "~/components/starter/counter/counter";
// import Hero from "~/components/starter/hero/hero";
// import Infobox from "~/components/starter/infobox/infobox";
// import Starter from "~/components/starter/next-steps/next-steps";

export default component$(() => {

  const pokemonId = useSignal(1); // useSignal se usa para mantener el estado, se usa con primitivos 

  const changePokemonId = $(( value: number ) => {
    if ( (pokemonId.value + value) <= 0 ) return;

    pokemonId.value += value;
  })

  return (
    <>
      
      <span class="text-2xl" >Buscador simple</span>
      
      <span class="text-9xl" >{ pokemonId }</span>

      <img width="96" height="96" 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemonId.value }.png`} 
        alt="Pokemon Sprite"
        style={{ width:'200px' }} 
      />

      <div class="mt-2">
        <button onClick$={ () => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button> 
        <button onClick$={ () => changePokemonId(+1)} class="btn btn-primary">Siguiente</button>
      </div>
      {/* La propiedad onClick$, el signo de peso indica que la carga va ser perezosa, solo se va a cargar esa sola parte del codigo */}
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Este es mi primera aplicacion en qwik",
    },
  ],
};
