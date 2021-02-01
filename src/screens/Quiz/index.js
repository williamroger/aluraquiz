import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import GitHubCorner from '../../components/GitHubCorner';
import Widget from '../../components/Widget';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm';
import Footer from '../../components/Footer';
import BackLinkArrow from '../../components/BackLinkArrow';

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

function ResultWidget({ results, totalQuestions }) {
  const router = useRouter();
  const nameUser = router.query.name;
  const countQuestions = totalQuestions;
  const rightAnswers = results.filter(result => result).length;
  const mediaResult = rightAnswers >= (countQuestions / 2);

  return (
    <Widget
      as={motion.section}
      transition={{ delay: 0, duration: 0.5 }}
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '100%' },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        {mediaResult && <h1>{`Parabéns ${nameUser ? nameUser : ''}! Você tem um excelente conhecimento sobre cinema!`}</h1>}
        {!mediaResult && <h1>{`${nameUser ? nameUser : ''} ${nameUser ? ', você' : 'Você'} precisa assistir mais filmes hein? Tá fraco demais ainda!`}</h1>}
      </Widget.Header>

      <Widget.Content>
        <p>Você acertou {rightAnswers} das {countQuestions} perguntas!</p>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              #{(index < 9) ? '0' + (index + 1) : index + 1} Resultado: {result ? 'ACERTOU!' : 'ERROU!'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionID = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget 
      as={motion.section}
      transition={{ delay: 0, duration: 0.5 }}
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '100%' },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <BackLinkArrow href="/" title="Voltar para o ínicio"/>
        <h1>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h1>
      </Widget.Header>
      <img
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
        src={question.image}
        alt="Imagem"
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
              addResult(isCorrect);
              onSubmit();
            }, 1 * 3000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeID = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                key={alternativeID}
                as="label"
                htmlFor={alternativeID}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  type="radio"
                  name={questionID}
                  id={alternativeID}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            )
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}

export default function QuizScreen({ externalQuestions, bgExternal }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = bgExternal;

  function addResult(result) {
    setResults([
      ...results,
      result
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} totalQuestions={totalQuestions} />}

        {screenState === screenStates.RESULT && <Footer />}
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/williamroger/aluraquiz" />
    </QuizBackground>
  );
}