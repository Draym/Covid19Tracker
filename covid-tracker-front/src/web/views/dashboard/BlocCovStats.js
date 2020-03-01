import React from "react";
import CBlock from "../../components/CBlock";
import {ApiEndpoint} from "../../../utils/api/ApiEndpoint";
import CDataLoader from "../../components/CDataLoader";
import TPrettyNbr from "../../../utils/TPrettyNbr";
import TMath from "../../../utils/TMath";
import PropTypes from 'prop-types';

const propTypes = {
    parameters: PropTypes.object.isRequired
};

const defaultProps = {};

class BlocCovStats extends CDataLoader {
    constructor(props) {
        super(props);
        this.initState({
            data: {}
        });
        this.getEndpoint = this.getEndpoint.bind(this);
        this.getParameters = this.getParameters.bind(this);
    }

    getEndpoint() {
        return ApiEndpoint.DATA_GET_Total;
    }

    getParameters() {
        return this.props.parameters;
    }

    formatData(flatData) {
        return flatData;
    }

    render() {
        console.log("this.state: ", this.state);
        return [
            <CBlock key={0} cols="col-12 col-md-4" id="b-confirmed" loading={this.state.loading}>
                <p className="b-title">Total Confirmed</p>
                <p className="b-cov-nb red">{TPrettyNbr.pretify(this.state.data.totalConfirmed)}</p>
                <p className="b-cov-inc"><span
                    className="red-light">+ {TPrettyNbr.pretify(this.state.data.addConfirmed)}</span> since
                    24h ({TPrettyNbr.pretifyFloat(this.state.data.incConfirmed, 1, true)}%)</p>
            </CBlock>,
            <CBlock key={1} cols="col-6 col-md-4" id="b-recovered" loading={this.state.loading}>
                <p className="b-title">Total Recovered</p>
                <p className="b-cov-nb green">{TPrettyNbr.pretify(this.state.data.totalRecovered)}</p>
                <p className="b-cov-inc"><span
                    className="green-light">+ {TPrettyNbr.pretify(this.state.data.addRecovered)}</span> since
                    24h ({TPrettyNbr.pretifyFloat(this.state.data.incRecovered, 1, true)}%)</p>
            </CBlock>,
            <CBlock key={2} cols="col-6 col-md-4" id="b-death" loading={this.state.loading}>
                <p className="b-title">Total Deaths</p>
                <p className="b-cov-nb white">{TPrettyNbr.pretify(this.state.data.totalDeath)}</p>
                <p className="b-cov-inc"><span
                    className="white">+ {TPrettyNbr.pretify(this.state.data.addDeath)}</span> since
                    24h ({TPrettyNbr.pretifyFloat(this.state.data.incDeath, 1, true)}%)</p>
            </CBlock>
        ];
    }
}

BlocCovStats.defaultProps = defaultProps;
BlocCovStats.propTypes = propTypes;

export default BlocCovStats;