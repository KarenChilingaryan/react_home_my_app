import React, {PureComponent} from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './taskStyle.module.css';


class Task extends PureComponent{
state = {
    checked: false
};

handleCheck = ()=>{
    this.setState({
        checked: !this.state.checked
    });

    const {onCheck, data} = this.props;
    onCheck(data._id);
};
onEdit = (task)=>{
    this.props.onEdit(task);
};

componentWillUnmount(){
}

    render() {
        const task = this.props.data;
        const {checked} = this.state;
        const {disabled} = this.props;
        const {editChecked} = this.props;
        let editTaskId;
        if (!!editChecked){
            editTaskId = editChecked._id;
        }else {
            editTaskId = false;
        }
        return (
            <Card className={`${styles.task} ${checked || editTaskId === task._id ? styles.selected: ''}`}>
                        <Card.Body>
                            <input 
                            type='checkbox' 
                            onClick = {this.handleCheck}
                            />
                            <Card.Title>{task.title.length >10 ? task.title.slice(0, 10) + '...': task.title}</Card.Title>
                            <Card.Text>
                                {task.title}
                            </Card.Text>
                            <Button 
                            variant="warning" 
                            className={styles.actionButton}
                            disabled = {disabled}
                            onClick={() => this.onEdit(task)}
                            >
                            <FontAwesomeIcon icon={faEdit} />
                            </Button>

                            <Button 
                            variant="danger"  
                            className={styles.actionButton}
                            onClick = {()=>this.props.onRemove(task._id)}
                            disabled = {disabled}
                            >
                            <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Card.Body>
                    </Card>
        );
    }

}

export default Task;
