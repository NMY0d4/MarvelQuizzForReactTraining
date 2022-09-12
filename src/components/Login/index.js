import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import React, { useState, useEffect } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (password.length > 5 && email !== "") setBtn(true);
        else if (btn) setBtn(false);
    }, [password, email, btn]);

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setEmail("");
                setPassword("");
                navigate("/Welcome", { replace: true });
            })
            .catch((error) => {
                setEmail("");
                setPassword("");
                setError(error.message);
            });
    };

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {error !== "" && <span>{error}</span>}
                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            {/* email */}
                            <div className="inputBox">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            {/* mot de passe */}
                            <div className="inputBox">
                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    type="password"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            {
                                <button disabled={btn ? false : true}>
                                    Connexion
                                </button>
                            }
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">
                                Nouveau sur marvel Quizz? Inscrivez-vous
                                maintenant.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
