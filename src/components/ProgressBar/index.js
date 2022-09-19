import React, { Fragment } from "react";

function ProgressBar({ idQuestion, maxQuestions }) {
    const pourcentage = idQuestion * (100 / maxQuestions);
    return (
        <Fragment>
            <div className="percentage">
                <div className="progressPercent">
                    Question: {idQuestion + 1}/{maxQuestions}
                </div>
                <div className="progressPercent">
                    Progression: {pourcentage}%
                </div>
            </div>
            <div className="progressBar">
                <div
                    className="progressBarChange"
                    style={{ width: `${pourcentage}%` }}
                ></div>
            </div>
        </Fragment>
    );
}

export default React.memo(ProgressBar);
