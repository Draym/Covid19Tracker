import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ClipLoader from "react-spinners/ClipLoader";

const propTypes = {
    cols: PropTypes.string,
    className: PropTypes.string,
    loading: PropTypes.bool,
    ghostLoading: PropTypes.bool
};

const defaultProps = {
    cols: "",
    className: "",
    loading: false
};


class CBlock extends Component {
    render() {
        let renderGhostLoading = function () {
            return <div className={"app-block " + this.props.className}>
                {this.props.loading ? <div className="v-align h-align height-full width-full overflow-hidden">
                    <ClipLoader
                        size={35}
                        color={"#d2d2d2"}
                        loading={this.props.loading}
                    />
                </div> : null}
                {this.props.children}
            </div>;
        }.bind(this);
        return (
            <div className={this.props.cols} id={this.props.id}>
                {this.props.ghostLoading ? renderGhostLoading() :
                    <div className={"app-block " + this.props.className + (this.props.loading ? " c-align" : "")}>
                        {this.props.loading ?
                            <ClipLoader
                                size={35}
                                color={"#d2d2d2"}
                                loading={this.props.loading}
                            />
                            : this.props.children}
                    </div>
                }
            </div>
        )
    }
}

CBlock.defaultProps = defaultProps;
CBlock.propTypes = propTypes;

export default CBlock;