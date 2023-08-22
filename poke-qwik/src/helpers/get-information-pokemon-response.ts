

const baseUrl = 'https://pokeapi.co/api/v2/pokemon-species';

// Peticion para obtener el detalle de un pokemon
export const getDetailByPokemonId = async (id:number) => {
    const resp = await fetch(`${baseUrl}/${id}`);
    const data = (await resp.json());
    const descripInSpanish = data.flavor_text_entries.filter(
        (item) => item.language.name === 'es'
    );

    return descripInSpanish.map((item) => item.flavor_text).join('');
}