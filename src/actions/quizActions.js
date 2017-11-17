export function changeOption(question, option){
	return {
		type: "OPTION_CHANGED",
		question: question,
		option: option,
	}
}

export function submit(){
	return {
		type: "SUBMITTED",
	}
}