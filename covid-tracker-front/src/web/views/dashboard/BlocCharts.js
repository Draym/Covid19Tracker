import React from "react";
import CBlock from "../../components/CBlock";
import CDataLoader from "../../components/CDataLoader";
import {ApiEndpoint} from "../../../utils/api/ApiEndpoint";

const propTypes = {
};

const defaultProps = {};

class BlocCharts extends CDataLoader {
    constructor(props) {
        super(props);
        this.initState({
            endpoint: ApiEndpoint.DATA_GET_Total,
            parameters: {},
            data: []
        });
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