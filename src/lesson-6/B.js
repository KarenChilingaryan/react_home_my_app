import React, {Component} from "react";
import C from  "./C"
class B extends React.Component{
    state = {
        count: 0,
        inputValue: ""
    }
    handleClick = () => {
        const value = this.state.inputValue;
        this.props.onSendValue(value)

    }
    changeInput = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    render() {
        return(
            <div>
                <div>
                    <input type="text" onChange={this.changeInput}/>
                    <button
                        onClick={this.handleClick}
                    >send</button>
                    <C text="Dvdsgsb"/>
                </div>
            </div>
        );
    }
}

export default B;
