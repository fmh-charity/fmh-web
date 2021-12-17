import React from "react";
import StatementHead from "../statement-head/StatementHead";
import styles from "./styles.module.css";
import arrow from "../assets/Icons/arrow.svg";
import Modal from "../modals/modal/Modal";
import StatementModals from "../modals/statement-modals/StatementModals";

class Statement extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEsc);
  }

  handleEsc = (event) => {
    if (event.key === "Escape") {
      this.handleModal();
    }
  };

  handleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <span className={styles.text}>Тема</span>
          <p className={styles.text}>субботник</p>
        </div>
        <StatementHead />
        <button className={styles.button} onClick={this.handleModal}>
          <img src={arrow} alt="" />
        </button>
        {this.state.isOpen && (
          <Modal onClick={this.handleModal}>
            <StatementModals onClick={this.handleModal} />
          </Modal>
        )}
      </section>
    );
  }
}

export default Statement;
