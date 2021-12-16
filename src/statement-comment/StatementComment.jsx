import React from "react";
import styles from './styles.module.css';
import editing_icon_light from '../assets/Icons/editing_icon_light.svg';
// import edit_icon from '../../../assets/images/edit_icon.svg';

class StatementComment extends React.Component {

    render() {
        return(
            <React.Fragment>
                <div className={styles.block_comment}>
                    <p className={styles.text_comment}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quaerat?</p>
                    <button className={styles.button}><img src={editing_icon_light} alt="" /></button>
                </div>
                <div className={styles.cretor}>
                    <p className={styles.text}>А. И. Серова</p>
                    <p className={styles.text}>07.12.2021 <span className={styles.time}>19:30</span></p>
                </div>
            </React.Fragment>
        )
    }
}
export default StatementComment;