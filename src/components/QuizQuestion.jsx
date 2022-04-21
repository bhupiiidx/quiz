import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

function QuizQuestion({ question, totalQuestion, currentQuestion, setAnswers }) {
	const [ typedQuesVal, setTypedQuesVal ] = useState('');
	const timer = useRef(null);
	const progressBar = useRef(null);

	function goToNextQuestion() {
		flushSync(() => {
			console.log('current val is', typedQuesVal);
			setAnswers(typedQuesVal);
		});

		if (timer.current) {
			clearTimeout(timer.current);
		}
		setTypedQuesVal('');
	}

	useEffect(
		() => {
			progressBar.current.classList.remove('active');
			setTimeout(() => {
				progressBar.current.classList.add('active');
			}, 0);
			timer.current = setTimeout(goToNextQuestion, 15 * 1000);
		},
		[ question ]
	);

	return (
		<Box className="question">
			<Box className="progress-bar" ref={progressBar} />
			<Box className="question-count">
				<Typography variant="span">{currentQuestion}</Typography>
				<Typography variant="span" style={{ margin: '0 2px' }}>
					of
				</Typography>
				<Typography variant="span">{totalQuestion}</Typography>
			</Box>
			<Box className="main">
				<Box className="title">
					<Typography variant="span" className="sideHeading">
						Question:
					</Typography>
					<Typography variant="span" className="mainHeading">
						{question.title}
					</Typography>
				</Box>
			</Box>
			<Box className="options">
				<TextField
					fullWidth
					id="typedQuesVal"
					label="Answers"
					variant="standard"
					value={typedQuesVal}
					onChange={(event) => {
						console.log('event.target.value is=>', event.target.value);
						setTypedQuesVal(event.target.value);
					}}
					helperText="For 0/0 and 1/0 enter 0 and proceed"
				/>
			</Box>
			<Box className="controls">
				<Button variant="outlined" color="primary" onClick={goToNextQuestion} size="small">
					Skip
				</Button>
				<Button variant="contained" color="secondary" onClick={goToNextQuestion} size="small">
					Next
				</Button>
			</Box>
		</Box>
	);
}

export default QuizQuestion;
