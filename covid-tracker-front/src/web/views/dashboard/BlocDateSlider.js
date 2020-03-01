import React from "react";
import CBlock from "../../components/CBlock";
import CDataLoader from "../../components/CDataLoader";
import {ApiEndpoint} from "../../../utils/api/ApiEndpoint";
import CSlider from "../../components/CSlider";
import PropTypes from 'prop-types';
import TDate from "../../../utils/TDate";

const propTypes = {
    onDateChange: PropTypes.func.isRequired,
    startDate: PropTypes.string.isRequired
};

const defaultProps = {};

class BlocDateSlider extends CDataLoader {
    constructor(props) {
        super(props);
        this.initState({
            endpoint: ApiEndpoint.DATA_GET_ValidDates,
            parameters: props.parameters,
            data: [],
            currentSliderDate: props.date
        });
        this.formatData = this.formatData.bind(this);
        this.onDateSliderChange = this.onDateSliderChange.bind(this);
    }

    formatData(flatData) {
        this.setState({sliderValue: flatData.length - 1});
        flatData.sort(function (i1, i2) {
            return TDate.isGreater(i1.date, i2.date);
        });
        return flatData;
    }

    onDateSliderChange(value) {
        console.log("slider: ", value);
        this.setState({
            currentSliderDate: this.state.data[value].date
        });
        this.props.onDateChange(this.state.data[value].date);
    }

    render() {
        return (
            <CBlock cols="col-12 col-md-9" loading={this.state.loading} id="b-dateslider">
                {this.state.data.length > 1 ?
                    <CSlider id="sliderDateValue"
                             onChange={this.onDateSliderChange}
                             value={this.state.data.length - 1} position={"bottom"}
                             sliderLabelStart={this.state.data[0].date}
                             sliderLabelEnd={this.state.data[this.state.data.length - 1].date}
                             min={0}
                             max={this.state.data.length - 1}
                             sliderTipText={this.state.currentSliderDate}/>
                             : null}
            </CBlock>
        )
    }
}

BlocDateSlider.defaultProps = defaultProps;
BlocDateSlider.propTypes = propTypes;

export default BlocDateSlider;