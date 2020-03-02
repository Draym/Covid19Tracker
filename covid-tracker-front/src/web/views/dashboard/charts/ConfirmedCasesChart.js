import React from "react";
import ChartUtils from "../../../../utils/chart/ChartUtils";
import EColorPicker from "../../../../utils/enum/EColorPicker";
import TDate from "../../../../utils/TDate";
import BaseLineChart from "./BaseLineChart";
import TPrettyNbr from "../../../../utils/TPrettyNbr";

const propTypes = {
    ...BaseLineChart.propTypes
};

const defaultProps = {};

class ConfirmedCasesChart extends BaseLineChart {
    constructor(props) {
        super(props);
        this.createDataset = this.createDataset.bind(this);
        this.createDataBloc = this.createDataBloc.bind(this);
    }

    createDataBloc(flatData, label, field, color, yID) {
        let bloc = ChartUtils.getLineBlocConfig(label, color, yID);
        let finalData = [];
        for (let i in flatData) {
            finalData.push({
                x: TDate.classicFormat(flatData[i].date),
                y: field === "incConfirmed" ? flatData[i][field].toFixed(1) : flatData[i][field],
                totalConfirmed: flatData[i].totalConfirmed,
                incConfirmed: flatData[i].incConfirmed,
                addConfirmed: flatData[i].addConfirmed,
            });
        }
        bloc.data = finalData;
        return bloc;
    }

    createDataset(flatData) {
        let datasets = [];
        datasets.push(this.createDataBloc(flatData, "New cases", "addConfirmed", EColorPicker.RED(0.9), "y1"));
        datasets.push(this.createDataBloc(flatData, "Cases increase %", "incConfirmed", EColorPicker.LIGHTBLUE(0.9), "y2"));
        return datasets;
    }

    getChartOption() {
        let conf = ChartUtils.GetDefaultDateLineChartOpt(22, this.state.chartUnit, this.state.dateMin, this.state.dateMax, null, this.getCbTooltip ? this.getCbTooltip() : null);
        conf.scales.yAxes.push({
            id: "y2",
            position: "right",
            ticks: {
                stepSize: null,
                callback: function (value, index, values) {
                    return index % 3 === 0 || index === values.length - 1 ? TPrettyNbr.pretify(value) : null;
                }
            }
        });
        conf.tooltips.mode = "index";
        conf.tooltips.intersect = false;
        conf.tooltips.position = "nearest";
        return conf;
    }

    getCbTooltip() {
        return {
            label: function (tooltipItem, data) {
                console.log("# ", tooltipItem, data);
                const value = data['datasets'][tooltipItem.datasetIndex].data[tooltipItem.index].y;
                if (tooltipItem.datasetIndex === 0) {
                    return " " + TPrettyNbr.pretify(value, ".") + " new cases"
                } else {
                    return " +" + value + "%"
                }
            },
            afterFooter: function (tooltipItem, data) {
                const totalConfirmed = data['datasets'][tooltipItem[0].datasetIndex].data[tooltipItem[0].index].totalConfirmed;
                const addConfirmed = data['datasets'][tooltipItem[0].datasetIndex].data[tooltipItem[0].index].addConfirmed;
                return "  " + TPrettyNbr.pretify(totalConfirmed - addConfirmed) + " to " + TPrettyNbr.pretify(totalConfirmed) + " cases";
            }
        };
    }
}

ConfirmedCasesChart.defaultProps = defaultProps;
ConfirmedCasesChart.propTypes = propTypes;

export default ConfirmedCasesChart;