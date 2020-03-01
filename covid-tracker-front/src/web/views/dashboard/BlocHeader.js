import React, {Component} from "react";
import CBlock from "../../components/CBlock";
import PropTypes from "prop-types";
import CImg from "../../components/CImage/CImg";
import {Library} from "../../../utils/storage/ImgLibrary";

const propTypes = {
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
};

const defaultProps = {};

class BlocHeader extends Component {
    render() {
        return (
            <CBlock cols="col-12" id="b-header">
                <div className="row width-full">
                    <div className="col-12 col-md-5 pre-title">
                        <div className="v-align" >
                            <CImg data={Library.logo} height={30}/>
                        </div>
                        <div className="v-align">COVID-19 Impact by <a className="link-lab" href="http://draymlab.fr"
                                                   target="draymlab.fr">DraymLab </a> &copy; 2020.
                        </div>
                    </div>
                    <div className="col-12 col-md-7 title">
                    <span>
                        {this.props.location ? this.props.location : "Word Global"} data
                    </span>
                    </div>
                </div>
            </CBlock>
        );
    }
}

BlocHeader.defaultProps = defaultProps;
BlocHeader.propTypes = propTypes;

export default BlocHeader;