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

    createDataBloc(flatData, label, field, color) {
        let bloc = ChartUtils.getLineBlocConfig(label, color);
        let finalData = [];
        for (let i in flatData) {
            finalData.push({
                x: TDate.classicFormat(flatData[i].date),
                y: flatData[i]["inc" + field].toFixed(1),
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
        datasets.push(this.createDataBloc(flatData, "Cases increase %", "Confirmed", EColorPicker.RED(0.9)));
        //datasets.push(this.createDataBloc(flatData, "Recovered", "Recovered", EColorPicker.GREEN(0.9)));
        //datasets.push(this.createDataBloc(flatData, "Deaths", "Death", EColorPicker.LIGHTBLUE(0.9)));
        return datasets;
    }


    getCbTooltip() {
        return {
            label: function(tooltipItem, data) {
                const confirmed = data['datasets'][tooltipItem.datasetIndex].data[tooltipItem.index].y;
                return " +" + confirmed + "%";
            },
            beforeFooter: function(tooltipItem, data) {
                const addConfirmed = data['datasets'][tooltipItem[0].datasetIndex].data[tooltipItem[0].index].addConfirmed;
                return "  # " + TPrettyNbr.pretify(addConfirmed) + " new cases";
            },
            footer: function (tooltipItem, data) {
                return "";
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