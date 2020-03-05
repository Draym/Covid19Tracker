import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types';

const propTypes = {
    // mandatory
    id: PropTypes.string,
    value: PropTypes.any,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    // func
    onChange: PropTypes.func.isRequired,
    getSliderTipText: PropTypes.func.isRequired,
    // style
    width: PropTypes.number, // slider width
    position: PropTypes.string, // 'top' or 'bottom'
    sliderLabelStart: PropTypes.string,
    sliderLabelMid: PropTypes.string,
    sliderLabelEnd: PropTypes.string
};

const defaultProps = {
    position: 'bottom'
};

class CSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: (this.props.value ? this.props.value : 0),
            hoverValue: 0
        };
        this.onSliderValueChange = this.onSliderValueChange.bind(this);
        this.calculateSliderHover = this.calculateSliderHover.bind(this);
    };

    componentDidMount() {
        document.getElementById(this.props.id).addEventListener("mousemove", this.calculateSliderHover);
    }

    componentWillUnmount() {
        document.getElementById(this.props.id).removeEventListener("mousemove", this.calculateSliderHover);
    }

    calculateSliderHover(event) {
        let mousePos = (event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10);
        let value = mousePos.toFixed(0);
        if (value !== this.state.hoverValue) {
            this.setState({hoverValue: value});
        }
    };

    onSliderValueChange(event) {
        this.setState({
            sliderValue: event.target.value
        });
        this.props.onChange(event.target.value);
    };

    render() {
        let printLabels = function (position) {
            if (position === this.props.position) {
                return (<div className="slider-labels">
                    <label className="slider-min" htmlFor={this.props.id}>{this.props.sliderLabelStart}</label>
                    <label className="slider-middle" htmlFor={this.props.id}>{this.props.sliderLabelMid}</label>
                    <label className="slider-max" htmlFor={this.props.id}>{this.props.sliderLabelEnd}</label>
                </div>);
            }
        }.bind(this);
        return (
            <div>
                {printLabels("top")}
                <input id={this.props.id} type="range" className="custom-range"
                       style={this.props.width ? {width: this.props.width + "px"} : null}
                       onChange={this.onSliderValueChange} value={this.state.sliderValue}
                       min={this.props.min ? this.props.min : 0}
                       max={this.props.max ? this.props.max : 100}
                       step={this.props.step ? this.props.step : 1}
                       data-for={this.props.id + "-tip"} data-tip/>
                {printLabels("bottom")}
                <ReactTooltip id={this.props.id + "-tip"}
                              getContent={() => this.props.getSliderTipText(this.state.hoverValue)}/>
            </div>
        );
    }
}

CSlider.defaultProps = defaultProps;
CSlider.propTypes = propTypes;

export default CSlider;
