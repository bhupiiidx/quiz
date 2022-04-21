import React, { useState } from 'react';
import QuestionList from '../data/quizSample.json';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
function Quizscreen({ retry }) {
	const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
	const [ markedAnswers, setMarkedAnswers ] = useState(new Array(QuestionList.length));
	const isQuestionEnd = currentQuestionIndex === QuestionList.length;
	const [ result, setResult ] = useState({});

	function calculateResult() {
		let correct = 0;
		QuestionList.forEach((question, index) => {
			if (question.correctIndex === markedAnswers[index]) {
				console.log('inside if');
				correct++;
			}
			console.log(
				'question.correctIndex , markedAnswers[index]',
				question.correctIndex,
				markedAnswers[index],
				' | and correct ',
				correct
			);
		});
		setResult({
			total: QuestionList.length,
			correct: correct,
			incorrect: QuestionList.length - correct,
			unselected: markedAnswers.filter((f) => f === undefined ||  f === null).length,
			percentage: Math.trunc(correct / QuestionList.length * 100),
			selectedAnswers: markedAnswers,
			allQuestion: QuestionList
		});
	}

	return (
		<div className="quiz-screen">
			{isQuestionEnd ? (
				<QuizResult retry={retry} result={result} calculate={calculateResult} />
			) : (
				<QuizQuestion
					question={QuestionList[currentQuestionIndex]}
					totalQuestion={QuestionList.length}
					currentQuestion={currentQuestionIndex + 1}
					setAnswers={(index) => {
						console.log('current outer index is', index);
						console.log('current outer currentQuestionIndex is', currentQuestionIndex);
						setMarkedAnswers((prev) => {
							console.log('current inner index is', index);
							console.log(
								'current inner currentQuestionIndex is',
								currentQuestionIndex,
								' and prev is having ',
								prev
							);
							let newArr = [ ...prev ];
							newArr[currentQuestionIndex] = index
							return newArr;
						});
						setCurrentQuestionIndex(currentQuestionIndex + 1);
					}}
				/>
			)}
		</div>
	);
}

export default Quizscreen;
