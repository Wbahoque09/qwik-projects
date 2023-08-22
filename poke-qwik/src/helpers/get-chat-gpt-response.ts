// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
});

export const getFuncFactAboutPokemon = async( pokemonName: string ):Promise<string> => {

    const response = await openai.completions.create({
        model: "text-ada-001",
        prompt: `Escribe datos interesantes del pokémon ${ pokemonName }`,
        temperature: 1,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    // console.log(response);

    return response.choices[0].text || `No tengo nada sobre ${ pokemonName }, lo siento`;

} 


