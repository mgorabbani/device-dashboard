import React from 'react';
/*
"name": "acceleration_x",
"unit": "m/s2",
"value": 25.993848858558,
"timestamp": 1539951451534,
"active": true
*/
import Device from './Device'
class DevicesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    render() {
        const { data, toggle } = this.props
        return (
            <section className="row">
                {data.map((each, k) => {
                    return <Device key={k} device={each} toggle={toggle} />
                })}
            </section>
        );
    }
}


export default DevicesPage;
