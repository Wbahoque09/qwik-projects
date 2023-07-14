/* eslint-disable @typescript-eslint/consistent-type-imports */

import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return <>Hola Mundo - SSR!</>
});

export const head: DocumentHead = {
    title: "SSR-List",
    meta: [
    {
        name: "description",
        content: "Este es mi segunda pestaña en qwik",
    },
    ],
};