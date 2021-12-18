import React from "react";
import styles from '../statementPage/styles.module.css';

import Statement from '../statement/Statement';

import filter from '../assets/Icons/filter.png';
import infon from '../assets/Icons/infon.png';
import add_comment from '../assets/Icons/add_comment.svg';

const StatementPage = () =>  {

    return (
        <main className={styles.main}>
            <div className={styles.head}>
                <h1 className={styles.header}>Заявки</h1>
                <div className={styles.block}>
                    <img src={infon} alt="" style={{cursor: 'pointer'}}/>
                    <img src={filter} alt="" style={{cursor: 'pointer'}}/>
                    <img src={add_comment} alt="" style={{cursor: 'pointer'}}/>
                </div>
            </div>
            <section className={styles.body}>
                <p className={styles.all_statement}>все заявки</p>
                <div className={styles.wrapper}>
                    <Statement />
                    <Statement />
                    <Statement />
                    <Statement />
                    <Statement />
                    <Statement />

                    <Statement />
                </div>
            </section>
        </main>
    )
}
export default StatementPage;