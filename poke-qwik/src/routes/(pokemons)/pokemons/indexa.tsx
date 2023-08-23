
import { component$ } from '@builder.io/qwik';

export default component$(() => { 
    return <>Hola Mundo!</>
});

/**
 * Exportar por defecto sirve para el momento de crear una ruta,
 * El exportar por const no funciona y lo que se muestra en pantalla es lo que se digita en el archivo de index.tsx
 * Si no hay un index.tsx creo que no se muestra nada en la ruta (?)  
 */