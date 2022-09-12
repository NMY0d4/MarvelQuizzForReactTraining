import React, { useState, Fragment, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebaseConfig";
import Logout from "../Logout";
import Quiz from "../Quizz";

const Welcome = () => {
    const [userSession, setUserSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let listener = onAuthStateChanged(auth, (user) => {
            user
                ? setUserSession(user)
                : setTimeout(() => {
                      navigate("/");
                  }, 1000);
        });

        return () => {
            listener();
        };
    }, []);

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p className="loaderText">Loading...</p>
        </Fragment>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz />
            </div>
        </div>
    );
};

export default Welcome;
