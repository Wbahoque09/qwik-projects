import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$, zod$, z, type DocumentHead } from '@builder.io/qwik-city';

import styles from './login.css?inline';


export const useLoginUserAction = routeAction$(( data, { cookie, redirect } ) => {
    
    const { email, password } = data;

    // TypeOrm Prisma
    if (email === 'correo@correo.com' && password === '123456') {
        cookie.set('jwt','esto_es_mi_jwt',{ secure: true, path: '/' });
        throw redirect(302, '/');    
        // return {
        //     success: true,
        //     jwt: 'esto_es_mi_jwt'
        // }
    }


    return {
        success: false,
    }


}, zod$({
    email   : z.string().email('Formato no válido'),
    password: z.string().min(6,'Minimo 6 letras'),
}));

export default component$(() => {

    useStylesScoped$(styles);

    const action = useLoginUserAction();

    return (
        <Form action={action} class="login-form mt-5">
            <div class="relative">
                <input
                    name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative mt-3">
                <input
                    id="password" name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type='submit'>Ingresar</button>
            </div>

            <p>
                {action.value?.success &&(
                    <code>Autentication: Token: { action.value.success }</code>
                )}
            </p>

            <code>
                { JSON.stringify( action.value, undefined , 2 ) }
            </code>
        </Form>
    )
});

export const head: DocumentHead = {
    title: "Login",
};