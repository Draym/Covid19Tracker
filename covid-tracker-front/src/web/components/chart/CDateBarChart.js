import React from "react";
import {Bar} from "react-chartjs-2";
import PropTypes from 'prop-types';
import ChartUtils from "../../../utils/chart/ChartUtils";
import CDateBaseChart from "./CDateBaseChart";

const propTypes = {
    stackedX: PropTypes.bool,
    stackedY: PropTypes.bool,
    ...CDateBaseChart.propTypes,
};

const defaultProps = {
    stackedX: false,
    stackedY: false
};

class CDateBarChart extends CDateBaseChart {
    constructor(props) {
        super(props);
        this.initState({
            stackedX: props.stackedX,
            stackedY: props.stackedY
        })
    }

    getChartOption() {
        return ChartUtils.GetDefaultDateLineChartOpt(22, this.state.chartUnit, this.state.dateMin,
            this.state.dateMax, null, this.getCbTooltip ? this.getCbTooltip() : null, null, this.state.stackedX, this.state.stackedY, this.state.maxX)
    }

    drawChart() {
        if (this.state.data && this.state.data.datasets && this.state.data.datasets.length > 0) {
            return (
                <div className="chart-wrapper" style={{width: this.props.width, height: this.props.height }}>
                    <Bar data={this.state.data}
                          options={this.getChartOption()}
                    />
                </div>
            );
        }
        return null;
    }
}

CDateBarChart.defaultProps = defaultProps;
CDateBarChart.propTypes = propTypes;

export default CDateBarChart;