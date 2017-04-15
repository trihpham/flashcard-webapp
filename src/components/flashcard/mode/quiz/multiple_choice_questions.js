import React, { Component } from 'react';
import { saveAnswer } from '../../../../actions/quiz';
import { connect } from 'react-redux';
import { MULTIPLE_CHOICE } from '../../../../constants/question_options';
import { CHOICES } from '../../../../constants/multiple_choice_options';
import { Message } from 'semantic-ui-react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
class MultipleChoiceQuestions extends Component {
    constructor(props) {
        super(props);
        const {questions} = this.props;

        this.renderEvaluation = this.renderEvaluation.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
    }

    render() {
        return (
            <div className="question-category-container">
				<div>{this.renderHeader()}</div>
				<div>{this.renderQuestions()}</div>
			</div>
        );
    }

    renderHeader() {
        const numOfQuestions = this.props.questions.length;
        return (<div className="question-category-header">{numOfQuestions + ''} Multiple Choice Questions</div>)
    }

    renderQuestions() {
        const {questions} = this.props;
        const self = this;
        return (
            <div>
				{questions.map((question, questionIndex) => {
                return self.renderQuestion(question, questionIndex);
            })}
			</div>
        );
    }

    renderQuestion(question, questionIndex) {
        const userAnswer = this.props.userAnswers[questionIndex];
        const isEvaluated = this.props.isEvaluated;

        return (
            <div className="question-container">
				{this.renderQuestionLabel(questionIndex, question)}
				<RadioGroup className="questions">
					{this.renderChoices(questionIndex, question)}
				</RadioGroup>
				{this.renderEvaluation(questionIndex, question)}
			</div>
        );
    }

    setAnswer(questionIndex, answerChoice) {
        const isEvaluated = this.props.isEvaluated;
        if (isEvaluated) {
            return;
        }
        this.props.saveAnswer(MULTIPLE_CHOICE, questionIndex, answerChoice);
    }

    renderQuestionLabel(questionIndex, question) {
        return (<label className="question-label">{questionIndex + 1}. {question.question}</label>);
    }

    renderEvaluation(questionIndex, question) {
        const isEvaluated = this.props.isEvaluated;
        if (isEvaluated) {
            const userAnswer = this.props.userAnswers[questionIndex];
            const correctAnswer = question.answers.find((answer) => {
                return answer.isRight
            });
            if (userAnswer && userAnswer === correctAnswer.choice) {
                return <Message success header="Correct!"/>
            } else {
                return <Message negative header="Incorrect!" content={`Correct answer is ${correctAnswer.value}`} />
            }

        } else {
            return null;
        }
    }

    renderChoices(questionIndex, question) {
        const userAnswer = this.props.userAnswers[questionIndex];
        const isEvaluated = this.props.isEvaluated;
        return question.answers.map((answer, choiceIndex) => {
            let incorrect = '';
            let correct = '';
            let answerGiven = userAnswer !== null;
            if (isEvaluated) {
                if( (answer.isRight) ) {
                    correct = 'correct'
                }
                if( (!answer.isRight && userAnswer === answer.choice) ) {
                    incorrect = 'incorrect'
                }
            }
            return (
                <div className="radio-group-question">
				  	<RadioButton value={CHOICES[choiceIndex]}  checked={CHOICES[choiceIndex] === userAnswer} onChange={() => {
                    this.setAnswer(questionIndex, CHOICES[choiceIndex])
                }}>
    					{answer.value}
  					</RadioButton>
 				</div>
            );
        });
    }


}

function mapStateToProps(state) {
    const questions = state.quiz.quiz[MULTIPLE_CHOICE];
    const userAnswers = state.quiz.userAnswers[MULTIPLE_CHOICE];
    const {isEvaluated} = state.quiz;

    return {
        questions,
        userAnswers,
        isEvaluated
    };
}

export default connect(mapStateToProps, {
    saveAnswer
})(MultipleChoiceQuestions);