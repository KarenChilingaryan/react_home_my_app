import React, {Component} from 'react';

class Description extends Component{
    constructor (props){
        super(props)
    }
    render() {
        return (
            <div className="params">{this.props.description}</div>
        )
    }
}
export default Description
