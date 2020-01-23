import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import activities from '../public/sttr/activities';
import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <Head>
      <title>Contact</title>
    </Head>

    <h1>Contact</h1>
    <p>Neem contact op met de gemeente. Hou deze gegevens bij de hand: ....</p>
  </Layout>
);

export default Home;
