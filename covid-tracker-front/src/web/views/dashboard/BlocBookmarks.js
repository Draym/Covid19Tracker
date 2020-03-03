import React, {Component} from "react";
import CBlock from "../../components/CBlock";
import PropTypes from 'prop-types';
import BookmarkStore from "../../../utils/storage/BookmarkStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TString from "../../../utils/TString";

const propTypes = {
    onBookmarkClick: PropTypes.func.isRequired,
    onBookmarksChange: PropTypes.func.isRequired
};

const defaultProps = {};

class BlocBookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarks: BookmarkStore.getBookmarks(),
            loading: false
        };
        this.onBookmarkClick = this.onBookmarkClick.bind(this);
    }

    onBookmarkClick(item) {
        if (this.props.onBookmarkClick) {
            this.props.onBookmarkClick(item);
        }
    }

    onBookmarkStatusClick(bookmark) {
        BookmarkStore.deleteBookmark(bookmark);
        if (this.props.onBookmarksChange) {
            this.props.onBookmarksChange();
        }
    }

    render() {
        if (!this.state.bookmarks || this.state.bookmarks.length === 0) {
            return null;
        }
        let getBookmarkLabel = function (location) {
            return TString.isNull(location.country) ? "Word Global" : ((location.state ? location.state + ", " : "") + location.country);
        };
        return (
            <CBlock cols="col-12" loading={this.state.loading} id="b-bookmarks">
                <p className="b-title border-bottom">Bookmarks</p>
                <ul className="ul-bookmarks">
                    {
                        this.state.bookmarks.map((item, i) => {
                            return (
                                <li key={i}>
                                    <FontAwesomeIcon className="icon-bookmark tiny" icon={['fas', 'bookmark']}
                                                     onClick={() => this.onBookmarkStatusClick(item)}/>
                                    <span onClick={() => this.onBookmarkClick(item)}>{getBookmarkLabel(item)}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </CBlock>
        );
    }
}

BlocBookmarks.defaultProps = defaultProps;
BlocBookmarks.propTypes = propTypes;

export default BlocBookmarks;