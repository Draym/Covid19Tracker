import React from "react";
import {Line} from "react-chartjs-2";
import ChartUtils from "../../../utils/chart/ChartUtils";
import CDateBaseChart from "./CDateBaseChart";

const propTypes = {
    ...CDateBaseChart.propTypes
};

const defaultProps = {};

class CDateLineChart extends CDateBaseChart {
    getChartOption() {
        return ChartUtils.GetDefaultDateLineChartOpt(22, this.state.chartUnit, this.state.dateMin,
            this.state.dateMax, null, this.getCbTooltip ? this.getCbTooltip() : null)
    }

    drawChart() {
        if (this.state.data && this.state.data.datasets && this.state.data.datasets.length > 0) {
            return (
                <div className="chart-wrapper" style={{width: this.props.width, height: this.props.height}}>
                    <Line data={this.state.data}
                          options={this.getChartOption()}
                    />
                </div>
            );
        }
        return null;
    }
}

CDateLineChart.defaultProps = defaultProps;
CDateLineChart.propTypes = propTypes;

export default CDateLineChart;