import React, { PureComponent } from 'react';
import Task from '../task/Task';
import idGenerator from '../../helpers/idGenerator';
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
        editTask: null
    };

    addTask = (inputValue) => {
        const newTask = {
            text: inputValue,
            _id: idGenerator()
        };

        const tasks = [newTask, ...this.state.tasks];
        this.setState({
            tasks: tasks,
            inputValue: ''
        });
    };

    removeTask = (taskId) => {
        const newTasks = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({
            tasks: newTasks
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
        let tasks = [...this.state.tasks];
        
        this.state.selectedTasks.forEach((id)=>{
            tasks = tasks.filter((task)=> task._id !== id);
        });

        this.setState({
            tasks,
            selectedTasks: new Set(),
        });
        this.toggleConfirm()
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
        const newTasks = this.state.tasks;
        for (let i=0; i<newTasks.length; i++){
            if (newTasks[i]._id === saveTask._id){
                newTasks[i] = saveTask
            }
        }

        this.setState({
            tasks: newTasks,
            editTask: null
        })
    };
    render() {
        const { tasks, selectedTasks, editTask, showConfirm} = this.state;
        console.log(editTask);
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
                        <Col sm={10} xs={12} md={8} lg={6}>
                            <AddTask
                                onAdd={this.addTask}
                                disabled={!!selectedTasks.size}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {tasksArray}
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs={4} className={styles.buttonBlock}>
                        <Button
                            variant="outline-danger"
                            onClick={this.toggleConfirm}
                            disabled = {!selectedTasks.size}
                        >
                            Remove selected
                        </Button>
                        </Col>
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
                        onSubmit={(saveTask) => this.editTask(saveTask)}
                        data={editTask}
                    />
                }
            </div>
        );
    };

}

export default ToDo;
