import React, {Component} from "react";
import styles from "./addTaskStyle.module.css";
import {Button, FormControl, InputGroup} from "react-bootstrap";

class AddTask extends Component{
    state = {
        inputValue: ''
    };

    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    addTask = () => {
        const { inputValue } = this.state;
        if (!inputValue.trim()) {
            return;
        }
        const task = {
            title: inputValue
        }
        this.props.onAdd(task)

        this.setState({
            inputValue: ''
        });
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.addTask();
        }
    };



    render() {
        const disabled = this.props.disabled;
        const {inputValue} = this.state;
        return(
            <InputGroup className={styles.input}>
                <FormControl
                    placeholder="Input new task"
                    aria-label="Input new task"
                    aria-describedby="basic-addon2"
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleKeyDown}
                    value={inputValue}
                    disabled = {disabled}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={this.addTask}
                        disabled={!inputValue}
                    >
                        Add
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

}

export default AddTask;
