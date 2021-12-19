import React, {useEffect} from "react";
import styles from '../statementPage/styles.module.css';
import cn from 'classnames';

// import useRepository from '../repository';

import Statement from '../statement/Statement';
import Modal from '../modals/modal/Modal';
import EditStatement from "../modals/edit-statement-modals/EditStatement";

import filter from '../assets/Icons/filter.png';
import infon from '../assets/Icons/infon.png';
import add_comment from '../assets/Icons/add_comment.svg';
import roll_up from '../assets/Icons/roll_up.svg';



const StatementPage = (props) =>  {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState();

    const handleModal = () => {
        setOpen(!open);
    }

    // const [repo, methods] = useRepository();

    // useEffect(() => { methods.getNews(); }, []);

    // React.useEffect(() => {
    //     try{
    //         const data = async() => {
    //             const res = await fetch('http://130.193.44.96:8080/fmh/claims');
    //             const result = await res.json();
    //             console.log(result)
    //             // setState(result)
    //         }
    //         data()
    //     }
    //     catch(err) {
    //         console.log(err)
    //     }

        
    // }, [])

    return (
        <main className={styles.main}>
            <div className={styles.head}>
                <h1 className={styles.header}>Заявки</h1>
                <div className={styles.block}>
                    <img src={infon} alt="" className={styles.icon}/>
                    <img src={filter} alt="" className={cn(styles.icon, props.filter)}/>
                    <img src={add_comment} alt="" className={styles.icon} onClick={handleModal}/>
                    <img src={roll_up} alt="" className={cn(styles.icon_rollUp, props.rollup)}/>
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
                    <Statement />
                    <Statement />
                    <Statement />
                    <Statement />
                    <Statement />
                    <Statement />
                    <Statement />
                </div>
            </section>
            {
                open && 
                <Modal onClick={handleModal}>
                    <EditStatement isOpen={open}/>
                </Modal>
            }
        </main>
    )
}
export default StatementPage;