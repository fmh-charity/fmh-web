import React from "react";
import styles from "./styles.module.css";

class ModalOverlay extends React.Component {
    render() {
    
        return (
            <section className={styles.body} onClick={this.props.onClick}>

            </section>
        )
    }
}
 export default ModalOverlay;