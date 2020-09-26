import React, {Component} from 'react';
import Price from './Price'
import Name from './Name'
import Description from './Description'

class Product extends Component{
    constructor (props){
        super(props)
    }
    render() {
        const params = this.props
        return (
            <div className="product">
                <img src="https://tse4.mm.bing.net/th?id=OIP.qZq2k0oGGdXu1Uha5flMcwHaEG&pid=Api&P=0&w=319&h=177" alt=""/>
                <Price price={params.price}/>
                <Name  name={params.name}/>
                <Description description={params.description} /></div>
        )
    }
}

export default Product
