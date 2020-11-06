import React, {Component} from 'react';
import classes from './taskStyle.module.css';
import styles from './taskStyle.module.css';
import idGenerator from "../../helpers/idGenerator";


/* function Task(props)
{
const classes = [styles.task];
if(props.selected){
    classes.push(styles.selected);
}
    return (
        <>
       <li className={styles.task + ' selected'}>{props.data}</li>
        <li className={`${styles.task} selected`}>{props.data}</li>
        <li className={[styles.task, 'selected'].join(' ')}>{props.data}</li>

        <li className={classes.join(' ')}>{props.data}</li>
        </>
    );
}
*/
function targetElement(props){
    console.log(props)
}

function Task(props){
    return (
        <>
            <li onClick ={ () =>{
                targetElement(props)
            } } className={'col list-group-item list-group-item-info ' + `${classes.task} ${props.selected  ? 'active' : ''}`} color='primary'><span>{props.index + 1}</span><span>{props.data}</span></li>
        </>
    );
}

export default Task;
