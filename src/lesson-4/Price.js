import React, {Component} from 'react';

class Price extends Component{
    constructor (props){
        super(props)
        this.state = {
            price: props.price,
            rate: 487
        }
    }

    changePrice = () => {
        let count = this.state.price;
        const rate = this.state.rate;
        if (this.state.price.search("֏") <= 0){
            count = count.slice(0, count.length-1) * rate + "֏"
            this.setState({
                price: count
            })
        }else {
            count = count.slice(0, count.length-1)/rate + "$"
            this.setState({
                price: count
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
