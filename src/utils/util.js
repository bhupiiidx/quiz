import operator from '../data/operators.json';

export const randomNumberGenerator = (range) => Math.floor(Math.random() * range);

export const generateRandomQuestion = (limit, selQuesArr, i) => {
	// Random 1
	var rand1 = randomNumberGenerator(limit);
	// Random 2
	var rand2 = randomNumberGenerator(limit);
	// Random number between selected opr length
	var selOprRandIndex = randomNumberGenerator(selQuesArr.length);
	// value of that rand generated index
	var selOprRandIndexVal = selQuesArr[selOprRandIndex];
	// from that value find index in operator array
	var findIndexOfOpr = operator.findIndex((item) => item.id === selOprRandIndexVal);
	// now question is
	var returnQues = `${rand1} ${operator[findIndexOfOpr].symbol} ${rand2}`;
	return returnQues;
};

export const generateRandomQuestions = (count, selQuesArr, limit) => {
	var quesArray = [];
	for (let i = 0; i < count; i++) {
		var newQues = generateRandomQuestion(limit, selQuesArr, i);
		var answer = '';
		if (newQues.replace(/\s+/g, '') === '0/0' || newQues.replace(/\s+/g, '') === '1/0') {
			answer = 0;
		} else {
			answer = eval(newQues.replace(/\s+/g, ''));
		}
		
		quesArray.push({
			id: randomNumberGenerator(limit + count),
			title: newQues,
			answer: answer
		});
	}
	return quesArray;
};
