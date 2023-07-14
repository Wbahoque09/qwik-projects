/* eslint-disable @typescript-eslint/consistent-type-imports */

import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return <>Hola Mundo - List Client!</>
});

export const head: DocumentHead = {
    title: "List Client",
    meta: [
    {
        name: "description",
        content: "Este es mi tercera pestaña en qwik",
    },
    ],
};