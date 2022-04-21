import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function JoinScreen({ start, whichOne }) {
	return (
		<div className="join-quiz">
			<Typography variant="h2">Join Quiz</Typography>
			<Typography variant="span">
				Each quiz section will show a mathematical question based on that you have to calculate answer within
				time limit and submit answers by clicking on next button
			</Typography>
			<Box>
				<Button color="success" variant={whichOne === 'one' ? 'contained' : 'outlined'} onClick={start}>
					Start Quiz
				</Button>
			</Box>
		</div>
	);
}

export default JoinScreen;
