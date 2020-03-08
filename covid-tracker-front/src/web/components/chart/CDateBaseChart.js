import PropTypes from 'prop-types';
import TDate from "../../../utils/TDate";
import CComponent from "../CComponent";

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.func
};

const defaultProps = {};

class CDateBaseChart extends CComponent {
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
        if (!(typeof this.createDataset === "function")
            || !(typeof this.drawChart === "function")) {
            throw new TypeError("Must override method");
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.data !== this.state.data || nextProps.data !== this.props.data || nextProps.visible !== this.props.visible;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            console.log("-- Chart Updating: ", this.props.data);
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

    render() {
        return (this.props.visible ? this.drawChart() : null);
    }
}

CDateBaseChart.defaultProps = defaultProps;
CDateBaseChart.propTypes = propTypes;

export default CDateBaseChart;