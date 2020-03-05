import React, {Component} from "react";
import CBlock from "../../components/CBlock";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Input from "reactstrap/es/Input";
import InputGroup from "reactstrap/es/InputGroup";
import InputGroupAddon from "reactstrap/es/InputGroupAddon";
import InputGroupText from "reactstrap/es/InputGroupText";
import TString from "../../../utils/TString";

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
            searchData: [],
            location: {state: "", country: ""},
            searchLocation: "",
            sortedKeys: []
        };
        this.initData = this.initData.bind(this);
        this.openDataInfo = this.openDataInfo.bind(this);
        this.onLocationClick = this.onLocationClick.bind(this);
        this.isLocationActive = this.isLocationActive.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
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
        let sortedKeys = Object.keys(result).sort(function (a, b) {
            return result[b].value - result[a].value
        });
        for (let key in result) {
            if (result[key].states.length > 1) {
                result[key].states.sort((a, b) => {
                    return b.confirmed - a.confirmed
                });
            }
        }
        this.setState({data: result, sortedKeys: sortedKeys});
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

    onSearchClick() {

    }

    //{name: key, value: 0, states: [], open: false}
    onSearchChange(value) {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        this.timeout = window.setTimeout(() => {
            let result = [];
            if (this.state.data != null && !TString.isNull(value)) {
                for (let i in this.state.data) {
                    if (this.state.data[i].states.length > 1 && this.state.data[i].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                        result.push({state: "", country: this.state.data[i].name, confirmed: this.state.data[i].value});
                    }
                    for (let i2 in this.state.data[i].states) {
                        if (this.state.data[i].states[i2].state.toLowerCase().indexOf(value.toLowerCase()) >= 0
                            || this.state.data[i].states[i2].country.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                            result.push(this.state.data[i].states[i2]);
                        }
                    }
                }
            }
            result.sort((i1, i2) => {
                return i2.confirmed - i1.confirmed;
            });
            this.setState({searchData: result});
        }, 500);
        this.setState({searchLocation: value});
    }

    render() {
        let renderData = function () {
            return this.state.sortedKeys.map((key, i) => {
                if (this.state.data[key].states.length === 1) {
                    return (
                        <li key={i} className={this.isLocationActive("", this.state.data[key].name)}
                            onClick={() => this.onLocationClick(this.state.data[key].name, true)}>
                            <span className="red">{this.state.data[key].value}</span> {this.state.data[key].name}
                        </li>
                    )
                } else {
                    return (
                        <li key={i}
                            className={"ul-opt-info " + (this.state.data[key].open ? "open " : "") + this.isLocationActive("", this.state.data[key].name)}
                            onClick={() => this.onLocationClick(this.state.data[key].name, true)}>
                            <p>
                                <span className="red">{this.state.data[key].value}</span> {this.state.data[key].name}
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
        }.bind(this);

        let renderSearchData = function () {
            return this.state.searchData.map((item, i) => {
                return (
                    <li key={i}
                        className={this.isLocationActive(item.state, item.country)}
                        onClick={(event) => this.onLocationClick(item, false, event)}>
                        <span
                            className="red">{item.confirmed}</span> {(item.state ? item.state + ", " : "") + item.country}
                    </li>
                )
            });
        }.bind(this);

        return (
            <CBlock cols="col-12 col-md-3" loading={this.props.loading} id="b-locations">
                <InputGroup>
                    <Input type="text" className="input-location"
                           placeholder="Location to search"
                           value={this.state.searchLocation}
                           onChange={(selected) => this.onSearchChange(selected.target.value)}
                           onClick={this.onSearchClick}/>
                    {this.state.searchLocation &&
                    <InputGroupAddon addonType="append">
                        <InputGroupText className="icon-input-clear" onClick={() => this.onSearchChange("")}>
                            <FontAwesomeIcon icon="times"/>
                        </InputGroupText>
                    </InputGroupAddon>}
                    <InputGroupAddon addonType="append">
                        <InputGroupText className="icon-input-append">
                            <FontAwesomeIcon icon="search-location"/>
                        </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
                {this.state.data ?
                    <ul className="ul-states">
                        {
                            TString.isNull(this.state.searchLocation) ? renderData() : renderSearchData()
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