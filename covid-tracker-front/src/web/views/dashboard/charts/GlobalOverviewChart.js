import ChartUtils from "../../../../utils/chart/ChartUtils";
import EColorPicker from "../../../../utils/enum/EColorPicker";
import TDate from "../../../../utils/TDate";
import CDateLineChart from "../../../components/chart/CDateLineChart";
import TPrettyNbr from "../../../../utils/TPrettyNbr";

const propTypes = {
    ...CDateLineChart.propTypes
};

const defaultProps = {};

class GlobalOverviewChart extends CDateLineChart {
    constructor(props) {
        super(props);
        this.createDataset = this.createDataset.bind(this);
        this.createDataBloc = this.createDataBloc.bind(this);
    }

    createDataBloc(flatData, label, field, color) {
        let bloc = ChartUtils.getLineBlocConfig(label, color);
        // fill bloc data
        let finalData = [];
        for (let i in flatData) {
            finalData.push({
                x: TDate.classicFormat(flatData[i].date),
                y: flatData[i]["total" + field],
                incPercent: flatData[i]["inc" + field],
                incNumber: flatData[i]["add" + field]
            });
        }
        bloc.data = finalData;
        return bloc;
    }

    createDataset(flatData) {
        let datasets = [];
        datasets.push(this.createDataBloc(flatData, "Confirmed", "Confirmed", EColorPicker.RED(0.9)));
        datasets.push(this.createDataBloc(flatData, "Recovered", "Recovered", EColorPicker.GREEN(0.9)));
        datasets.push(this.createDataBloc(flatData, "Deaths", "Death", EColorPicker.LIGHTGREY(0.9)));
        return datasets;
    }

    getChartOption() {
        let conf = super.getChartOption();
        conf.tooltips.mode = "index";
        conf.tooltips.intersect = false;
        conf.tooltips.position = "nearest";
        return conf;
    }

    getCbTooltip() {
        return {
            label: function (tooltipItem, data) {
                const label = data['datasets'][tooltipItem.datasetIndex].label;
                const value = data['datasets'][tooltipItem.datasetIndex].data[tooltipItem.index].y;
                return " " + label + ": " + TPrettyNbr.pretify(value, false, ".");
            }
        };
    }
}

GlobalOverviewChart.defaultProps = defaultProps;
GlobalOverviewChart.propTypes = propTypes;

export default GlobalOverviewChart;