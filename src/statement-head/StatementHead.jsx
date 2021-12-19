import React from "react";
import styles from '../statement-head/styles.module.css';
import cn from 'classnames';

class StatementHead extends React.Component {


    render() {
        return(
            <div className={styles.body}>
                <div className={styles.inner}>
                    <span className={cn(styles.theme, styles.border)}>Исполнитель</span>
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