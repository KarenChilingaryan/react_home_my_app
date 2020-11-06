import React, { Component } from 'react';
import Task from './task/Task';
import picture from '../assets/images/pic.png';
import idGenerator from '../helpers/idGenerator';

const inputStyle = {
    border: "1px solid red",
    backgroundColor: '#f60'
};

class ToDo extends Component {
    state = {
        tasks: [],
        inputValue: ''
    };

    handleChange = (event)=>{
        this.setState({
            inputValue: event.target.value
        });
    };

    addTask = ()=>{
        const {inputValue} = this.state;
        if (inputValue.trim() !== ''){
            const tasks = [...this.state.tasks];

            tasks.push(inputValue);

            this.setState({
                tasks: tasks,
                inputValue: ''
            });
        }
    };

    render() {
        const {inputValue, tasks} = this.state;

        return (
            <div>
                <div className="md-form">
                    <input type="text" id="form1" className="form-control"
                           value = {inputValue} onChange={this.handleChange}
                           />
                    <label htmlFor="form1"
                           > </label>

                    <button
                        type="button" className="btn btn-primary"
                        onClick={this.addTask}
                    >Add</button>
                </div>
                {/*<img src={picture} alt="somepic"/>*/}
                {/*<img src={require('../assets/images/pic.png')} alt="somepic"/>*/}

                <div className='container'>
                    <div className='row list-group'>
                            {tasks.map((task, index) => {
                                return <Task key={idGenerator()} data={task} selected={index === 2} index={index}/>
                            })}
                    </div>
                </div>
            </div>
        );
    };

}

export default ToDo;
