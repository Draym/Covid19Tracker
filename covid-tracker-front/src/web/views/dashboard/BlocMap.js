import React, {Component} from "react";
import CBlock from "../../components/CBlock";
import PropTypes from "prop-types";
import CMap from "../../components/CMap";

const propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

const defaultProps = {};

class BlocMap extends Component {
    render() {
        return (
            <CBlock cols="col-12 col-md-9" loading={this.props.loading} id="b-map">
                {this.props.data && this.props.data.length > 0 && <CMap data={this.props.data}/>}
            </CBlock>
        )
    }
}

BlocMap.defaultProps = defaultProps;
BlocMap.propTypes = propTypes;

export default BlocMap;