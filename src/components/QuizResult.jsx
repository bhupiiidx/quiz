import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ViewResult from './ViewResult';

function QuizResult({ retry, result, calculate }) {
	const [ viewResult, setViewResult ] = useState(false);
	useEffect(() => {
		calculate();
	}, []);
	return (
		<Box className="result-screen">
			<Box className="result-summary">
				<Typography variant="h2">
					Result:{' '}
					<span style={{ color: result.percentage > 50 ? 'green' : 'red' }}>{result.percentage}%</span>
				</Typography>
				<Typography variant="p">
					Selected {result.correct} correct option out of {result.total} questions
				</Typography>
				<Typography variant="p">Selected Incorrect: {result.incorrect}</Typography>
				<Typography variant="p">Unselected: {result.unselected}</Typography>
				<Box className="controls">
					<Button variant="contained" color="error" onClick={retry} size="small">
						Restart
					</Button>
					<Button variant="outlined" color="primary" onClick={()=>setViewResult(true)} size="small">
						View Result
					</Button>
				</Box>
			</Box>
			{viewResult && <ViewResult result={result}/>}
		</Box>
	);
}

export default QuizResult;
