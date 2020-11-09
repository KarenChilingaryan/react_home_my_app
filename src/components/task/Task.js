import React, {Component} from 'react';
import styles from './taskStyle.module.css';
import {Button, Card, Col, FormControl, InputGroup} from "react-bootstrap";
import {faEdit, faPen, faTrash, faWindowClose} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Task extends Component{
    constructor(props){
        super(props)
    }

    handleUpdateKeyDown = (event,_id) => {
        if (event.keyCode ===13){
            this.props.updateTaskText(_id)
        }
    }

render(){
    const task = this.props.data;
    const updateTaskId = this.props.updateTaskId;
    const updateInput = this.props.updateInput;
    return (
        <>
            <Card className={`${styles.task} ${task.checked ? styles.selected: ''}`}>
                <Card.Body>
                    <Card.Title>{task.text.length > 10 ? task.text.slice(0,10) + '...' : task.text}</Card.Title>
                    <Card.Text>
                        {task.text}
                    </Card.Text>
                    {
                        task._id === updateTaskId?
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="update"
                                    aria-label="update"
                                    aria-describedby="basic-addon2"
                                    onChange={this.props.handleUpdateInputChange}
                                    onKeyDown={(event) => {
                                        this.handleUpdateKeyDown(event, task._id)
                                    }}
                                    value={updateInput}
                                />
                                <InputGroup.Append>
                                    <Button variant="warning"
                                            onClick={
                                                () => {
                                                    this.props.updateTaskText(task._id)
                                                }
                                            }
                                    >
                                        <FontAwesomeIcon icon={faPen}/>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup> : ''
                    }

                    <Button variant="warning" className={styles.actionButton}
                            onClick={() => {
                                this.props.updateTask(task._id)
                            }}
                    >
                        {
                            task._id !== updateTaskId ?
                                <FontAwesomeIcon icon={faEdit}/> :
                                <FontAwesomeIcon icon={faWindowClose}/>
                        }
                    </Button>
                    <Button variant="danger" className={styles.actionButton}
                            onClick={() => {
                                this.props.removeTask(task._id)
                            }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                    <InputGroup className={'mb-3 ' + styles.checkbox}>
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="Checkbox"
                                                 checked={task.checked}
                                                 onChange={(event) => {
                                                     this.props.deleteTasks(task._id, event)
                                                 }}/>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Card.Body>
            </Card>
        </>
    );
}
}

export default Task;

