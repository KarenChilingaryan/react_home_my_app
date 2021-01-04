import React, {Component} from "react";
import B from "./B"
import C from "./C"
import D from "./D"
import E from "./E"

class A extends React.Component{
    state = {
        count: 0,
        inputValue: "",
        value: ""
    }
    handleClick = () => {
        this.setState({
            count: this.state.count +  1
        })
    }
    changeInput = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    getValue = (value) => {
        this.setState({
            value: value
        })
    }
    render() {
        return(
            <div>
                {/*<p>{this.state.count}</p>*/}
                {/*<button*/}
                {/*onClick={this.handleClick}*/}
                {/*>Click me</button>*/}
                {/*<div>*/}
                {/*    <input type="text" onChange={this.changeInput}/>*/}
                {/*    <p>{this.state.inputValue}</p>*/}
                {/*</div>*/}

                {/*----------------------------*/}
                {/*<B*/}
                {/*    onSendValue = {this.getValue}*/}
                {/*/>*/}

                {/*<C />*/}

                {/*---------------------------*/}

                {/*<D />*/}
                <E />
            </div>
        );
    }
}

export default A;
