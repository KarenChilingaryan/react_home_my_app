import React, {Component} from "react";

class E extends React.Component{
    state = {
        fruites: [
            {
                name: 'banana',
                price: '1$',
                logo: '🙌'
            },
            {
                name: 'apple',
                price: '2$',
                logo: '👏'
            },
            {
                name: 'orange',
                price: '1.5$',
                logo: '👍'
            },
            {
                name: 'avocado',
                price: '2.5$',
                logo: '😂'
            }
        ]
    }

    render() {
        // const fruitArr = [
        //     <p key="1">banana</p>,
        //     <p key="2">apple</p>,
        //     <p key="3">orange</p>,
        //     <p key="4">avocado</p>
        // ]
        const fruitArr = this.state.fruites.map((el, i) => {
            return <div key={i}>
                <p>{el.logo}</p>
                <p>{el.name}</p>
                <p>{el.price}</p>
            </div>
        })
        return(
            <>
            <div>
                {fruitArr}
            </div>
            </>
        );
    }
}

export default E;
