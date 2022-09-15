import React, { useState, Fragment, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, user } from "../Firebase/firebaseConfig";
import Logout from "../Logout";
import Quiz from "../Quizz";
import { getDoc } from "firebase/firestore";

const Welcome = () => {
    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        let listener = onAuthStateChanged(auth, (user) => {
            user
                ? setUserSession(user)
                : setTimeout(() => {
                      navigate("/");
                  }, 1000);
        });

        userSession &&
            getDoc(user(userSession.uid))
                .then((snapshot) => {
                    snapshot.exists && setUserData(snapshot.data());
                })
                .catch((err) => {
                    console.error(err);
                });

        return () => {
            listener();
        };
    }, [userSession]);

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p className="loaderText">Loading...</p>
        </Fragment>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz userData={userData} />
            </div>
        </div>
    );
};

export default Welcome;
