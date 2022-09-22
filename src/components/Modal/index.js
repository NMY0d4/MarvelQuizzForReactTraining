import React from "react";
import { Children } from "react";

const Modal = ({ showModal, children }) => {
    return (
        showModal && (
            <div className="modalBackground">
                <div className="modalContainer">{children}</div>
            </div>
        )
    );
};

export default Modal;
