import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { useCounter } from '~/hooks/use-counter';

export default component$(() => {

    const { counter, increase, decrease } = useCounter(1); // Desestructuracion del custom hook use-counter

    return (
        <>

            <span class="text-2xl">Counter</span>
            <span class="text-7xl">{counter.value}</span>

            <div class="mt-2">
                <button onClick$={decrease}  
                    class={ counter.value < 2 ? "btn btn-block pointer-events-none mr-2" :"btn btn-primary mr-2"}
                >-1
                </button>
                <button onClick$={increase} class="btn btn-primary">+1</button>
            </div>

        </>
    )

});

export const head: DocumentHead = {
    title: "Counter",
};