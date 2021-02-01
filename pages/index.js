import React from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>

            <form 
              onSubmit={(event) => {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);

                console.log('fazendo o submit...');
              }}
            >
              <Input 
                name="nomeUsuario"
                value={name}
                placeholder="Diz aí seu nome pra jogar :)" 
                onChange={(event) => setName(event.target.value) }
              />
          
              <Button type="submit" disabled={name.length === 0}>
                {`Let's go ${name}!`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((link) => {
                const [projectName, githubUser] = link.replace(/\//g, '').replace('https:', '').replace('.vercel.app', '').split('.');
                
                return (
                  <li key={link}>
                    <Widget.Topic 
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer />

        <GitHubCorner projectUrl="https://github.com/williamroger/aluraquiz" />
      </QuizContainer>
    </QuizBackground>
  );
}
