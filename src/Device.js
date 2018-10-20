import React from 'react'
import m from 'moment';

class Device extends React.Component {
    constructor(props) {
        super(props)
        this.toggleState = this.toggleState.bind(this)
        this.state = { loading: false }
    }
    toggleState() {
        this.setState({ loading: true })
        this.props.toggle(this.props.device).then(() => {
            this.setState({ loading: false })
        })
    }
    render() {
        const { device } = this.props;
        return (<div className="col-md-4 mb-4">
            <div className="device">

                <h4>{device.name}
                    {device.active ? <span>{activeIcon} Active</span> :
                        <span>{deactiveIcon} Deactivate</span>}
                </h4>
                <li>Unit: {device.unit}</li>
                <li>Value: {device.value.toFixed(2)}</li>
                <li>Time: {m(device.timestamp).fromNow()}</li>
                <button
                    onClick={this.toggleState}
                    className="btn btn-primary"
                    disabled={this.state.loading}>
                    Toggle Status
                </button>
            </div>
        </div>)
    }
}


const deactiveIcon = <img style={{ height: 15 }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEHSURBVDhPvZRJDsIwDEUDJ4BrAEdgWIK4VJfAigVpWVaiceBiDBUnYFXsxAgoBlIxfOlvGvspyY+r/qooiurJatPRAGNna9v0jZfDlQA0ETCLDexjsMWtNdgdrc3TtMHlr6WN6Wtjj2VQ2QjOk2zd4zZZMcBAGzhJAMlU+xTqj2lzqfGV3U6xlzFXuTsTGkKM0CljvCg5KYBgG9jepU9PQyysYGIwTqkFwFAqqmJiMO4HwG8cmaaIcT4UmgCpMMgYSlEUNcZ5UfRicYiNnTDmqk8e9tO5pjGqOno4EF1ul+WgITs1cHgLu4iOQKMoBoUB0J0F/75u5dLH54AekZdZ1npI87dS6gwM3LdoKc4mmAAAAABJRU5ErkJggg==" />

const activeIcon = <img style={{ height: 15 }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEMSURBVDhPvZTJDcIwEEUNFUAbQAksR7IcuBIbiVJyBIoBB4mW2EQFnGC+MigED+CI5UtfSPHMk+3vQf1VaZrW4+WkE9gkgofrcRvfeNlf8UY3o8wsQqv39HspW++wNrLTBpe/FjX0Q2tOLujR+hhb0+M2WcEqGYSZOcsA16h9Cs2PqY9S42vTTqmXMYVoceEW+5l2OmdMLiQnB+BnuvNtKX08DamwisFgHAFtMpSKqhgMxv0C+IUjY4oYl4fCEyAWvzNCURdVY1wuRC8V+5heyIwxhT552E/nGmNUdfRoXLvcLgtQn53SvR3ewm7CEaiJRtENCgHgzrz/vu6F9PEcovUkgIPMtJw0fyulrj8CLTBGFp7YAAAAAElFTkSuQmCC" />

export default Device;