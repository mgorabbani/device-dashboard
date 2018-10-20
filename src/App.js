import React from 'react';
import DevicesPage from './DevicesPage'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Device from './Device'
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            readings: [],
            loading: false,
            filtered: null
        }
        this.loadData = this.loadData.bind(this)
        this.toggleDeviceState = this.toggleDeviceState.bind(this)
    }
    toggleDeviceState(reading) {
        return axios.patch(`http://localhost:8888//device/${reading.name}?active=${!reading.active}`).then(response => {
            console.log(response.status)
            toast.success("Great job, you did it!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true
            });
            this.loadData()

        }).catch(error => {
            toast.error("Damn it!, Coudn't do anything, Please try again!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
            });
        });

    }
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        axios.get('http://localhost:8888/device').then(response => {
            this.setState({ readings: response.data.data, loading: true })
        }).catch(e => {
            console.log(e, 'err loading data')
        })
    }
    filterList(e) {
        let filtered = this.state.readings.filter(data => data.name.includes(e.target.value))
        this.setState({ filtered })
    }
    render() {
        const active_device = this.state.readings.filter(e => e.active).length;
        const inactive_device = this.state.readings.length - active_device
        return (
            <div className="container">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    newestOnTop={false}

                />
                <section className="header row justify-content-around align-items-center">
                    <div className="col-4">
                        <h4> Active -> {active_device}</h4>
                    </div>
                    <div className="col-4">
                        <h4>Deactivate -> {inactive_device}</h4>
                    </div>
                    <div className="form-group col-md-4">
                        <input
                            className="form-control"
                            type="text"
                            id="search"
                            placeholder="Type Device Name"
                            onChange={(e) => this.filterList(e)} />

                    </div>

                </section>
                {this.state.loading && <DevicesPage devices={this.state.filtered || this.state.readings} toggle={this.toggleDeviceState} />}
            </div>
        );
    }
}



export default App;
