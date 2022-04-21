import React, { useEffect, useState } from 'react';
import Operator from '../data/operators.json';
import {
	Box,
	Button,
	Card,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	ListItemText,
	MenuItem,
	Modal,
	Paper,
	Select,
	TextField,
	Typography
} from '@mui/material';
import JoinScreen from './JoinScreen';
import Quizscreen from './Quizscreen';
import { useTheme } from '@mui/material/styles';
import { generateRandomQuestions } from '../utils/util';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4
};

function getStyles(name, selectedOpr, theme) {
	return {
		fontWeight:
			selectedOpr.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
	};
}

function Home() {
	const theme = useTheme();
	const [ selectedOpr, setSelectedOpr ] = useState([]);
	const [ isQuizOneStarted, setIsQuizOneStarted ] = useState(false);
	const [ isQuizTwoStarted, setIsQuizTwoStarted ] = useState(false);
	const [ open, setOpen ] = useState(false);
	const [ modalFor, setModalFor ] = useState('');
	const [ quizCreation, setQuizCreation ] = useState({
		numberOfQues: '',
		numberOfOPerator: [],
		rangeOfQues: ''
	});
	const [ genQuesOne, setGenQuesOne ] = useState([]);
	const [ genQuesTwo, setGenQuesTwo ] = useState([]);

	const handleModalFieldValueChange = (event) => {
		if (event.target.name === 'questionCount') {
			setQuizCreation({
				...quizCreation,
				numberOfQues: event.target.value
			});
		}
		if (event.target.name === 'questionRange') {
			setQuizCreation({
				...quizCreation,
				rangeOfQues: event.target.value
			});
		}
		if (event.target.name === 'questionOpr') {
			const { target: { value } } = event;
			setSelectedOpr(
				// On autofill we get a stringified value.
				typeof value === 'string' ? value.split(',') : value
			);
			setQuizCreation({
				...quizCreation,
				numberOfOPerator: value
			});
		}
	};

	const handleOpen = (type) => {
		setModalFor(type);
		setOpen(true);
	};

	const handleClose = () => {
		setModalFor('');
		setOpen(false);
	};

	const handleGenerate = async (event) => {
		event.preventDefault();
		const allRandomQues = await generateRandomQuestions(
			quizCreation.numberOfQues,
			quizCreation.numberOfOPerator,
			quizCreation.rangeOfQues
		);

		console.log('all generated quuestions are', allRandomQues);
		// Clear All
		setModalFor('');
		setOpen(false);
		setQuizCreation({
			numberOfQues: '',
			numberOfOPerator: [],
			rangeOfQues: ''
		});
		setSelectedOpr([]);

		// Start Quiz
		if (modalFor === 'one') {
			console.log('here in one and data is', allRandomQues);
			setGenQuesOne(allRandomQues);
			setIsQuizOneStarted(true);
		}
		if (modalFor === 'two') {
			console.log('here in two and data is', allRandomQues);
			setGenQuesTwo(allRandomQues);
			setIsQuizTwoStarted(true);
		}
	};

	useEffect(() => {}, [ genQuesOne, genQuesTwo ]);

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
							<Quizscreen whichOne="one" genQues={genQuesOne} retry={() => setIsQuizOneStarted(false)} />
						) : (
							// <JoinScreen whichOne="one" start={() => setIsQuizOneStarted(true)} />
							<JoinScreen whichOne="one" start={() => handleOpen('one')} />
						)}
					</Grid>
					<Grid
						item
						xs={12}
						lg={6}
						className={isQuizTwoStarted ? 'side side-two quiz' : 'side side-two join'}
					>
						{isQuizTwoStarted ? (
							<Quizscreen whichOne="two" genQues={genQuesTwo} retry={() => setIsQuizTwoStarted(false)} />
						) : (
							<JoinScreen whichOne="two" start={() => handleOpen('two')} />
						)}
					</Grid>
				</Grid>
			</Paper>
			<Dialog
				keepMounted
				open={open}
				onClose={handleClose}
				aria-labelledby="keep-mounted-modal-title"
				aria-describedby="keep-mounted-modal-description"
			>
				<DialogTitle id="keep-mounted-modal-title" variant="h6" component="h2">
					Select Question Pattern
				</DialogTitle>
				<DialogContent>
					<FormControl fullWidth margin="normal">
						<InputLabel id="select-question-count-label">Question</InputLabel>
						<Select
							labelId="select-question-count-label"
							id="select-question-count"
							value={quizCreation.numberOfQues}
							label="Question"
							onChange={(event) => handleModalFieldValueChange(event)}
							name="questionCount"
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
						<FormHelperText>Select Number Of Question</FormHelperText>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<InputLabel id="select-range-label">Range</InputLabel>
						<Select
							labelId="select-range-label"
							id="select-range"
							value={quizCreation.rangeOfQues}
							label="Question"
							onChange={(event) => handleModalFieldValueChange(event)}
							name="questionRange"
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
						<FormHelperText>Select Range Of Random Number for Arithmetic Operation</FormHelperText>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<InputLabel id="select-operator-label">Operator</InputLabel>
						<Select
							labelId="select-operator-label"
							id="select-operator"
							value={selectedOpr}
							label="Question"
							multiple
							onChange={(event) => handleModalFieldValueChange(event)}
							name="questionOpr"
						>
							{Operator.map((operator) => (
								<MenuItem
									key={operator.id}
									value={operator.id}
									style={getStyles(operator.id, selectedOpr, theme)}
								>
									{operator.name + ' (' + operator.symbol + ')'}
								</MenuItem>
							))}
						</Select>
						<FormHelperText>Select Operator for Arithmetic Operation </FormHelperText>
					</FormControl>
					<Button variant="contained" onClick={handleGenerate}>
						Generate
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default Home;
