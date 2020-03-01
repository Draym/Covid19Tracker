import React, {Component, Suspense} from "react";
import AppHeader from "./AppHeader";
import {Container} from 'reactstrap';
import {Redirect, Route, Switch} from "react-router-dom";
import AuthUtils from "../../../utils/auth/AuthUtils";

// routesDefault config
import routes from '../../../routes/routes-default';
import {RoutesEndpoint} from "../../../utils/RoutesEndpoint";

class DefaultLayout extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

    render() {
        return (
            <div className="app-body">
                <div className="app-body">
                    <main className="main">
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    (!route.restricted || AuthUtils.isAuthorized(route.restricted) ?
                                                        <route.component {...props} /> :
                                                        <Redirect to={{pathname: '/404', state: {from: props.location}}}/>)
                                                )}/>
                                        ) : null;
                                    })}
                                    <Redirect path="*" to={RoutesEndpoint.DASHBOARD}/>
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
            </div>
        )
    }
}

export default DefaultLayout;