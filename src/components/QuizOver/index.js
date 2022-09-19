import React, { Fragment, useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
    const { levelNames, score, maxQuestions, quizLevel, percent } = props;
    const [asked, setAsked] = useState([]);
    // console.log(asked);

    useEffect(() => {
        setAsked(ref.current);
    }, [ref]);

    const okGrade = (maxQuestions / 10) * 8;
    console.log(okGrade);

    const decision =
        score >= okGrade ? (
            <Fragment>
                <div className="stepsBtnContainer">
                    {quizLevel < levelNames.length ? (
                        <Fragment>
                            <p className="successMsg">
                                Bravo, passez au niveau suivant!
                            </p>
                            <button className="btnResult success">
                                Niveau suivant
                            </button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p className="successMsg">
                                Bravo, vous êtes un expert
                            </p>
                            <button className="btnREsult gameOver">
                                Jeu terminé
                            </button>
                        </Fragment>
                    )}
                </div>
                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}%</div>
                    <div className="progressPercent">Note: {score}/10</div>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className="stepsBtnContainer">
                    <p className="failureMsg">Vous avez échoué</p>
                </div>
                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}%</div>
                    <div className="progressPercent">Note: {score}/10</div>
                </div>
            </Fragment>
        );

    const questionAnswer =
        score >= okGrade ? (
            asked.map((question) => {
                return (
                    <tr key={question.id}>
                        <td>{question.question}</td>
                        <td>{question.answer}</td>
                        <td>
                            <button className="btnInfo">Infos</button>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr coldSpan="3">
                <td style={{ textAlign: "center", color: "red" }}>
                    Pas de réponses!
                </td>
            </tr>
        );

    return (
        <Fragment>
            {decision}
            <hr />
            <p>Les réponses aux questions posées:</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>{questionAnswer}</tbody>
                </table>
            </div>
        </Fragment>
    );
});

export default React.memo(QuizOver);
