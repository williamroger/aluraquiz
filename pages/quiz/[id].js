import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExternal }) {
  return (
    <ThemeProvider theme={dbExternal.theme}>
      <QuizScreen
        externalQuestions={dbExternal.questions}
        bgExternal={dbExternal.bg}
      />
    </ThemeProvider>
  );
}


export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  try {
    const dbExternal = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Algo deu errado ao tentar pegar os dados!')
      })
      .then((response) => { return response });

    return {
      props: { dbExternal },
    };
  } catch(err) {
    throw new Error(err);
  }
}