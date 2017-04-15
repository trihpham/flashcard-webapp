import React, { Component } from 'react';
import { generateQuiz, evaluateAnswer } from '../../../../tools/quiz_generator';
import { initializeTest, evaluateTest, resetTest } from '../../../../actions/quiz';
import { setUpQuizMode } from '../../../../actions/index';
import MultipleChoiceQuestions from './multiple_choice_questions';
import FillInBlankQuestions from './fill_in_blank_questions';
import TrueOrFalseQuestions from './true_or_false_questions';
import { Container } from 'semantic-ui-react';
import QuizResults from './quiz_results';

import { MULTIPLE_CHOICE, FILL_IN_BLANK, TRUE_OR_FALSE } from '../../../../constants/question_options';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
class Quiz extends Component {


    componentWillMount() {
        const flashcardSetId = this.props.params.flashcardsetId;
        this.props.setUpQuizMode(flashcardSetId);
    }

    render() {
        if (!this.props.quiz) {
            return <div>Wait</div>;
        }
        const score = this.props.score;
        const isEvaluated = this.props.isEvaluated;
        const quizResults = isEvaluated ? <QuizResults score={score}/> : null;
        const display = isEvaluated !== true ?
            <Button onClick={this.props.evaluateTest} primary>Submit Answers</Button> :
            <Button onClick={this.props.resetTest} primary>Retry Test</Button>;
        const displayMultipleChoiceQuestions = this.props.quiz[MULTIPLE_CHOICE] ? <MultipleChoiceQuestions /> : '';
        const displayFillInBlankQuestions = this.props.quiz[FILL_IN_BLANK] ? <FillInBlankQuestions /> : '';
        const displayTrueOrFalseQuestions = this.props.quiz[TRUE_OR_FALSE] ? <TrueOrFalseQuestions /> : '';
        return (
            <div className="quizContainer">
        {quizResults}
        {displayMultipleChoiceQuestions}
        {displayFillInBlankQuestions}
        {displayTrueOrFalseQuestions}
        {display}
      </div>
        );
    }

}



function mapStateToProps(state) {
    const quiz = state.quiz.quiz;
    const isEvaluated = state.quiz.isEvaluated;
    const score = state.quiz.score;
    return {
        score,
        quiz,
        isEvaluated
    };
}

export default connect(mapStateToProps, {
    initializeTest,
    evaluateTest,
    setUpQuizMode,
    resetTest
})(Quiz);