import HttpUtils from "../../utils/api/HttpUtils";
import CComponent from "./CComponent";
import TObject from "../../utils/TObject";
import TLogs from "../../utils/TLogs";

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
        if (!(typeof this.formatData === "function") ||
            !(typeof this.getParameters === "function") ||
            !(typeof this.getEndpoint === "function")) {
            throw new TypeError("Must override method");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //TLogs.p("-- " + this.state.cp_name + " TRY UPDATE", this.props.parameters, prevProps.parameters);

        if (!TObject.isEqual(this.props.parameters, prevProps.parameters)) {
            //TLogs.p("## OK");
            this.loadDataAndInitialize(this.props.parameters);
        } else if (!TObject.isEqual(this.state.parameters, prevState.parameters)) {
            //TLogs.p("## OK");
            this.loadDataAndInitialize(this.state.parameters);
        }
    }

    componentDidMount() {
        TLogs.p("MOUNT LOAD");
        this.loadDataAndInitialize(this.getParameters());
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
        TLogs.p("go: ", this.getEndpoint(), parameters);
        HttpUtils.GET(process.env.REACT_APP_SERVER_URL, this.getEndpoint(), parameters, function (data) {
            TLogs.p("OLA: ", this.getEndpoint(), data);
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