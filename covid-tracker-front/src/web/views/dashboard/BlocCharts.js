import React from "react";
import CBlock from "../../components/CBlock";
import CDataLoader from "../../components/CDataLoader";
import {ApiEndpoint} from "../../../utils/api/ApiEndpoint";
import TString from "../../../utils/TString";

const propTypes = {
};

const defaultProps = {};

class BlocCharts extends CDataLoader {
    constructor(props) {
        super(props);
        this.initState({
            data: []
        });
        this.getEndpoint = this.getEndpoint.bind(this);
        this.getParameters = this.getParameters.bind(this);
    }

    getEndpoint() {
        return ApiEndpoint.DATA_GET_Total;
    }

    getParameters() {
        return {};
    }

    formatData(flatData) {
        return flatData;
    }

    render() {
        return (
            <CBlock loading={this.state.loading} id="b-charts">
                CHARTS
            </CBlock>
        )
    }
}

BlocCharts.defaultProps = defaultProps;
BlocCharts.propTypes = propTypes;

export default BlocCharts;