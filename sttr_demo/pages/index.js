import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import activities from '../public/sttr/activities';
import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <Head>
      <title>Vergunning checker</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <h1>Vergunning checker</h1>

    <ul>
      <li>Algemene inleiding</li>
      <li>Algemene proclaimer</li>
    </ul>

    <p>Welke vergunning-check wilt u uitvoeren?</p>
    <ul>
      {activities.map(({ id, name }) => (
        <li key={id}>
          <Link href="[id]" as={`/${id}`}>
            <a>{name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export default Home;
