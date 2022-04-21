import { Box, Typography } from '@mui/material';
import React from 'react';

function ViewResult({ result }) {
	return (
		<Box sx={{ my: 2 }} className="result-questions">
			<Typography variant="h5">All Questions and Answers</Typography>
			{result.allQuestion.map((mapData, mainindex) => {
				var userSelected = 'option selectedans';
				if (mapData.answer == result.selectedAnswers[mainindex]) {
					userSelected = "option selectedans correctans"
				}
				return (
					<Box className="result-question" key={'question-' + mainindex}>
						<Typography variant="h6">
							<Typography variant="span" className="subHeading">
								Question:{' '}
							</Typography>
							<Typography variant="span" className="mainHeading">
								{mapData.title}{' '}
							</Typography>
						</Typography>
						{/* <Box className="result-question-options">
							{mapData.options.map((loop, index) => {
								// option selectedans correctans
								var userSelected = '';

								if (mapData.correctIndex === result.selectedAnswers[mainindex] === index) {
									console.log("mapData.correctIndex === result.selectedAnswers[mainindex] ",mapData.correctIndex === result.selectedAnswers[mainindex],mapData.correctIndex , result.selectedAnswers[mainindex],"if 1",mainindex)
									userSelected = 'option selectedans correctans';
								}else if(mapData.correctIndex === index){
									console.log("mapData.correctIndex === index ",mapData.correctIndex === index,mapData.correctIndex , index,"else block 1",mainindex)
									userSelected = 'option correctans';
								}
								else if(result.selectedAnswers[mainindex] === index){
									console.log("result.selectedAnswers[mainindex] === index ",mapData.correctIndex === result.selectedAnswers[mainindex],result.selectedAnswers[mainindex] , index," else block 2",mainindex)
									userSelected = 'option selectedans';
								}
								else{
									console.log("mapData.correctIndex === result.selectedAnswers[mainindex] ",mapData.correctIndex , result.selectedAnswers[mainindex],index,"else",mainindex)
									userSelected = 'option';
								}

								return (
									<Typography
										key={'question-' + index + '-option-' + index}
										variant="span"
										className={userSelected}
									>
										{loop}
									</Typography>
								);
							})}
						</Box> */}
						<Box className="result-question-options">
							<Typography
								variant="span"
								className={userSelected}
							>
								Answer:- {result.selectedAnswers[mainindex]}
							</Typography>
							<Typography
								variant="span"
							>
								Correct:- {mapData.answer}
							</Typography>
						</Box>
					</Box>
				);
			})}
		</Box>
	);
}

export default ViewResult;
