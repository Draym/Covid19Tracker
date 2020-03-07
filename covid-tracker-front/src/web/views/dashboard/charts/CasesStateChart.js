import ChartUtils from "../../../../utils/chart/ChartUtils";
import EColorPicker from "../../../../utils/enum/EColorPicker";
import TDate from "../../../../utils/TDate";
import CDateBarChart from "../../../components/chart/CDateBarChart";
import TPrettyNbr from "../../../../utils/TPrettyNbr";

const propTypes = {
    ...CDateBarChart.propTypes
};

const defaultProps = {};

class CasesStateChart extends CDateBarChart {
    constructor(props) {
        super(props);
        this.createDataset = this.createDataset.bind(this);
        this.createDataBloc = this.createDataBloc.bind(this);
        this.initState({
            stackedX: true,
            stackedY: true,
            maxX: 100
        })
    }

    createDataBloc(flatData, field, label, color) {
        let bloc = ChartUtils.getLineBlocConfig(label, color);
        let finalData = [];
        for (let i in flatData) {
            let value = field === "active" ? (flatData[i].totalConfirmed - flatData[i].totalRecovered - flatData[i].totalDeath) : flatData[i][field];
            let percent = value === 0 || flatData[i].totalConfirmed === 0 ? 0 : value * 100 / flatData[i].totalConfirmed;
            finalData.push({
                x: TDate.classicFormat(flatData[i].date),
                y: (percent).toFixed(1),
                totalConfirmed: flatData[i].totalConfirmed,
                totalActive: flatData[i].totalConfirmed - flatData[i].totalRecovered - flatData[i].totalDeath,
                totalRecovered: flatData[i].totalRecovered,
                totalDeath: flatData[i].totalDeath
            });
        }
        bloc.data = finalData;
        return bloc;
    }

    createDataset(flatData) {
        let datasets = [];
        datasets.push(this.createDataBloc(flatData, "totalRecovered", "Recovered %", EColorPicker.GREEN(0.9)));
        datasets.push(this.createDataBloc(flatData, "active", "Active cases %", EColorPicker.LIGHTYELLOW(0.7)));
        datasets.push(this.createDataBloc(flatData, "totalDeath", "Deaths %", EColorPicker.RED(0.9)));
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
            beforeFooter: function (tooltipItem, data) {
                const totalActive = data['datasets'][tooltipItem[0].datasetIndex].data[tooltipItem[0].index].totalActive;
                return "  # " + TPrettyNbr.pretify(totalActive) + " active cases";
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

CasesStateChart.defaultProps = defaultProps;
CasesStateChart.propTypes = propTypes;

export default CasesStateChart;