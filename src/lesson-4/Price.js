import React, {Component} from 'react';

class Price extends Component{
    constructor (props){
        super(props)
        this.state = {
            price: props.price
        }
    }

    changePrice = () => {
        let count = this.state.price;
        if (this.state.price.search("֏") <= 0){
            this.setState({
                price: count.slice(0, count.length-1) * 487 + "֏"
            })
        }else {
            this.setState({
                price: count.slice(0, count.length-1)/487 + "$"
            })
        }

    }
    render() {
        return (
            <div className="params">
                {this.state.price}
                <button
                    className="changePrice"
                    onClick={this.changePrice}
                >Change the currency
                </button>
            </div>
        )
    }
}
export default Price
