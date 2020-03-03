import React, {Component} from "react";
import CBlock from "../../components/CBlock";
import PropTypes from "prop-types";
import CMap from "../../components/CMap";
import TArray from "../../../utils/TArray";

const propTypes = {
    data: PropTypes.array.isRequired
};

const defaultProps = {};

class BlocMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: React.createRef(),
            loading: true
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("+++++++++ ref:", this.state.map, this.props.data, nextProps.data);
        if (this.state.map.current !== null && nextProps.data !== null && nextProps.data.length > 0) {
            if (!this.props.data || this.props.data.length === 0) {
                this.state.map.current.create(nextProps.data, () => {
                    this.setState({loading: false})
                });
            }
            if (!TArray.isEqual(this.props, nextProps)) {
                this.state.map.current.update(nextProps.data);
            }
        }
        return true;
    }

    render() {
        return (
            <CBlock cols="col-12 col-md-9" loading={this.state.loading} ghostLoading={true} id="b-map">
                <CMap ref={this.state.map}/>
            </CBlock>
        )
    }
}

BlocMap.defaultProps = defaultProps;
BlocMap.propTypes = propTypes;

export default BlocMap;