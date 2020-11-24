import React, {Component} from "react";
import styles from "./addTaskStyle.module.css";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import moment from "moment";

class AddTask extends Component{
    state = {
        title: '',
        description: '',
        date: new Date()
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    addTask = () => {
        const { title, description, date } = this.state;
        const newDate = moment(date.toLocaleDateString()).format('YYYY-MM-DD');
        if (!title.trim() || !description.trim()) {
            return;
        }
        const task = {
            title: title,
            description: description,
            date: newDate
        };
        console.log(task.date)
        this.props.onAdd(task)
    }

    handleKeyDown = (event) => {
        // if (event.keyCode === 13) {
        //     this.addTask();
        // }
    };
    handleChangeDate = (event) => {
        this.setState({
            date: event
        });
    }


    render() {
        const disabled = this.props.disabled;
        const {title, date, description} = this.state;
        const onClose = this.props.onClose;
        return(

            <Modal
                show={true}
                onHide={onClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className={styles.input}>
                        <FormControl
                            placeholder="Title"
                            name = "title"
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            value={title}
                            disabled = {disabled}
                        />
                        <textarea
                            rows="4"
                            className={styles.description}
                            name = "description"
                            placeholder = "Description"
                            value={description}
                            onChange={this.handleChange}
                        >
                        </textarea>

                        <DatePicker
                            className={styles.description}
                            selected={date}
                            onChange={this.handleChangeDate} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.addTask}>
                        Add
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        )
    }

}

AddTask.propTypes = {
    disabled: PropTypes.bool,
    onAdd: PropTypes.func.isRequired
};

export default AddTask;
