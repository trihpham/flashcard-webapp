import React, { Component } from 'react';
import { saveAnswer } from '../../../../actions/quiz';
import { connect } from 'react-redux';
import { TRUE_OR_FALSE } from '../../../../constants/question_options';
import { TRUE, FALSE } from '../../../../constants/true_or_false_options';
import { Message } from 'semantic-ui-react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
class TrueOrFalseQuestions extends Component {
    constructor(props) {
        super(props);
        const {questions} = this.props;

        this.renderQuestions = this.renderQuestions.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
    }

    render() {
        return (
            <div className="question-category-container">
				{this.renderHeader()}
				{this.renderQuestions()}
			</div>
        );
    }

    renderHeader() {
        const numOfQuestions = this.props.questions.length;
        return (<div  className="question-category-header">{numOfQuestions + ''} True Or False Questions</div>);
    }

    renderQuestions() {
        const {questions} = this.props;
        const self = this;
        return questions.map((question, questionIndex) => {
            return self.renderQuestion(question, questionIndex);
        });
    }


    renderQuestion(question, questionIndex) {
        const isEvaluated = this.props.isEvaluated;
        const userAnswers = this.props.userAnswers;
        const userAnswer = userAnswers[questionIndex];
        const answerGiven = userAnswer !== null;
        const self = this;

        let evaluationMessage = '';
        if (isEvaluated) {
            if (userAnswer === question.answer) {
                evaluationMessage = <Message success header="Correct!"/>;
            } else {
                const content = userAnswer ? "" : `Correct answer is ${question.answer}`;
                evaluationMessage = <Message negative header="Incorrect!" content={content}/>;
            }
        }

        return (
            <div className="question-container">
		 		<label  className="question-label">{questionIndex + 1}. {question.question}</label>
				<RadioGroup  className="radio-group-question">
		 			<RadioButton value="true"  checked={TRUE === userAnswer} onChange={() => {
                self.setAnswer(questionIndex, TRUE)
            }}>
		 				True
		 			</RadioButton>
		 			<RadioButton value="false"  checked={FALSE === userAnswer} onChange={() => {
                self.setAnswer(questionIndex, FALSE)
            }}>
		 				False
		 			</RadioButton>
  			    </RadioGroup>
		 	    <div>{evaluationMessage}</div>
			</div>
        );
    }


    setAnswer(questionIndex, answer) {
        const isEvaluated = this.props.isEvaluated;
        if (isEvaluated) {
            return;
        }
        this.props.saveAnswer(TRUE_OR_FALSE, questionIndex, answer);
    }
}



function mapStateToProps(state) {
    const questions = state.quiz.quiz[TRUE_OR_FALSE];
    const userAnswers = state.quiz.userAnswers[TRUE_OR_FALSE];
    const {isEvaluated} = state.quiz;

    return {
        questions,
        userAnswers,
        isEvaluated
    };
}

export default connect(mapStateToProps, {
    saveAnswer
})(TrueOrFalseQuestions);