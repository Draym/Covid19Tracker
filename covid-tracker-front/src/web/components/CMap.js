import React, {Component} from 'react';
import {loadModules} from 'esri-loader';
import TString from "../../utils/TString";

class CMap extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    create(data) {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/FeatureLayer", "esri/Graphic", "esri/geometry/Point"], {css: true})
            .then(([Map, MapView, FeatureLayer, Graphic, Point]) => {
                this.map = new Map({
                    basemap: 'dark-gray-vector'
                });
                this.graphics = data.map(function (place) {
                    return new Graphic({
                        attributes: {
                            ObjectID: place.id,
                            name: (!TString.isNull(place.state) ? (place.state + ", ") : "") + place.country,
                            confirmed: place.confirmed,
                            recovered: place.recovered,
                            death: place.death,
                            existing: place.confirmed - place.recovered - place.death,
                        },
                        geometry: new Point({
                            longitude: place.longitude,
                            latitude: place.latitude
                        })
                    });
                }.bind(this));

                this.featureLayer = new FeatureLayer({
                    source: this.graphics,
                    renderer: {
                        type: "simple",                    // autocasts as new SimpleRenderer()
                        symbol: {                          // autocasts as new SimpleMarkerSymbol()
                            type: "simple-marker",
                            color: "rgba(195,9,0,0.76)",
                            outline: {                       // autocasts as new SimpleLineSymbol()
                                color: "rgba(255,255,255,0.47)",
                                width: 1
                            }
                        },
                        visualVariables: [
                            {
                                type: "size",
                                field: "CONFIRMED",
                                stops: [{value: 10, size: 5},
                                    {value: 100, size: 14},
                                    {value: 500, size: 28},
                                    {value: 1000, size: 50},
                                    {value: 5000, size: 80},
                                    {value: 10000, size: 100},
                                    {value: 50000, size: 120},
                                    {value: 1000000, size: 160}]
                            }
                        ]
                    },
                    popupTemplate: {                     // autocasts as new PopupTemplate()
                        title: "{NAME}",
                        content: `<ul>
                            <li>Confirmed: <span style="color:#FF1717;font-size:16px;font-weight:bold">{CONFIRMED}</span> </li>
                            <li>Recovered: <span style="color:#49a800;font-size:16px;font-weight:bold">{RECOVERED}</span></li>
                            <li>Death: <span style="color:white;font-size:16px;font-weight:bold">{DEATH}</span></li>
                            <li>Existing: <span style="color:#ff8c00;font-size:16px;font-weight:bold">{EXISTING}</span></li>
                        </ul>`
                    },
                    geometryType: "point",
                    objectIdField: "ObjectID",           // This must be defined when creating a layer from `Graphic` objects
                    fields: [
                        {
                            name: "ObjectID",
                            alias: "ObjectID",
                            type: "integer"
                        },
                        {
                            name: "NAME",
                            alias: "name",
                            type: "string"
                        },
                        {
                            name: "CONFIRMED",
                            alias: "confirmed",
                            type: "integer"
                        },
                        {
                            name: "RECOVERED",
                            alias: "recovered",
                            type: "integer"
                        },
                        {
                            name: "DEATH",
                            alias: "death",
                            type: "integer"
                        },
                        {
                            name: "EXISTING",
                            alias: "existing",
                            type: "integer"
                        }
                    ]
                });
                this.map.layers.add(this.featureLayer);
                this.view = new MapView({
                    container: this.mapRef.current,
                    map: this.map,
                    center: [80, 30],
                    zoom: 3
                });
            });
    }

    update(data) {
        loadModules(["esri/Graphic", "esri/geometry/Point"])
            .then(([Graphic, Point]) => {
                let graphics = data.map(function (place) {
                    return new Graphic({
                        attributes: {
                            ObjectID: place.id,
                            name: (!TString.isNull(place.state) ? (place.state + "-") : "") + place.country,
                            confirmed: place.confirmed,
                            recovered: place.recovered,
                            death: place.death,
                            existing: place.confirmed - place.recovered - place.death,
                        },
                        geometry: new Point({
                            longitude: place.longitude,
                            latitude: place.latitude
                        })
                    });
                }.bind(this));
                this.featureLayer.applyEdits({
                    deleteFeatures: this.graphics,
                    addFeatures: graphics
                }).then(function (editsResult) {
                    this.graphics = graphics;
                }.bind(this)).catch(function (error) {
                    console.error("[ applyEdits ] FAILURE: ", error.code, error.name, error.message);
                });
            });
    }

    componentWillUnmount() {
        if (this.view) {
            this.view.container = null;
        }
    }

    render() {
        return (
            <div className="webmap" ref={this.mapRef}/>
        );
    }
}

export default CMap;