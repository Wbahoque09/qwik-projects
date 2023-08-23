import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { QwikLogo } from '../../icons/qwik';
import styles from './navbar.module.css';


export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo height={50} />
          </Link>
        </div>
        <ul>
          <li>
            <Link href='/login' >Login</Link>
          </li>
          <li>
            <Link href='/dashboard' >Admin Dashboard</Link>
          </li>
          <li>
            <Link href='/pokemons/list-ssr/' >SSR-List</Link>
          </li>
          <li>
            <Link href='/pokemons/list-client/' >Client-List</Link>
          </li>
          <li>
            <Link href='/counter/' >Counter</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});

/**
 * Las etiquetas <a> se cambian por los <Link>, esto solo para re-direccionar a una misma pagina dentro del proyecto
 * Los Link se les pasa tambien un href, en la direccion se les pasa las carpetas creadas dentro de la ruta
 */
