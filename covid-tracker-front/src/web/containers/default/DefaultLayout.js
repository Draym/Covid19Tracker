import React, {Component, Suspense} from "react";
import {Container} from 'reactstrap';
import {Redirect, Route, Switch} from "react-router-dom";
import AuthUtils from "../../../utils/auth/AuthUtils";
import routes from '../../../routes/routes-default';
import {RoutesEndpoint} from "../../../utils/RoutesEndpoint";
import ClipLoader from "react-spinners/ClipLoader";

class DefaultLayout extends Component {

    loading = () => <div className="animated fadeIn h-align v-align width-full" style={{height: "700px"}}>
        <ClipLoader
            size={80}
            color={"#d2d2d2"}
            loading={true}
        />
    </div>;

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
                                                        <Redirect
                                                            to={{pathname: '/404', state: {from: props.location}}}/>)
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

/*

 */

export default DefaultLayout;