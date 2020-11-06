import React, {Component} from "react";

class C extends React.Component{

    render() {
        console.log(this.props)
        return(
            <div>
                <div>
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default C;
