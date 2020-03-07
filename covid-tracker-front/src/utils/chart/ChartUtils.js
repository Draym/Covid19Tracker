import TPrettyNbr from "../TPrettyNbr";

class ChartUtils {

    static GetDefaultDateLineChartOpt(lineWidth, dateUnit, dateMin, dateMax, stepSize, cbTooltip, dateFormat, stackedX, stackedY, maxX) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            legend: {position: 'bottom'},
            scales: {
                xAxes: [{
                    stacked: stackedX != null ? stackedX : false,
                    title: "time",
                    type: 'time',
                    time: {
                        parser: dateFormat ? dateFormat : 'DD/MM/YYYY',
                        tooltipFormat: dateFormat ? dateFormat : 'DD/MM/YYYY',
                        unit: dateUnit,
                        displayFormats: {
                            'day': 'DD/MM',
                            'hour': 'HH:mm',
                            'week': 'DD MMM',
                            'month': 'MMM'
                        }
                    },
                    gridLines: {
                        lineWidth: lineWidth
                    },
                    ticks: {
                        source: 'auto',
                        maxRotation: 0,
                        maxTicksLimit: 5,
                        min: dateMin,
                        max: dateMax
                    }
                }],
                yAxes: [{
                    stacked: stackedY != null ? stackedY : false,
                    id: "y1",
                    ticks: {
                        stepSize: stepSize ? stepSize : null,
                        callback: function (value, index, values) {
                            return index % 3 === 0 || index === values.length - 1 ? TPrettyNbr.pretify(value) : null;
                        },
                        max: maxX
                    }
                }]
            },
            tooltips: {
                mode: 'point',
                callbacks: (cbTooltip ? cbTooltip : {})
            }
        };
    }

    static GetDefaultChartOpt(lineWidth, step, stackedX, stackedY, cbTooltip, cbTickX) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    stacked: stackedX,
                    gridLines: {
                        lineWidth: lineWidth
                    },
                    ticks: {
                        source: 'auto',
                        callback: (cbTickX ? cbTickX : function (value, index, values) {
                            return value;
                        })
                    }
                }],
                yAxes: [{
                    id: "y1",
                    stacked: stackedY,
                    ticks: {
                        beginAtZero: true,
                        stepSize: step
                    }
                }]
            },
            tooltips: {
                mode: 'point',
                callbacks: (cbTooltip ? cbTooltip : {})
            }
        };
    }

    static GetDefaultBloc(label, borderWidth, backgroundColor, borderColor, hoverBorderColor) {
        return {
            label: label,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: borderWidth,
            hoverBorderColor: hoverBorderColor,
            data: []
        };
    }

    static getLineBlocConfig(label, color, yID) {
        let conf = {
            label: label,
            lineTension: 0.3,
            borderColor: color,
            borderWidth: 1.5,
            hoverBorderColor: color,
            pointRadius: 2,
            data: [],
            fill: false
        };
        if (yID) {
            conf.yAxisID = yID;
        }
        return conf;
    }
}

export default ChartUtils;
