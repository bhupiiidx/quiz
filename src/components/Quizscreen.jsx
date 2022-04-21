import React, { useEffect, useState } from 'react';
// import genQues from '../data/quizSample.json';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
function Quizscreen({ whichOne, genQues, retry }) {
	const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
	const [ typedAnswers, setTypedAnswers ] = useState(new Array(genQues.length));
	const isQuestionEnd = currentQuestionIndex === genQues.length;
	const [ result, setResult ] = useState({});

	function calculateResult() {
		let correct = 0;
		genQues.forEach((question, index) => {
			console.log('question is =>', question);
			console.log('question.answer is =>', question.answer);
			if (question.answer == typedAnswers[index]) {
				console.log('inside if');
				correct++;
			}
			console.log(
				'question.answer , typedAnswers[index]',
				question,
				typedAnswers[index],
				' | and correct ',
				correct
			);
		});
		setResult({
			total: genQues.length,
			correct: correct,
			incorrect: genQues.length - correct,
			unselected: typedAnswers.filter((f) => f === undefined || f === null).length,
			percentage: Math.trunc(correct / genQues.length * 100),
			selectedAnswers: typedAnswers,
			allQuestion: genQues
		});
	}

	return (
		<div className="quiz-screen">
			{isQuestionEnd ? (
				<QuizResult retry={retry} result={result} calculate={calculateResult} />
			) : (
				<QuizQuestion
					question={genQues[currentQuestionIndex]}
					totalQuestion={genQues.length}
					currentQuestion={currentQuestionIndex + 1}
					setAnswers={(index) => {
						console.log('current outer index is', index);
						console.log('current outer currentQuestionIndex is', currentQuestionIndex);
						setTypedAnswers((prev) => {
							console.log('current inner index is', index);
							console.log(
								'current inner currentQuestionIndex is',
								currentQuestionIndex,
								' and prev is having ',
								prev
							);
							let newArr = [ ...prev ];
							newArr[currentQuestionIndex] = index;
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
