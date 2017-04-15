import React, { Component } from 'react';
import { saveAnswer } from '../../../../actions/quiz';
import { Message, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FILL_IN_BLANK } from '../../../../constants/question_options';
import classNames from 'classnames';

class FillInBlankQuestions extends Component {
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
				<div>{this.renderHeader()}</div>
				<div>{this.renderQuestions()}</div>
			</div>
    );
  }

  renderHeader() {
    const numOfQuestions = this.props.questions.length;
    return (<div  className="question-category-header">{numOfQuestions + ''} Written Questions</div>)
  }

  renderQuestions() {
    const {questions} = this.props;
    return questions.map((question, questionIndex) => {
      return this.renderQuestion(question, questionIndex);
    });
  }



  renderQuestion(question, questionIndex) {
    const userAnswer = this.props.userAnswers[questionIndex];
    const isEvaluated = this.props.isEvaluated;
    let message = null;
    if (isEvaluated) {
      const isCorrectAnswer = (userAnswer && userAnswer.toUpperCase() === question.answer.toUpperCase());
      const contentMessage = `Correct answer is ${question.answer}`;
      message = isCorrectAnswer ?
        <Message
        success
        header='Correct!'
        /> :
        <Message
        error
        header='Incorrect!'
        content={contentMessage}
        />;

    }

    return (
      <div className="question-container"> 
				<label className="question-label">{questionIndex + 1}. {question.display}</label>
      			<Input fluid placeholder='Enter your answer'  onChange={(event) => {
        this.setAnswer(questionIndex, event.target.value)
      }} readOnly={isEvaluated}/>
      			{message}
			</div>);
  }

  setAnswer(questionIndex, answerValue) {
    this.props.saveAnswer(FILL_IN_BLANK, questionIndex, answerValue);
  }
}


function mapStateToProps(state) {
  const questions = state.quiz.quiz[FILL_IN_BLANK];
  const userAnswers = state.quiz.userAnswers[FILL_IN_BLANK];
  const {isEvaluated} = state.quiz;

  return {
    questions,
    userAnswers,
    isEvaluated
  };
}

export default connect(mapStateToProps, {
  saveAnswer
})(FillInBlankQuestions);