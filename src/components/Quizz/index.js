import React, { Component } from "react";
import { QuizMarvel } from "../quizMarvel";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";

class Quiz extends Component {
    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
    };

    storedDataRef = React.createRef();

    loadQuestions = (quizz) => {
        const fetchedArrayQuizz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuizz.length >= this.state.maxQuestions) {
            this.storedDataRef.current = fetchedArrayQuizz;

            const newArray = fetchedArrayQuizz.map(
                ({ answer, ...keepRest }) => keepRest
            );

            this.setState({ storedQuestions: newArray });
        } else {
            console.log("Pas assez de questions");
        }
    };

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            // End
        } else {
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1,
            }));
        }

        const goodAnswer =
            this.storedDataRef.current[this.state.idQuestion].answer;
        if (this.state.userAnswer === goodAnswer) {
            this.setState((prevState) => ({
                score: prevState.score + 1,
            }));
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question:
                    this.state.storedQuestions[this.state.idQuestion].question,
                options:
                    this.state.storedQuestions[this.state.idQuestion].options,
            });
        }

        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question:
                    this.state.storedQuestions[this.state.idQuestion].question,
                options:
                    this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            });
        }
    }

    submitAnswer = (selectedAnswer) => {
        this.setState({ userAnswer: selectedAnswer, btnDisabled: false });
    };

    render() {
        const { pseudo } = this.props.userData;
        const { btnDisabled, options, question, userAnswer } = this.state;

        return (
            <div>
                <Levels />
                <ProgressBar />
                <h2>
                    {question} {pseudo} répondez svp
                </h2>

                {/* Afficher les options */}
                {options.map((option, index) => (
                    <p
                        key={index}
                        onClick={() => this.submitAnswer(option)}
                        className={`answerOptions ${
                            userAnswer === option ? "selected" : ""
                        }`}
                    >
                        {option}
                    </p>
                ))}

                <button
                    disabled={btnDisabled}
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                >
                    Suivant
                </button>
            </div>
        );
    }
}

export default Quiz;
