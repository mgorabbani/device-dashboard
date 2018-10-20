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
            search: ''
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
                hideProgressBar: false
            });
            this.loadData()

        }).catch(error => {
            toast.error("Damn it!, Coudn't do anything, pls try again!", {
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
            console.log(e, 'loading data')
        })
    }
    filterList(e) {

        let original = this.state.readings;
        let filtered = this.state.readings.filter(data => {
            return data.name.includes(e.target.value)
        })
        if (e.target.value.length == 2) {
            this.setState({ readings: original })
        } else {
            this.setState({ readings: filtered })
        }
    }
    render() {
        const active_device = this.state.readings.filter(e => e.active).length;
        const inactive_device = this.state.readings.length - active_device
        return (
            <div className="container">
                <section className="row">
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    />
                    <div className="col-md-6 text-center">
                        <h2> Active Devices</h2> <h1>{active_device}</h1>
                    </div>
                    <div className="col-md-6  text-center">
                        <h2>Inactive Devices</h2><h1>{inactive_device}</h1>
                    </div>
                </section>
                <section class="form-group col-md-4">
                    <label for="search">Search: </label>
                    <input className="form-control" type="text" onChange={(e) => this.filterList(e)} />

                </section>
                {this.state.loading && <DevicesPage data={this.state.readings} toggle={this.toggleDeviceState} />}
            </div>
        );
    }
}



export default App;
