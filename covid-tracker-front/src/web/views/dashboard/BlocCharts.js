import React from "react";
import CBlock from "../../components/CBlock";
import CDataLoader from "../../components/CDataLoader";
import {ApiEndpoint} from "../../../utils/api/ApiEndpoint";
import {Nav, NavItem, NavLink} from "reactstrap";
import GlobalOverviewChart from "./charts/GlobalOverviewChart";
import TDate from "../../../utils/TDate";
import ConfirmedCasesChart from "./charts/ConfirmedCasesChart";
import DeathRateChart from "./charts/DeathRateChart";
import PropTypes from 'prop-types';

const propTypes = {
    parameters: PropTypes.object.isRequired
};

const defaultProps = {};

class BlocCharts extends CDataLoader {
    constructor(props) {
        super(props);
        this.initState({
            cp_name: "CHART",
            data: [],
            selectedTab: 0
        });
        this.getEndpoint = this.getEndpoint.bind(this);
        this.getParameters = this.getParameters.bind(this);
        this.selectTab = this.selectTab.bind(this);
        this.isLoadingChart = this.isLoadingChart.bind(this);
    }

    getEndpoint() {
        return ApiEndpoint.DATA_GET_Total;
    }

    getParameters() {
        return this.props.parameters;
    }

    formatData(flatData) {
        flatData.sort(function (i1, i2) {
            return TDate.minus(i1.date, i2.date);
        });
        return flatData;
    }

    /**
     * HANDLE EVENT
     ***/
    selectTab(index) {
        this.setState({selectedTab: index});
    };

    isLoadingChart(value, error) {
        this.isLoading(value, error);
    }

    render() {
        return (
            <CBlock loading={false} id="b-charts" cols="height-full">
                <Nav tabs>
                    <NavItem>
                        <NavLink active={this.state.selectedTab === 0} onClick={() => this.selectTab(0)}>Global
                            Overview</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={this.state.selectedTab === 1} onClick={() => this.selectTab(1)}>Confirmed
                            Cases</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={this.state.selectedTab === 2} onClick={() => this.selectTab(2)}>Death
                            Rate</NavLink>
                    </NavItem>
                    <NavItem className="nav-item-disabled nav-item-right">
                        <NavLink>38 days</NavLink>
                    </NavItem>
                </Nav>
                <div className="margin-auto pt-2">
                    <GlobalOverviewChart data={this.state.data} loading={this.isLoadingChart}
                                         height={185} visible={this.state.selectedTab === 0}/>
                    <ConfirmedCasesChart data={this.state.data} loading={this.isLoadingChart}
                                         height={185} visible={this.state.selectedTab === 1}/>
                    <DeathRateChart data={this.state.data} loading={this.isLoadingChart}
                                    height={185} visible={this.state.selectedTab === 2}/>
                </div>
            </CBlock>
        )
    }
}

BlocCharts.defaultProps = defaultProps;
BlocCharts.propTypes = propTypes;

export default BlocCharts;