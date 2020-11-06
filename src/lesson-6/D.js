import React, {Component} from "react";

class D extends React.Component{
    state = {
        name: "John Doe",
        showName: true
    }

    toggleName = () => {
        this.setState({
            showName: !this.state.showName
        })
    }
    render() {
        const {name,showName} = this.state;
        console.log(this.props)
        return(
            <>
            <div>
                {showName? <p>{name}</p> : "there's nothing to show"}
            </div>
                <button
                onClick={this.toggleName}
                >Click</button>
            </>
        );
    }
}

export default D;
