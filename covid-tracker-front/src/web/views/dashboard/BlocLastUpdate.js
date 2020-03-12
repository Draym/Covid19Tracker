import React from "react";
import CBlock from "../../components/CBlock";
import CDataLoader from "../../components/CDataLoader";
import {ApiEndpoint} from "../../../utils/api/ApiEndpoint";
import moment from "moment";

const propTypes = {};

const defaultProps = {};

class BlocLastUpdate extends CDataLoader {
    constructor(props) {
        super(props);
        this.initState({
            cp_name: "LAST_UPDATE",
            data: {}
        });
        this.getEndpoint = this.getEndpoint.bind(this);
        this.getParameters = this.getParameters.bind(this);
    }

    getEndpoint() {
        return ApiEndpoint.DATA_GET_LastUpdate;
    }

    getParameters() {
        return this.props.parameters;
    }

    formatData(flatData) {
        return flatData;
    }

    render() {
        return (
            <CBlock cols="col-12 col-sm-4 col-md-3" className="v-align" loading={this.state.loading} id="b-lastupdate">
                <div id="b-lastupdate-t1">
                    LAST UPDATE :&nbsp;
                </div>
                <div id="b-lastupdate-t2">
                    <span>{moment(this.state.data).local().format("HH:mm[ -] DD MMM YYYY")}</span>
                </div>
            </CBlock>
        )
    }
}

BlocLastUpdate.defaultProps = defaultProps;
BlocLastUpdate.propTypes = propTypes;

export default BlocLastUpdate;