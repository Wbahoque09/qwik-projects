import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <>
            <h3>Admin Dashboard</h3>
            <p>Esta ruta debe ser privada</p>
        </>
    )
});

export const head: DocumentHead = {
    title: "Dashboard",
};