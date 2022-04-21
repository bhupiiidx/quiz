import React, { useState } from 'react';
import { Card, Grid, Paper } from '@mui/material';
import JoinScreen from './JoinScreen';
import Quizscreen from './Quizscreen';

function Home() {
	const [ isQuizOneStarted, setIsQuizOneStarted ] = useState(false);
	const [ isQuizTwoStarted, setIsQuizTwoStarted ] = useState(false);

	return (
		<div className="home-screen">
			<Paper elevation={0}>
				<Grid container className="sides">
					<Grid
						item
						xs={12}
						lg={6}
						className={isQuizOneStarted ? 'side side-one quiz' : 'side side-one join'}
					>
						{isQuizOneStarted ? (
							<Quizscreen whichOne="one" retry={() => setIsQuizOneStarted(false)} />
						) : (
							<JoinScreen whichOne="one" start={() => setIsQuizOneStarted(true)} />
						)}
					</Grid>
					<Grid
						item
						xs={12}
						lg={6}
						className={isQuizTwoStarted ? 'side side-two quiz' : 'side side-two join'}
					>
						{isQuizTwoStarted ? (
							<Quizscreen whichOne="two" retry={() => setIsQuizTwoStarted(false)} />
						) : (
							<JoinScreen whichOne="two" start={() => setIsQuizTwoStarted(true)} />
						)}
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

export default Home;
