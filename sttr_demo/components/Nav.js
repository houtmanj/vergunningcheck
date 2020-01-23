import { useRouter } from 'next/router';
import Link from 'next/link';

export default () => {
  const router = useRouter();

  return (
    <nav>
      <style jsx>
        {`
          :global(body) {
            padding-top: 3em;
          }
          nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 0 1em;
            display: flex;
            height: 3em;
            align-items: center;
            background: #eee;
          }
          a {
            font-weight: bold;
            padding-right: 2em;
            color: black;
          }
          .active {
            text-decoration: none;
          }
        `}
      </style>
      <Link href="/">
        <a className={router.pathname === '/' && 'active'}>Home</a>
      </Link>
      <Link href="/contact">
        <a className={router.pathname === '/contact' && 'active'}>Contact</a>
      </Link>
    </nav>
  );
};
