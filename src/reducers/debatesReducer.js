import { Map, fromJS } from "immutable";

var initState = {
	debates:[
	{
		topic: "fkbois vs frat bois",
		side1:[
			{
				parent: null,
				text: "Blah bshfjdfhsi skdshfsjd jkshfjdhssai shkhd sdhvjdchj sdhjfskdfsf",
				rebuttals: [1,2],
				user: "Matt",
				likes: 3,
				sources: [

				],
			},
			{
				parent: 2,
				text: "Blah bshfjdfhsi skdshfsjd",
				rebuttals: [],
				user: "fkboii",
				likes: 7,
				sources: [

				],
			},
			{
				parent: 1,
				text: "Blah bshfjdfhsi skdshfsjd",
				rebuttals: [],
				user: "Jeremy",
				likes: 12,
				sources: [

				],
			},

		],
		side2:[
			{
				parent: null,
				text: "I was amazed I was wrong",
				rebuttals: [],
				user: "Udit",
				likes: 0,
				sources: [

				],
			},
			{
				parent: 0,
				text: "What's my rapper name?",
				rebuttals: [2],
				user: "Vid",
				likes: 4,
				sources: [

				],
			},
			{
				parent: 0,
				text: "Damn it Will, you had one job",
				rebuttals: [1],
				user: "Will",
				likes: 10,
				sources: [

				],
			},
		]

	}]






	/*quiz: {
		questions: [
			{
		  		question: "Is Python psuedocode?",
		  		options: ["Yes", "No", "Idk", "It is machine code"],
		  		correctOption: 3,
		  		chosenOption: null,
		  		correct: false,
		  	},
		  	{
		  		question: "What are functions?",
		  		options: ["Functions are pointers", "Functions are values", 
		  		"Functions are less than 20 lines of code", "Idk brah"],
		  		correctOption: 2,
		  		chosenOption: null,
		  		correct: false,
		  	},
		  	{
		  		question: "Best Kosbie quote?",
		  		options: ["Alright sports fans", "Eddie post that on Piazza", "F bombs", 
		  		"When I was creating 112, Mark and I ..."],
		  		correctOption: 1,
		  		chosenOption: null,
		  		correct: false,
		  	}
		],
		score: 0,
		submitted: false,
		progress: 0, 
	}*/
}

var immutInit = Map(fromJS(initState));
export default function reducer(state = immutInit, action){
	switch (action.type) {
		case ("SUBMITTED"): {
			state = state.setIn(["quiz", "submitted"], true);
			var score = 0;
			var questions = state.getIn(["quiz", "questions"]);

			const questionList = questions.map((question, i) => {
				if (question.getIn(["correctOption"]) === question.getIn(["chosenOption"])){
					score += 1;
				}
				return ;
			});
			state = state.setIn(["quiz", "score"], score);
			break;
		}
		case ("OPTION_CHANGED"): {
			var questions = state.getIn(["quiz", "questions"]);
			var progress = state.getIn(["quiz", "progress"]);
			if (questions.getIn([action.question, "chosenOption"]) === null){
				 progress += 100/(questions.size);
			}
			state = state.setIn(["quiz", "progress"], progress);
			state = state.setIn(["quiz", "questions", action.question, "chosenOption"], action.option);
			break;
		}
		default:{
			break;
		}
	}
	return state;
}