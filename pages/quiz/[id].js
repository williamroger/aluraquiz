import React from 'react';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExternal }) {
  return (
    <QuizScreen 
      externalQuestions={dbExternal.questions}
      bgExternal={dbExternal.bg}  
    />
  );
}


export async function getServerSideProps(context) {
  // console.log('contex ', context.query);
  const dbExternal = await fetch('https://aluraquiz-css.omariosouto.vercel.app/api/db')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Tá tudo cagado!')
    })
    .then((response) => {return response})
    .catch((err) => console.error(err));

  // console.log('dbExternal ', dbExternal);
  return {
    props: { dbExternal},
  }
}