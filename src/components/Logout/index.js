import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (checked) {
            signOut(auth)
                .then(() => {
                    console.log("Déconnexion");
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [checked]);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <div>
            <div className="logoutContainer">
                <label className="switch">
                    <input
                        onChange={handleChange}
                        type="checkbox"
                        checked={checked}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
};

export default Logout;
