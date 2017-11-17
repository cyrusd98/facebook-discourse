import React from "react";
import { connect } from "react-redux";
import { changeOption, submit } from "../actions/quizActions.js"
import '../index.css';
import { ProgressBar } from "react-bootstrap";

import { Map, List } from "immutable";

/*class Options extends React.Component{
	renderOption(i) {
    	return (
    	<div>
    		<label>
		        <input type="radio" name={this.props.index} value={this.props.options.get(i)}
					onClick = {() => this.props.onClick(i)} 
					/>
				{this.props.options.get(i)}
			</label>
		</div>
		);
	}

	render(){
		const optionList = this.props.options.map((option, i) => {
			return (this.renderOption(i));
			});

		if (this.props.correct){
			return (
	    	<div>
			    "Correct!"
    		</div>
    		);
		}
		else{
			return(
			<div >
				{optionList}
			</div>
		);
		}
	}
}

class Question extends React.Component{
	render(){
		var text = "";
		if (this.props.submitted){
			if (this.props.correctOption === this.props.chosenOption){
				text = "Correct"
			} else {
				text = "Wrong"
			}
		}
		return(
			<div> 
				<div> <span> {(this.props.index+1)+". "+this.props.question} </span> 
				<span> {"	"+text} </span> </div>
				<Options options={this.props.options} 
				onClick = {(i) => this.props.onClick(i)} 
				index={this.props.index} 
				/>
			</div>
		);
	}
}*/

class Debate extends React.Component{
	/*handleOptionChange(q, i){
		this.props.dispatch(changeOption(q, i));
	}

	handleSubmit(){
		this.props.dispatch(submit());
	}

  	renderQuestion(q){
  		return(
			<div> 
				<Question question={this.props.questions.getIn([q, "question"])} 
				options={this.props.questions.getIn([q, "options"])}
				correctOption={this.props.questions.getIn([q, "correctOption"])} 
				chosenOption={this.props.questions.getIn([q, "chosenOption"])}
				submitted = {this.props.submitted}
				index = {q}
				onClick = {(i) => this.handleOptionChange(q, i)}/>
			</div>
		);	
  	}

<button onClick = {() => this.handleSubmit()} > Submit </button>
  	*/

  	render() {
  		var style = {
  			display:"inline-block",
  		};
		return(
			<div>
				<div> facebook discourse </div>
				<div> {this.props.debate.getIn(["topic"])} </div>
				<div> 
					<div style = {style}> </div>
					<div style = {style}> </div>
					<div style = {style}> </div>
				</div>
			</div>
		);
	}
}



function stateToProps(store){
	return {
		debate: store.debates.getIn(["debates", 0])
	}
}

export default connect(stateToProps)(Debate);
