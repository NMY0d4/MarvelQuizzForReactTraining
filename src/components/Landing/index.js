import React, { useRef, useEffect, useState, Fragment } from "react";

const Landing = () => {
    const [btn, setBtn] = useState(false);
    const refWolverine = useRef(null);

    useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 1500);
    }, []);

    // Fonctions pour l'affichage des griffes
    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg");
    };
    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg");
    };
    const clearImg = () => {
        refWolverine.current.classList.contains("leftImg") &&
            refWolverine.current.classList.remove("leftImg");
        refWolverine.current.classList.contains("rightImg") &&
            refWolverine.current.classList.remove("rightImg");
    };

    // Affiche les griffes selon l'état du boutton
    const displayBtn = btn && (
        <Fragment>
            <div
                onMouseOver={setLeftImg}
                onMouseOut={clearImg}
                className="leftBox"
            >
                <button className="btn-welcome">Inscription</button>
            </div>
            <div
                onMouseOver={setRightImg}
                onMouseOut={clearImg}
                className="rightBox"
            >
                <button className="btn-welcome">Connexion</button>
            </div>
        </Fragment>
    );

    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    );
};

export default Landing;
