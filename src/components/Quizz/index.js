import React, { Component, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuizMarvel } from "../quizMarvel";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizOver from "../QuizOver";
import { FaChevronRight } from "react-icons/fa";

const initialState = {
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: true,
    quizEnd: false,
};

const levelNames = ["debutant", "confirme", "expert"];

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.storedDataRef = React.createRef();
    }

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

    showToastMsg = (pseudo) => {
        if (this.state.showWelcomeMsg) {
            this.setState({ showWelcomeMsg: false });

            toast(`Bienvenue ${pseudo}, et bonne chance 🍀`, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                bodyClassName: "toastify-color-welcome",
            });
        }
    };

    componentDidMount() {
        this.loadQuestions(levelNames[this.state.quizLevel]);
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            this.setState({ quizEnd: true });
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

            toast.success("Bravo +1 point 👏", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error("Raté 0... 😭", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const { storedQuestions, quizEnd, idQuestion, maxQuestions, score } =
            this.state;
        if (
            storedQuestions !== prevState.storedQuestions &&
            storedQuestions.length
        ) {
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
            });
        }

        if (quizEnd !== prevState.quizEnd) {
            const gradepercent = this.getPercentage(maxQuestions, score);
            this.gameOver(gradepercent);
        }

        if (idQuestion !== prevState.idQuestion && storedQuestions.length) {
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            });
        }

        this.props.userData.pseudo !== prevProps.userData.pseudo &&
            this.showToastMsg(this.props.userData.pseudo);
    }

    submitAnswer = (selectedAnswer) => {
        this.setState({ userAnswer: selectedAnswer, btnDisabled: false });
    };

    getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    gameOver = (percent) => {
        if (percent >= 80) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent,
            });
        } else {
            this.setState({
                percent,
            });
        }
    };

    loadLevelQuestions = (param) => {
        this.setState({ ...initialState, quizLevel: param });
        this.loadQuestions(levelNames[param]);
    };

    //////////////////////////////////////////////////////////////////////
    render() {
        // const { pseudo } = this.props.userData;
        const {
            btnDisabled,
            options,
            question,
            userAnswer,
            quizEnd,
            idQuestion,
            maxQuestions,
            score,
            percent,
            quizLevel,
        } = this.state;

        const displayOptions = options.map((option, index) => (
            <p
                key={index}
                onClick={() => this.submitAnswer(option)}
                className={`answerOptions ${
                    userAnswer === option ? "selected" : ""
                }`}
            >
                <FaChevronRight /> {option}
            </p>
        ));

        return quizEnd ? (
            <Fragment>
                <ToastContainer />
                <QuizOver
                    ref={this.storedDataRef}
                    levelNames={levelNames}
                    score={score}
                    percent={percent}
                    maxQuestions={maxQuestions}
                    quizLevel={quizLevel}
                    loadLevelQuestions={this.loadLevelQuestions}
                />
            </Fragment>
        ) : (
            <Fragment>
                <ToastContainer />
                <Levels levelNames={levelNames} quizLevel={quizLevel} />
                <ProgressBar
                    idQuestion={idQuestion}
                    maxQuestions={maxQuestions}
                />
                <h2>{question}</h2>

                {/* Afficher les options */}
                {displayOptions}

                <button
                    disabled={btnDisabled}
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                >
                    {idQuestion < maxQuestions - 1 ? "suivant" : "terminer"}
                </button>
            </Fragment>
        );
    }
}

export default Quiz;
