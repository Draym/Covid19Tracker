import React from "react";
import CBlock from "../../components/CBlock";
import {Container} from "reactstrap";

function AppHeader() {
    //https://give2asia.org/help-support-coronavirus-outbreak-prevention-wuhan-china/
    /*
     with <FontAwesomeIcon icon="hand-holding-heart" className="icon-heart"/>
     */
    return (
        <header>
            <Container fluid>
                <div className="row">
                    <CBlock cols="col-12">
                        <h4>header</h4>
                    </CBlock>
                </div>
            </Container>
        </header>
    );
}

export default AppHeader;


