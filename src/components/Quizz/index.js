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
    };

    loadQuestions = (quizz) => {
        const fetchedArrayQuizz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuizz.length >= this.state.maxQuestions) {
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

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question:
                    this.state.storedQuestions[this.state.idQuestion].question,
                options:
                    this.state.storedQuestions[this.state.idQuestion].options,
            });
        }
    }

    render() {
        const { pseudo } = this.props.userData;

        return (
            <div>
                <Levels />
                <ProgressBar />
                <h2>{this.state.question}</h2>

                {/* Afficher les options */}
                {this.state.options.map((option, index) => (
                    <p key={index} className="answerOptions">
                        {option}
                    </p>
                ))}

                <button className="btnSubmit">Suivant</button>
            </div>
        );
    }
}

export default Quiz;
