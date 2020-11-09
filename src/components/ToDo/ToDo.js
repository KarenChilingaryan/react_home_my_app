import React, { Component } from 'react';
import Task from '../task/Task';
import idGenerator from '../../helpers/idGenerator';
import styles from './todoStyle.module.css'
import {Container, Row, Col, InputGroup, FormControl, Button, Dropdown, SplitButton,DropdownButton} from "react-bootstrap";
class ToDo extends Component {
    state = {
        tasks: [],
        inputValue: '',
        updateTaskId: '',
        updateInput: '',
        checkboxFlag: false,
        firstDrop: 0,
        lastDrop: 0,
    };


    handleInputChange = (event) => {
        this.setState(
            {
                inputValue: event.target.value
            }
        )
    };
    handleKeyDown = (event) => {
        if (event.keyCode ===13){
            this.addTask()
        }
    };
    addTask = () => {
        const {inputValue} = this.state;
        if (!inputValue.trim()){
            return
        }
        const newTask = {
            text: inputValue,
            checked: false,
            _id: idGenerator()
        };
        const tasks = [newTask, ...this.state.tasks];
        this.setState(
            {
                tasks: tasks,
                inputValue: ''
            }
        )
    };

    removeTask = (_id) => {
        const newTasks = this.state.tasks.filter((m)=> m._id !== _id);
        this.setState(
            {
                tasks: newTasks,
            }
        )
    };


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
    };
    updateTaskText = (_id) => {
        const {updateInput} = this.state;
        if (!updateInput.trim()){
            return
        }
        const newTasks = this.state.tasks;
        for(let i = 0; i<newTasks.length; i++) {
            if (_id === newTasks[i]._id){
                console.log(newTasks[i].text);
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
    };
    handleUpdateInputChange = (event) => {
        this.setState(
            {
                updateInput: event.target.value
            }
        )
    };



    deleteTasks = (_id, event) => {
        const newTasks = [...this.state.tasks];
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
        });
    };
    deleteAll = () => {
        let newTasks = [...this.state.tasks];
        newTasks = newTasks.filter((m) => m.checked === false);
        this.setState({
            tasks: newTasks,
            checkboxFlag: false,
            firstDrop: 0,
            lastDrop: 0
        })
    };

    firstDropdown = (key) => {
        this.dropChecked(key,'first')
        this.setState({
            firstDrop: key
        })
    }
    lastDropdown = (key) => {
        this.foo(key,'last')
        this.setState({
            lastDrop: key
        })
    }

    dropChecked = (key, sort) => {
        const newTasks = [...this.state.tasks];
        let param;
        if (sort === 'first'){
            param = this.state.lastDrop
        } else {
            param = this.state.firstDrop
        }
        const array = [param-1,key-1].sort();
        if (param>0 && key>0){
            for (let i=0; i<newTasks.length; i++){
                for (let j = array[0]; j<=array[1]; j++){
                    if (i === j){
                        newTasks[i].checked = true;
                        break;
                    }else {
                        newTasks[i].checked = false;
                    }
                }
            }
        }
    }

    render() {
        const inputValue = this.state.inputValue;
        const updateInput = this.state.updateInput;
        const checkboxFlag = this.state.checkboxFlag;
        const firstDrop = this.state.firstDrop;
        const lastDrop = this.state.lastDrop;
        const tasks = this.state.tasks.map((task, i)=>{
            return (
                <Col key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                   <Task
                       data={task}
                       removeTask = {this.removeTask}
                       deleteTasks = {this.deleteTasks}
                       updateTask = {this.updateTask}
                       updateTaskText = {this.updateTaskText}
                       handleUpdateInputChange = {this.handleUpdateInputChange}
                       updateInput = {updateInput}
                       updateTaskId = {this.state.updateTaskId}
                   />
                </Col>
            )
        });

        return (
            <div className={styles.todo}>
                <Container>
                    <Row className='justify-content-center'>
                        <Col sm={8} xs={8} md={8} lg={6}>
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
                                </InputGroup.Append>
                            </InputGroup>
                            <InputGroup.Append>
                                 <Button className={styles.deleteAll}
                                         variant="outline-danger"
                                         onClick={this.deleteAll}
                                         disabled={(!lastDrop || !firstDrop) && !checkboxFlag}
                                 >DELETE ALL</Button>
                            </InputGroup.Append>
                        </Col>
                        <Col sm={1} xs={1}>
                            <DropdownButton
                                key="first"
                                id={`dropdown-variants-danger`}
                                variant="danger"
                                title={firstDrop}
                            >
                                <div className={styles.dropdown}>
                                    <Dropdown.Item key={0}
                                                   className={`${firstDrop === 0 ? styles.selectedDrop: ''}`}
                                                   onClick={()=>{
                                                       this.firstDropdown(0)
                                                   }}>0</Dropdown.Item>
                                    {
                                        tasks.map((task, index) => {
                                            return (
                                                <Dropdown.Item key={index + 1}
                                                               className={`${firstDrop === index+1 ? styles.selectedDrop: ''}`}
                                                               onClick={()=>{
                                                    this.firstDropdown(index + 1)
                                                }}>{index + 1}</Dropdown.Item>
                                            )
                                        })
                                    }
                                </div>
                            </DropdownButton>
                        </Col>
                        <Col sm={1} xs={1}>
                            <DropdownButton
                                key="second"
                                id={`dropdown-variants-danger`}
                                variant="danger"
                                title={lastDrop}
                            >
                                <div className={styles.dropdown}>
                                    <Dropdown.Item key={0}
                                                   className={`${firstDrop === 0 ? styles.selectedDrop: ''}`}
                                                   onClick={()=>{
                                                       this.lastDropdown(0)
                                                   }}>0</Dropdown.Item>
                                    {
                                        tasks.map((task, index) => {
                                            return (
                                                <Dropdown.Item key={index + 1}
                                                               className={`${lastDrop === index+1 ? styles.selectedDrop: ''}`}
                                                               onClick={()=>{
                                                    this.lastDropdown(index + 1)
                                                }}>{index + 1}</Dropdown.Item>
                                            )
                                        })
                                    }
                                </div>
                            </DropdownButton>
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
