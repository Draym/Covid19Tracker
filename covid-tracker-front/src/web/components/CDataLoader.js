import HttpUtils from "../../utils/api/HttpUtils";
import CComponent from "./CComponent";
import TObject from "../../utils/TObject";

class CDataLoader extends CComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            data: null
        };
        this.isLoading = this.isLoading.bind(this);
        this.initializeData = this.initializeData.bind(this);
        this.loadDataAndInitialize = this.loadDataAndInitialize.bind(this);
        if (!(typeof this.formatData === "function")) {
            throw new TypeError("Must override method");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!TObject.isEqual(this.props.parameters, prevProps.parameters)) {
            console.log("UPDATE RELOAD", this.props.parameters, prevProps.parameters);
            this.loadDataAndInitialize(this.props.parameters);
        }
    }

    componentDidMount() {
        console.log("MOUNT LOAD");
        this.loadDataAndInitialize(this.state.parameters);
    }

    isLoading(value, error) {
        this.setState({loading: value, error: error});
    }

    initializeData(flatData) {
        let data = this.formatData(flatData);
        this.setState({data: data});
        this.isLoading(false);
    }

    loadDataAndInitialize(parameters) {
        this.isLoading(true);
        console.log("go: ", this.state.endpoint, parameters);
        HttpUtils.GET(process.env.REACT_APP_SERVER_URL, this.state.endpoint, parameters, function (data) {
            if (data) {
                this.initializeData(data);
            } else {
                this.isLoading(false, "There is no data.");
            }
        }.bind(this), function (errorStatus, error) {
            this.isLoading(false, error);
        }.bind(this));
    }
}

export default CDataLoader;