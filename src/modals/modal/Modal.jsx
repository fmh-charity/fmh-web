import React from "react";
import ReactDOM from "react-dom";
import styles from './styles.module.css';

import ModalOverlay from "../modalOverlay/ModalOverlay";

const modalRoot = document.getElementById("modals");

class Modal extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {children, onClick} = this.props;
        return ReactDOM.createPortal (
            <section className={styles.modal}>
                <ModalOverlay onClick={onClick}/>
                <section className={styles.body}>
                    {children}
                </section>
            </section>,
            modalRoot
        )
    }
}

export default Modal;