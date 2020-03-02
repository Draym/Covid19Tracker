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

class DeathRateChart extends BaseLineChart {
    constructor(props) {
        super(props);
        this.createDataset = this.createDataset.bind(this);
        this.createDataBloc = this.createDataBloc.bind(this);
    }

    createDataBloc(flatData, label, color) {
        let bloc = ChartUtils.getLineBlocConfig(label, color);
        let finalData = [];
        for (let i in flatData) {
            finalData.push({
                x: TDate.classicFormat(flatData[i].date),
                y: (flatData[i].totalDeath * 100 / (flatData[i].totalDeath + flatData[i].totalRecovered)).toFixed(1),
                totalConfirmed: flatData[i].totalConfirmed,
                totalRecovered:flatData[i].totalRecovered,
                totalDeath: flatData[i].totalDeath
            });
        }
        bloc.data = finalData;
        return bloc;
    }

    createDataset(flatData) {
        let datasets = [];
        datasets.push(this.createDataBloc(flatData, "Deaths rate %", EColorPicker.LIGHTGREY(0.9)));
        return datasets;
    }

    getCbTooltip() {
        return {
            label: function(tooltipItem, data) {
                const deathRate = data['datasets'][tooltipItem.datasetIndex].data[tooltipItem.index].y;
                return " " + deathRate + "% death rate";
            },
            beforeFooter: function(tooltipItem, data) {
                const totalConfirmed = data['datasets'][tooltipItem[0].datasetIndex].data[tooltipItem[0].index].totalConfirmed;
                return "  # " + TPrettyNbr.pretify(totalConfirmed) + " confirmed";
            },
            footer: function (tooltipItem, data) {
                const totalRecovered = data['datasets'][tooltipItem[0].datasetIndex].data[tooltipItem[0].index].totalRecovered;
                return "  # " + TPrettyNbr.pretify(totalRecovered) + " recovered";
            },
            afterFooter: function (tooltipItem, data) {
                const totalDeath = data['datasets'][tooltipItem[0].datasetIndex].data[tooltipItem[0].index].totalDeath;
                return "  # " + TPrettyNbr.pretify(totalDeath) + " deaths";
            }
        };
    }
}

DeathRateChart.defaultProps = defaultProps;
DeathRateChart.propTypes = propTypes;

export default DeathRateChart;