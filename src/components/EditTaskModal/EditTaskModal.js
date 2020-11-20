import React, {PureComponent} from "react";
import {Button, Modal} from "react-bootstrap";
import styles from './EditTaskModalStyle.module.css'

class EditTaskModal extends PureComponent{
    constructor(props){
        super(props)

        this.state = {...props.data}
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    };

    handleKeyUp = (event)=>{
        if (event.keyCode === 13){
            this.editSave()
        }
    };

    editSave = () => {
        const task = this.state;
        if (!task.text.trim()){
            return
        }
        this.props.onSubmit(task)
    };


    render() {

        const {props} = this;
        const {text} = this.state;
        return(
            <Modal show={true} onHide={props.onClose} centered
                   onKeyUp={this.handleKeyUp}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit task</Modal.Title>
                </Modal.Header>

                <Modal.Body className={styles.body}>
                    <input
                        type="text"
                        className={styles.input}
                        onChange={this.handleChange}
                        value={text}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.editSave}>
                        Submit
                    </Button>
                    <Button variant="warning" onClick={props.onClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        )

    }
}

export default EditTaskModal;
