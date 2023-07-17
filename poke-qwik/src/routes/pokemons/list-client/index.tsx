import { component$, } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
// import styles from '../../styles.css?inline'; Se importa con el signo de pregunta y inline para evitar errores y funcione correctamente

export default component$(() => {

    // useStylesScoped$(styles); // El stylesScoped se declara dentro del componente y se le pasa el nombre del archivo css, solo sirve para la agregar de manera global al componente y lo que este dentro de el 

    return <>Hola Mundo - List Client!</>
});

export const head: DocumentHead = {
    title: "List Client",
};