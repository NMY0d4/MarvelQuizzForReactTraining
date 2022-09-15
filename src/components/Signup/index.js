import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { setDoc } from "firebase/firestore";

const Signup = () => {
    const data = {
        pseudo: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
    };

    const { pseudo, email, password, confirmPassword } = loginData;

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                return setDoc(user(authUser.user.uid), {
                    pseudo,
                    email,
                });
            })
            .then(() => {
                setLoginData({ ...data });
                navigate("/Welcome");
            })
            .catch((error) => {
                setError(error);
                setLoginData(...data);
            });
    };

    const btn =
        pseudo === "" ||
        email === "" ||
        password === "" ||
        password !== confirmPassword ? (
            <button disabled>Inscription</button>
        ) : (
            <button>Inscription</button>
        );

    // gestion erreurs
    const errorMsg = error !== "" && <span>{error.message}</span>;

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            {/* pseudo */}
                            <div className="inputBox">
                                <input
                                    onChange={handleChange}
                                    value={pseudo}
                                    type="text"
                                    id="pseudo"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            {/* email */}
                            <div className="inputBox">
                                <input
                                    onChange={handleChange}
                                    value={email}
                                    type="email"
                                    id="email"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            {/* mot de passe */}
                            <div className="inputBox">
                                <input
                                    onChange={handleChange}
                                    value={password}
                                    type="password"
                                    id="password"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            {/* confirmer le mot de passe */}
                            <div className="inputBox">
                                <input
                                    onChange={handleChange}
                                    value={confirmPassword}
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="confirmPassword">
                                    Confirmer le mot de passe
                                </label>
                            </div>
                            {btn}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">
                                Déjà inscrit? Connectez-vous.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
