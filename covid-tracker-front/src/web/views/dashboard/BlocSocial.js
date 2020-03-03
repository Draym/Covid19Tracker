import React, {Component} from "react";
import CBlock from "../../components/CBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "reactstrap/es/Button";

class BlocSocial extends Component {
    render() {
        return (
            <CBlock cols="col-12" className="height-full" id="b-social">
                <p className="b-title border-bottom text-left">
                    Free Feeds<FontAwesomeIcon icon="rss" className="ml-2"/>
                    <Button className="float-right btn-shallow hvr-icon-pulse">Clip <FontAwesomeIcon icon="video" className="hvr-icon"/></Button>
                </p>
                <div className="v-align h-align" style={{height: "475px"}}>
                    <FontAwesomeIcon icon="photo-video" style={{"fontSize": "50px"}}/>
                </div>
            </CBlock>
        );
    }
}

export default BlocSocial;