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
            cp_name: "SLIDER",
            data: []
        });
        this.getEndpoint = this.getEndpoint.bind(this);
        this.getParameters = this.getParameters.bind(this);
        this.formatData = this.formatData.bind(this);
        this.onDateSliderChange = this.onDateSliderChange.bind(this);
        this.getSliderTipText = this.getSliderTipText.bind(this);
    }

    getEndpoint() {
        return ApiEndpoint.DATA_GET_ValidDates;
    }

    getParameters() {
        return null;
    }

    formatData(flatData) {
        this.setState({sliderValue: flatData.length - 1});
        flatData.sort(function (i1, i2) {
            return TDate.minus(i1.date, i2.date);
        });
        return flatData;
    }
    getSliderTipText(value) {
        if (value < this.state.data.length) {
            return this.state.data[value].date;
        }
        return value;
    }
    onDateSliderChange(value) {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        this.timeout = window.setTimeout(() => {
            this.props.onDateChange(this.state.data[value].date);
        }, 100);
    }

    render() {
        return (
            <CBlock cols="col-12 col-sm-8 col-md-9" loading={this.state.loading} id="b-dateslider">
                {this.state.data.length > 1 ?
                    <CSlider id="sliderDateValue"
                             onChange={this.onDateSliderChange}
                             value={this.state.data.length - 1} position={"bottom"}
                             sliderLabelStart={this.state.data[0].date}
                             sliderLabelMid="Date picker"
                             sliderLabelEnd={this.state.data[this.state.data.length - 1].date}
                             min={0}
                             max={this.state.data.length - 1}
                             getSliderTipText={this.getSliderTipText}/>
                    : null}
            </CBlock>
        )
    }
}

BlocDateSlider.defaultProps = defaultProps;
BlocDateSlider.propTypes = propTypes;

export default BlocDateSlider;