import React, {PureComponent} from "react";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import styles from "../AddTask/addTaskStyle.module.css";
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

class EditTaskModal extends PureComponent{
    constructor(props){
        super(props)

        this.state = {...props.data}
        console.log(this.state)
    }

    handleChange = (event) => {
        console.log(event)
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleChangeDate = (event) => {
        this.setState({
            date: event
        });
    }
    handleKeyUp = (event)=>{
        if (event.keyCode === 13){
            this.editSave()
        }
    };

    editSave = () => {
        const task = this.state;
        if (!task.title.trim()){
            return
        }
        task.date = (new Date(task.date)).toISOString().slice(0, 10);
        console.log(task)
        this.props.onSubmit(task)
    };


    render() {

        const disabled = this.props.disabled;
        const {props} = this;
        const {title, date, description} = this.state;
        return(
            <Modal
                show={true}
                onHide={props.onClose}
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
                            onKeyUp={this.handleKeyUp}
                            value={title}
                            // disabled = {disabled}
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
                            selected={date ? new Date(date): new Date()}
                            onChange={this.handleChangeDate}
                            selectsStart
                            minDate={new Date()}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.editSave}>
                        Add
                    </Button>
                    <Button variant="secondary" onClick={props.onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

{/*<Modal show={true} onHide={props.onClose} centered*/}
{/*       onKeyUp={this.handleKeyUp}>*/}
{/*    <Modal.Header closeButton>*/}
{/*        <Modal.Title>Edit task</Modal.Title>*/}
{/*    </Modal.Header>*/}

{/*    <Modal.Body className={styles.body}>*/}
{/*        <input*/}
{/*            type="text"*/}
{/*            className={styles.input}*/}
{/*            onChange={this.handleChange}*/}
{/*            value={title}*/}
{/*        />*/}
{/*    </Modal.Body>*/}
{/*    <Modal.Footer>*/}
{/*        <Button variant="primary" onClick={this.editSave}>*/}
{/*            Submit*/}
{/*        </Button>*/}
{/*        <Button variant="warning" onClick={props.onClose}>*/}
{/*            Close*/}
{/*        </Button>*/}

{/*    </Modal.Footer>*/}
{/*</Modal>*/}

EditTaskModal.propTypes = {
    data: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};
export default EditTaskModal;
