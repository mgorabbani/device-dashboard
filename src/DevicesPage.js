import React from 'react';
import PropTypes from 'prop-types';

import Device from './Device'

const DevicesPage = ({ devices, toggle }) => {
    return (
        <section className="row">
            {devices.map((device, k) => {
                return <Device key={k} device={device} toggle={toggle} />
            })}
        </section>
    );
}

DevicesPage.propTypes = {
    devices: PropTypes.array.isRequired,
    toggle: PropTypes.func.isRequired
}

export default DevicesPage;
