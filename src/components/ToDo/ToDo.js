import React, { PureComponent } from 'react';
import Task from '../task/Task';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todoStyle.module.css';
import Confirm from "../Confirm";
import AddTask from "../AddTask/AddTask";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

class ToDo extends PureComponent {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        newTaskModal: false
    };

    componentDidMount() {
        fetch("http://localhost:3001/task", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res)=> res.json())
            .then(response => {
                if (response.error){
                    throw response.error;
                }
                this.setState({
                    tasks: response,
                });
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    addTask = (task) => {
        const body = JSON.stringify(task);
        fetch("http://localhost:3001/task", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: body,
        })
            .then((res)=> res.json())
            .then(response => {
                if (response.error){
                    throw response.error;
                }
                const tasks = [response, ...this.state.tasks];
                this.setState({
                    tasks: tasks,
                });
                this.toggleNewTask()
            })
            .catch((error)=>{
                console.log(error)
            })
    };

    removeTask = (taskId) => {
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res)=> res.json())
            .then(response => {
                if (response.error){
                    throw response.error;
                }
                const newTasks = this.state.tasks.filter(task => task._id !== taskId);
                this.setState({
                    tasks: newTasks
                });
            })
            .catch((error)=>{
                console.log(error)
            });
    };

    handleCheck = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        }
        else {
            selectedTasks.add(taskId);
        }

        this.setState({
            selectedTasks
        });

    };

    removeSelected = ()=>{
        const body = {
            tasks: [...this.state.selectedTasks]
        }
        fetch("http://localhost:3001/task", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then((res)=> res.json())
            .then(response => {
                if (response.error){
                    throw response.error;
                }
                let tasks = [...this.state.tasks];

                this.state.selectedTasks.forEach((id)=>{
                    tasks = tasks.filter((task)=> task._id !== id);
                });

                this.setState({
                    tasks,
                    selectedTasks: new Set(),
                });
                this.toggleConfirm()
            })
            .catch((error)=>{
                console.log(error)
            })
    };

    toggleConfirm = () => {
        const showConfirm = !this.state.showConfirm;
        this.setState({
            showConfirm: showConfirm
        });
    };

    toggleEdit(task) {
        this.setState({
            editTask: task
        })
    }

    editTask = (saveTask) => {
        fetch(`http://localhost:3001/task/${saveTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saveTask)
        })
            .then((res)=> res.json())
            .then(response => {
                if (response.error){
                    throw response.error;
                }
                const newTasks = [...this.state.tasks];
                const foundTaskIndex = newTasks.findIndex((task)=>task._id === saveTask._id);
                newTasks[foundTaskIndex] = saveTask;
                this.setState({
                    tasks: newTasks,
                    editTask: null
                })
            })
            .catch((error)=>{
                console.log(error)
            });
    };

    toggleNewTask = () => {
        this.setState({
            newTaskModal: !this.state.newTaskModal
        })
    };
    render() {
        const { tasks, selectedTasks, editTask, showConfirm, newTaskModal} = this.state;
        const tasksArray = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Task
                        data={task}
                        onRemove={this.removeTask}
                        onCheck={this.handleCheck}
                        disabled = {!!selectedTasks.size}
                        onEdit={(task) => this.toggleEdit(task)}
                        editChecked={editTask}
                    />
                </Col>
            )
        });

        return (
            <div className={styles.toDo}>
                <Container>
                    <Row className='justify-content-center'>
                        <Col sm={6} xs={6} md={4} lg={3}>
                            <Button
                                variant="outline-primary"
                                onClick={this.toggleNewTask}
                                disabled={!!selectedTasks.size}
                            >
                                Add
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={this.toggleConfirm}
                                disabled = {!selectedTasks.size}
                            >
                                Remove selected
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {tasksArray}
                    </Row>
                </Container>
                {
                    showConfirm &&
                    <Confirm
                        onClose={this.toggleConfirm}
                        onSubmit={this.removeSelected}
                        count={selectedTasks.size}
                    />
                }
                {
                    !!editTask &&
                    <EditTaskModal
                        onClose={() => this.toggleEdit(null)}
                        onSubmit={this.editTask}
                        data={editTask}
                        disabled = {!!selectedTasks.size}
                    />
                }

                {
                    newTaskModal &&
                    <AddTask
                        onAdd={this.addTask}
                        onClose = {this.toggleNewTask}
                    />
                }
            </div>
        );
    };

}

export default ToDo;
