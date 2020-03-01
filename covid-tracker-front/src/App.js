import React from 'react';
import './App.scss';
import DefaultLayout from "./web/containers/default/DefaultLayout";
import {BrowserRouter} from 'react-router-dom';
import Navbar from "./web/containers/default/Navbar";
import AppFooter from "./web/containers/default/AppFooter";

import {library} from '@fortawesome/fontawesome-svg-core'
import {faHandHoldingHeart, faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
//import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
//import { faComments } from '@fortawesome/free-regular-svg-icons';

library.add(faHandHoldingHeart, faChevronDown, faChevronUp);

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

function App() {
    return (
        <div id="app-container">
            <Navbar/>
            <BrowserRouter style={{'backgroundColor': 'red'}}>
                <React.Suspense fallback={loading()}>
                    <DefaultLayout/>
                </React.Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
