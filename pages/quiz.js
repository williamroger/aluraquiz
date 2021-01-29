import React from 'react';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';

function LoadWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

export default function QuizPage() {
  console.log('questions ', db.questions);
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Pergunta 1 de {db.questions.length}</h1>
          </Widget.Header>
          <img 
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
            }}
            src="https://placehold.it/400x400" 
            alt="Imagem"
          />
          <Widget.Content>
            <h2>Título</h2>
            <p>Descrição</p>
            <Button>
              Confirmar
            </Button>
          </Widget.Content>
        </Widget>
        
        <LoadWidget />
      </QuizContainer>
    </QuizBackground>
  );
}