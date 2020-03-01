import React from "react";
import CBlock from "../../components/CBlock";
import CDataLoader from "../../components/CDataLoader";
import {ApiEndpoint} from "../../../utils/api/ApiEndpoint";
import moment from "moment";

const propTypes = {
};

const defaultProps = {};

class BlocLastUpdate extends CDataLoader {
    constructor(props) {
        super(props);
        this.initState({
            endpoint: ApiEndpoint.DATA_GET_LastUpdate,
            parameters: props.parameters,
            data: {}
        });
    }

    formatData(flatData) {
        return flatData;
    }

    render() {
        console.log("DATE: ", moment(this.state.data).local().format("DD/MM/YYYY HH:mm:ss"));
        return (
            <CBlock cols="col-12 col-md-3" className="v-align" loading={this.state.loading} id="b-lastupdate">
                LAST UPDATE: <span>{moment(this.state.data).local().format("HH:mm[ -] DD MMM YYYY")}</span>
            </CBlock>
        )
    }
}

BlocLastUpdate.defaultProps = defaultProps;
BlocLastUpdate.propTypes = propTypes;

export default BlocLastUpdate;