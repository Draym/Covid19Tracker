import React from "react";
import {Line} from "react-chartjs-2";
import PropTypes from 'prop-types';
import ChartUtils from "../../../../utils/chart/ChartUtils";
import TDate from "../../../../utils/TDate";
import CComponent from "../../../components/CComponent";

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.func
};

const defaultProps = {};

class BaseLineChart extends CComponent {
    constructor(props) {
        super(props);
        this.state = {
            charUnit: "day",
            dateFormat: "M/D/YY",
            dateMin: null,
            dateMax: null
        };
        this.initializeData = this.initializeData.bind(this);
        this.drawChart = this.drawChart.bind(this);
        if (!(typeof this.createDataset === "function")) {
            throw new TypeError("Must override method");
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.data !== this.state.data || nextProps.data !== this.props.data || nextProps.visible !== this.props.visible;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.initializeData(this.props.data);
        }
    }

    // data should be sorted by date before
    initializeData(flatData) {
        if (flatData == null || flatData.length < 1) {
            return;
        }
        let datasets = this.createDataset(flatData);
        this.setState({
            data: {datasets: datasets},
            dateMin: TDate.classicFormat(flatData[0].date),
            dateMax: TDate.classicFormat(flatData[flatData.length - 1])
        });
        this.props.loading(false, null);
    }

    drawChart() {
        if (this.state.data && this.state.data.datasets && this.state.data.datasets.length > 0) {
            return (
                <div className="chart-wrapper" style={{width: this.props.width, height: this.props.height }}>
                    <Line data={this.state.data}
                          options={ChartUtils.GetDefaultDateLineChartOpt(22, this.state.chartUnit, this.state.dateMin, this.state.dateMax, null, this.getCbTooltip ? this.getCbTooltip() : null)}
                    />
                </div>
            );
        }
        return null;
    }

    render() {
        return (this.props.visible ? this.drawChart() : null);
    }
}

BaseLineChart.defaultProps = defaultProps;
BaseLineChart.propTypes = propTypes;

export default BaseLineChart;