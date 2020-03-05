import React, {Component} from "react";
import CBlock from "../../components/CBlock";
import PropTypes from "prop-types";
import CImg from "../../components/CImg";
import {Library} from "../../../utils/storage/ImgLibrary";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BookmarkStore from "../../../utils/storage/BookmarkStore";
import TString from "../../../utils/TString";

const propTypes = {
    date: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    onBookmarksChange: PropTypes.func.isRequired
};

const defaultProps = {};

class BlocHeader extends Component {
    constructor(props) {
        super(props);
        this.isLocationBookmarked = this.isLocationBookmarked.bind(this);
        this.onBookmarkClick = this.onBookmarkClick.bind(this);
    }

    isLocationBookmarked() {
        return BookmarkStore.hasBookmark(this.props.location);
    }

    onBookmarkClick(marked) {
        console.log("CLICKED: ", marked);
        if (marked) {
            console.log("DELETE: ", this.props.location);
            BookmarkStore.deleteBookmark(this.props.location)
        } else {
            BookmarkStore.addBookmark(this.props.location)
        }
        if (this.props.onBookmarksChange) {
            this.props.onBookmarksChange();
        }
    }

    render() {
        let locationIsBookmarked = this.isLocationBookmarked();
        let location = TString.isNull(this.props.location.state) ? this.props.location.country : this.props.location.state;
        return (
            <CBlock cols="col-12" id="b-header">
                <div className="row width-full">
                    <div className="col-12 col-md-5 pre-title">
                        <div className="v-align">
                            <CImg data={Library.logo} height={30}/>
                        </div>
                        <div className="v-align">
                            <div id="b-header-t1">COVID-19 Impact</div>
                            <div id="b-header-t2">&nbsp;by</div>
                            <div id="b-header-t3"><a className="link-lab" href="http://draymlab.fr"
                                                     target="draymlab.fr">DraymLab</a>
                            </div>
                            <div id="b-header-t4"> &copy; 2020.</div>
                        </div>
                    </div>
                    <div className="col-12 col-md-7 title">
                        <span>{TString.isNull(location) ? "Word Global" : location}</span>
                        <FontAwesomeIcon className="icon-bookmark"
                                         icon={locationIsBookmarked ? ['fas', 'bookmark'] : ['far', 'bookmark']}
                                         onClick={() => this.onBookmarkClick(locationIsBookmarked)}/>
                    </div>
                </div>
            </CBlock>
        );
    }
}

BlocHeader.defaultProps = defaultProps;
BlocHeader.propTypes = propTypes;

export default BlocHeader;