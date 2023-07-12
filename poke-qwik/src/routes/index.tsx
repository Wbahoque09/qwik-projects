import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// import Counter from "~/components/starter/counter/counter";
// import Hero from "~/components/starter/hero/hero";
// import Infobox from "~/components/starter/infobox/infobox";
// import Starter from "~/components/starter/next-steps/next-steps";

export default component$(() => {

  const pokemonId = useSignal(1); // useSignal se usa para mantener el estado, se usa con primitivos 

  return (
    <>
      
      <span class="text-2xl" >Buscador simple</span>
      
      <span class="text-9xl" >{ pokemonId }</span>

      {/* TODO: crear imagen */}

      <div class="mt-2">
        <button class="btn btn-primary mr-2">Anterior</button>
        <button class="btn btn-primary">Siguiente</button>
      </div>
      
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
