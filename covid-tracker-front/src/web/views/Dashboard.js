import React from "react";
import BlocCovidStats from "./dashboard/BlocCovidStats";
import BlocLocations from "./dashboard/BlocLocations";
import BlocMap from "./dashboard/BlocMap";
import BlocSocial from "./dashboard/BlocSocial";
import CDataLoader from "../components/CDataLoader";
import {ApiEndpoint} from "../../utils/api/ApiEndpoint";
import BlocLastUpdate from "./dashboard/BlocLastUpdate";
import BlocDateSlider from "./dashboard/BlocDateSlider";
import BlocCharts from "./dashboard/BlocCharts";
import BlocHeader from "./dashboard/BlocHeader";
import moment from "moment";
import TString from "../../utils/TString";

class Dashboard extends CDataLoader {
    constructor(props) {
        super(props);
        let today = moment().format("M/D/YY");
        this.initState({
            parameters: {date: today},
            data: [],
            currentDate: today,
            location: {state: "", country: ""}
        });
        this.updateFocusedLocation = this.updateFocusedLocation.bind(this);
        this.updateCurrentDate = this.updateCurrentDate.bind(this);
        this.getEndpoint = this.getEndpoint.bind(this);
        this.getParameters = this.getParameters.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("--------------- dashboard UPDATE")
    }

    getEndpoint() {
        return ApiEndpoint.DATA_GET_StateTotal;
    }

    getParameters() {
        return this.state.parameters;
    }

    formatData(flatData) {
        flatData.sort(function (i1, i2) {
            return i1.confirmed < i2.confirmed;
        });
        return flatData;
    }

    updateCurrentDate(date) {
        this.setState({currentDate: date, parameters: {date: date}});
    }

    updateFocusedLocation(location) {
        console.log("NEW LOCATION: ", location);
        this.setState({location: location});
    }

    render() {
        return (
            <div className="app-content">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <div className="row">
                            <BlocHeader date={this.state.currentDate}
                                        location={TString.isNull(this.state.location.state) ? this.state.location.country : this.state.location.state}/>
                        </div>
                        <div className="row">
                            <BlocCovidStats parameters={{
                                date: this.state.currentDate,
                                state: this.state.location.state,
                                country: this.state.location.country
                            }}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <BlocCharts parameters={this.state.location}/>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 col-md-10">
                        <div className="row">
                            <BlocLocations data={this.state.data} loading={this.state.loading}
                                           date={this.state.loading ? null : this.state.currentDate}
                                           onLocationFocus={this.updateFocusedLocation}/>
                            <BlocMap data={this.state.data} loading={this.state.loading}/>
                        </div>
                        <div className="row">
                            <BlocLastUpdate/>
                            <BlocDateSlider onDateChange={this.updateCurrentDate} startDate={this.state.currentDate}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 pl-0">
                        <BlocSocial/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Dashboard;