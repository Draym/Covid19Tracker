import React, {Component} from "react";
import CBlock from "../../components/CBlock";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onLocationFocus: PropTypes.func
};

const defaultProps = {};

class BlocLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            location: {state: "", country: ""}
        };
        this.initData = this.initData.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.data || this.props.date !== prevProps.date) {
            this.initData(this.props.data);
        }
    }

    initData(data) {
        let result = {};
        for (let i in data) {
            let key = data[i].country;
            if (!result[key]) {
                result[key] = {name: key, value: 0, states: [], open: false};
            }
            result[key].value += data[i].confirmed;
            result[key].states.push(data[i]);
        }
        this.setState({data: result});
    }

    openDataInfo(key, event) {
        if (event) {
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
        }
        let data = {...this.state.data};
        let item = data[key];
        item.open = !item.open;
        data[key] = item;
        this.setState({data});
    }

    onLocationClick(location, isCountry, event) {
        console.log(event);
        if (event) {
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
        }
        if (this.props.onLocationFocus) {
            let finalLocation = isCountry ?
                {state: "", country: location}
                : {state: location.state, country: location.country};

            if (this.state.location.state === finalLocation.state && this.state.location.country === finalLocation.country) {
                finalLocation = {state: "", country: ""};
            }
            this.props.onLocationFocus(finalLocation);
            this.setState({location: finalLocation})
        }
    }

    isLocationActive(state, country) {
        if (this.state.location.state === state && this.state.location.country === country) {
            return "active"
        }
    }

    render() {
        return (
            <CBlock cols="col-12 col-md-3" loading={this.props.loading} id="b-states">
                {this.state.data ?
                    <ul className="ul-states">
                        {
                            Object.keys(this.state.data).map((key, i) => {
                                if (this.state.data[key].states.length === 1) {
                                    return (
                                        <li key={i} className={this.isLocationActive("", this.state.data[key].name)}
                                            onClick={() => this.onLocationClick(this.state.data[key].name, true)}>
                                            <span
                                                className="red">{this.state.data[key].value}</span> {this.state.data[key].name}
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={i}
                                            className={"ul-opt-info " + (this.state.data[key].open ? "open " : "") + this.isLocationActive("", this.state.data[key].name)}
                                            onClick={() => this.onLocationClick(this.state.data[key].name, true)}>
                                            <p>
                                                <span
                                                    className="red">{this.state.data[key].value}</span> {this.state.data[key].name}
                                                <FontAwesomeIcon
                                                    icon={this.state.data[key].open ? "chevron-up" : "chevron-down"}
                                                    onClick={(event) => this.openDataInfo(key, event)}
                                                    className="tl-item-hover"/>
                                            </p>
                                            <ul>
                                                {this.state.data[key].states.map((item, i) => {
                                                    return (
                                                        <li key={i}
                                                            className={this.isLocationActive(item.state, item.country)}
                                                            onClick={(event) => this.onLocationClick(item, false, event)}>
                                                            <span className="red">{item.confirmed}</span> {item.state}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                    : null}
            </CBlock>
        )
    }
}

BlocLocations.defaultProps = defaultProps;
BlocLocations.propTypes = propTypes;

export default BlocLocations;