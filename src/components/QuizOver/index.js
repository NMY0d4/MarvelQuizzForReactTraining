import React, { Fragment, useEffect, useState } from "react";
import { GiSlicedBread, GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";
import Modal from "../Modal";
import axios from "axios";

const QuizOver = React.forwardRef((props, ref) => {
    const {
        levelNames,
        score,
        maxQuestions,
        quizLevel,
        loadLevelQuestions,
        percent,
    } = props;

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
    const hash = "2259fc576950b4f246e38d0a741eb566";

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [characterInfos, setCharacterInfos] = useState([]);
    const [loading, setLoading] = useState(true);

    const checkDataAge = (date) => {
        const today = Date.now();
        const timeDiff = today - date;
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        if (dayDiff >= 15) {
            localStorage.clear();
            localStorage.setItem("marvelStorageDate", Date.now());
        }
    };

    useEffect(() => {
        setAsked(ref.current);

        if (localStorage.getItem("marvelStorageDate")) {
            const date = localStorage.getItem("marvelStorageDate");
            checkDataAge(date);
        }
    }, [ref]);

    const showModal = (id) => {
        setOpenModal(true);

        if (localStorage.getItem(id)) {
            setCharacterInfos(JSON.parse(localStorage.getItem(id)));
            setLoading(false);
        } else {
            axios
                .get(
                    `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
                )
                .then((res) => {
                    setCharacterInfos(res.data);
                    setLoading(false);

                    localStorage.setItem(id, JSON.stringify(res.data));
                    !localStorage.getItem("marvelStorageDate") &&
                        localStorage.setItem("marvelStorageDate", Date.now());
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setLoading(true);
    };

    const capitalizeFL = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const okGrade = (maxQuestions / 10) * 8;

    if (score < okGrade) {
        setTimeout(() => {
            loadLevelQuestions(quizLevel);
        }, 3000);
    }

    const decision =
        score >= okGrade ? (
            <Fragment>
                <div className="stepsBtnContainer">
                    {quizLevel < levelNames.length ? (
                        <Fragment>
                            <p className="successMsg">
                                Bravo, passez au niveau suivant!
                            </p>
                            <button
                                className="btnResult success"
                                onClick={() => {
                                    loadLevelQuestions(quizLevel);
                                }}
                            >
                                Niveau suivant
                            </button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p
                                className="successMsg"
                                onClick={() => {
                                    loadLevelQuestions(0);
                                }}
                            >
                                <GiTrophyCup size="50px" /> Bravo, vous ??tes un
                                expert
                            </p>
                            <button className="btnResult gameOver">
                                Accueil
                            </button>
                        </Fragment>
                    )}
                </div>
                <div className="percentage">
                    <div className="progressPercent">R??ussite: {percent}%</div>
                    <div className="progressPercent">Note: {score}/10</div>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className="stepsBtnContainer">
                    <p className="failureMsg">Vous avez ??chou??</p>
                </div>
                <div className="percentage">
                    <div className="progressPercent">R??ussite: {percent}%</div>
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
                            <button
                                className="btnInfo"
                                onClick={() => showModal(question.heroId)}
                            >
                                Infos
                            </button>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan="3">
                    <Loader
                        loadingMsg={"pas de r??ponses!"}
                        styling={{ textAlign: "center", color: "red" }}
                    />
                </td>
            </tr>
        );

    const { name, thumbnail, description, urls, id } =
        !loading && characterInfos.data.results[0];

    const resultInModal = !loading ? (
        <Fragment>
            <div className="modalHeader">
                <h2>{name}</h2>
            </div>
            <div className="modalBody">
                <div className="comicImage">
                    <img
                        src={`${thumbnail.path}.${thumbnail.extension}`}
                        alt={name}
                    />
                    <p>{characterInfos.attributionText}</p>
                </div>
                <div className="comicDetails">
                    <h3>Description</h3>
                    {description ? (
                        <p>{description}</p>
                    ) : (
                        <p>Pas de description disponible...</p>
                    )}
                    <h3>Plus d'infos</h3>
                    {urls.map((url, index) => (
                        <a
                            href={url.url}
                            key={index}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {capitalizeFL(url.type)}
                        </a>
                    ))}
                </div>
            </div>
            <div className="modalFooter">
                <button className="modalBtn" onClick={closeModal}>
                    Fermer
                </button>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="modalHeader">
                <h2>Patientez, Marvel r??pond...</h2>
            </div>
            <div className="modalBody">
                <Loader />
            </div>
        </Fragment>
    );
    return (
        <Fragment>
            {decision}
            <hr />
            <p>Les r??ponses aux questions pos??es:</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>r??ponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>{questionAnswer}</tbody>
                </table>
            </div>
            <Modal showModal={openModal}>{resultInModal}</Modal>
        </Fragment>
    );
});

export default React.memo(QuizOver);
