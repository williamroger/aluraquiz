import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';

import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    background-color: #000000;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>CinemaQuiz — Teste os seus conhecimentos sobre Cinema.</title>
        <meta name="title" content="CinemaQuiz — Teste os seus conhecimentos sobre Cinema." />
        <meta name="description" content="Desenvolvimento de uma aplicação do tipo Quiz utilizando as tecnologias React, Styled Components e Next.js durante a Imersão React da Alura." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cinemaquiz.williamroger.vercel.app/" />
        <meta property="og:title" content="CinemaQuiz — Teste os seus conhecimentos sobre Cinema." />
        <meta property="og:description" content="Desenvolvimento de uma aplicação do tipo Quiz utilizando as tecnologias React, Styled Components e Next.js durante a Imersão React da Alura." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cinemaquiz.williamroger.vercel.app/" />
        <meta property="twitter:title" content="CinemaQuiz — Teste os seus conhecimentos sobre Cinema." />
        <meta property="twitter:description" content="Desenvolvimento de uma aplicação do tipo Quiz utilizando as tecnologias React, Styled Components e Next.js durante a Imersão React da Alura." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
