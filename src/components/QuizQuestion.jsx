import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

function QuizQuestion({ question, totalQuestion, currentQuestion, setAnswers }) {
	const [ selectedOption, setSelectedOption ] = useState(null);
	const timer = useRef(null);
	const progressBar = useRef(null);

	function goToNextQuestion() {
		if (timer.current) {
			clearTimeout(timer.current);
		}
		flushSync(() => {
			console.log('current val is', selectedOption);
			let newVal = selectedOption;
			setSelectedOption(null);
			setAnswers(newVal);
		});
		// setTimeout(()=> setSelectedOption(null),100)
	}

	useEffect(
		() => {
			progressBar.current.classList.remove('active');
			setTimeout(() => {
				progressBar.current.classList.add('active');
			}, 0);
			timer.current = setTimeout(goToNextQuestion, 25 * 1000);
		},
		[ question ]
	);

	return (
		<Box className="question">
			<Box className="progress-bar" ref={progressBar} />
			<Box className="question-count">
				<Typography variant="span">{currentQuestion}</Typography>
				<Typography variant="span" style={{margin:'0 2px'}}>of</Typography>
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
				{question.options.map((option, index) => {
					return (
						<Button
							variant={index === selectedOption ? 'contained' : 'outlined'}
							color={index === selectedOption ? 'success' : 'primary'}
							key={index}
							onClick={() => setSelectedOption(index)}
							className='option'
							size="small"
						>
							<Typography variant="span">{option}</Typography>
						</Button>
					);
				})}
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
