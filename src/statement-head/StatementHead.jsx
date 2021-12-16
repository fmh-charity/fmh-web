import React from "react";
import styles from '../statement-head/styles.module.css';

class StatementHead extends React.Component {


    render() {
        return(
            <div className={styles.wrap}>
                    <div className={styles.inner}>
                        <span className={styles.theme}>Исполнитель</span>
                        <p className={styles.text}>Б. Н. Карев</p>
                    </div>
                    <div className={styles.inner}>
                        <span className={styles.theme}>Плановая дата</span>
                        <p className={styles.text}>10.12.2021 10:00</p>
                    </div>
                </div>
        )
    }
}

export default StatementHead;