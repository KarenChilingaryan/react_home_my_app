import React, { Component } from 'react';
import Task from '../task/Task';
import idGenerator from '../../helpers/idGenerator';
import styles from './todoStyle.module.css'
import {Container, Row, Col, InputGroup, FormControl, Button, Card} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPen, faTrash, faWindowClose} from "@fortawesome/free-solid-svg-icons";

class ToDo extends Component {
    state = {
        tasks: [],
        inputValue: '',
        updateTaskId: '',
        updateInput: '',
        checkboxFlag: false
    };
    handleInputChange = (event) => {
        this.setState(
            {
                inputValue: event.target.value
            }
        )
    }

    handleKeyDown = (event) => {
        if (event.keyCode ===13){
            this.addTask()
        }
    }
    addTask = () => {
        const {inputValue} = this.state
        if (!inputValue.trim()){
            return
        }
        const newTask = {
            text: inputValue,
            checked: false,
            _id: idGenerator()
        };
        const tasks = [newTask, ...this.state.tasks]
        this.setState(
            {
                tasks: tasks,
                inputValue: ''
            }
        )
    }

    removeTask = (_id) => {
        const newTasks = this.state.tasks.filter((m)=> m._id !== _id)
        this.setState(
            {
                tasks: newTasks,
            }
        )
    }

    updateTask = (_id) => {
        if (_id === this.state.updateTaskId){
            this.setState(
                {
                    updateTaskId: '',
                    updateInput: ''
                }
            )
        }else {
            this.setState(
                {
                    updateTaskId: _id,
                    updateInput: ''
                }
            )
        }
    }

    updateTaskText = (_id) => {
        const {updateInput} = this.state;
        if (!updateInput.trim()){
            return
        }
        const newTasks = this.state.tasks;
        for(let i = 0; i<newTasks.length; i++) {
            if (_id === newTasks[i]._id){
                console.log(newTasks[i].text)
                newTasks[i].text =  updateInput;
            }
        }

        this.setState(
            {
                tasks: newTasks,
                updateTaskId: '',
                updateInput: ''
            }
        )
    }
    handleUpdateInputChange = (event) => {
        this.setState(
            {
                updateInput: event.target.value
            }
        )
    }
    handleUpdateKeyDown = (event,_id) => {
        if (event.keyCode ===13){
            this.updateTaskText(_id)
        }
    }

    deleteTasks = (_id, event) => {
        const newTasks = this.state.tasks;
        let newCheckboxFlag = false;
        for (let i = 0; i < newTasks.length;i++){
            if (newTasks[i]._id === _id){
                newTasks[i].checked = event.target.checked
            }
            if (newTasks[i].checked === true){
                newCheckboxFlag = true;
            }
        }
        this.setState({
            tasks: newTasks,
            checkboxFlag: newCheckboxFlag
        })
    }
    deleteAll = () => {
        let newTasks = this.state.tasks;
        newTasks = newTasks.filter((m) => m.checked === false);
        this.setState({
            tasks: newTasks,
            checkboxFlag: false
        })
    }
    render() {
        const inputValue = this.state.inputValue;
        const updateInput = this.state.updateInput;
        const checkboxFlag = this.state.checkboxFlag;
        const tasks = this.state.tasks.map((task, i)=>{
            return (
                <Col key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card className={styles.task}>
                        <Card.Body>
                            <Card.Title>{task.text.length >10 ? task.text.slice(0,10)+'...': task.text}</Card.Title>
                            <Card.Text>
                                {task.text}
                            </Card.Text>
                            {
                                task._id === this.state.updateTaskId?
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="update"
                                        aria-label="update"
                                        aria-describedby="basic-addon2"
                                        onChange={this.handleUpdateInputChange}
                                        onKeyDown={(event) => {
                                            this.handleUpdateKeyDown(event, task._id)
                                        }}
                                        value={updateInput}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="warning"
                                                onClick={
                                                    () => {
                                                        this.updateTaskText(task._id)
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
                                        this.updateTask(task._id)
                                    }}
                            >
                                {
                                    task._id !== this.state.updateTaskId ?
                                        <FontAwesomeIcon icon={faEdit}/> :
                                        <FontAwesomeIcon icon={faWindowClose}/>
                                }
                            </Button>
                            <Button variant="danger" className={styles.actionButton}
                                    onClick={() => {
                                        this.removeTask(task._id)
                                    }}
                            >
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                            <InputGroup className={'mb-3 ' + styles.checkbox}>
                                <InputGroup.Prepend>
                                    <InputGroup.Checkbox aria-label="Checkbox"
                                                         checked={task.checked}
                                    onChange={(event) => {
                                        this.deleteTasks(task._id, event)
                                    }}/>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Card.Body>
                    </Card>

                </Col>
            )
        });
        return (
            <div className={styles.todo}>
                <Container>
                    <Row className='justify-content-center'>
                        <Col sm={10} xs={12} md={8} lg={6}>
                            <InputGroup className={styles.input}>
                                <FormControl
                                    placeholder="Input new task"
                                    aria-label="Input new task"
                                    aria-describedby="basic-addon2"
                                    onChange={this.handleInputChange}
                                    onKeyDown={this.handleKeyDown}
                                    value={inputValue}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary"
                                            onClick={this.addTask}
                                            disabled={!inputValue.trim()}
                                    >Add</Button>
                                    {
                                        checkboxFlag ?
                                        <Button variant="outline-danger"
                                                onClick={this.deleteAll}
                                        >DELETE ALL</Button> : ''
                                    }
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        {tasks}
                    </Row>
                </Container>
            </div>
        );
    };

}

export default ToDo;
