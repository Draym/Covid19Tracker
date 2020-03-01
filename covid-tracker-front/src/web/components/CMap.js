import React, {Component} from 'react';
import {loadModules} from 'esri-loader';
import TString from "../../utils/TString";

class CMap extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/FeatureLayer", "esri/core/promiseUtils", "esri/Graphic", "esri/geometry/Point"], {css: true})
            .then(([Map, MapView, FeatureLayer, promiseUtils, Graphic, Point]) => {
                const map = new Map({
                    basemap: 'gray-vector'
                });

                let graphics = this.props.data.map(function (place) {
                    return new Graphic({
                        attributes: {
                            ObjectId: place.id,
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
                });

                let featureLayer = new FeatureLayer({
                    source: graphics,
                    renderer: {
                        type: "simple",                    // autocasts as new SimpleRenderer()
                        symbol: {                          // autocasts as new SimpleMarkerSymbol()
                            type: "simple-marker",
                            color: "rgba(195,9,0,0.76)",
                            size: "20px",
                            outline: {                       // autocasts as new SimpleLineSymbol()
                                color: "rgba(255,255,255,0.47)",
                                width: 1
                            }
                        }
                    },
                    popupTemplate: {                     // autocasts as new PopupTemplate()
                        title: "{NAME}",
                        content: `<ul>
                            <li>Confirmed: {CONFIRMED} </li>
                            <li>Recovered: {RECOVERED}</li>
                            <li>Death: {DEATH}</li>
                            <li>Existing: {EXISTING}</li>
                        </ul>`
                    },
                    geometryType: "point",
                    objectIdField: "ObjectID",           // This must be defined when creating a layer from `Graphic` objects
                    fields: [
                        {
                            name: "ObjectID",
                            alias: "ObjectID",
                            type: "oid"
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

                map.layers.add(featureLayer);

                this.view = new MapView({
                    container: this.mapRef.current,
                    map: map,
                    center: [80, 30],
                    zoom: 3
                });
            });
    }

    componentWillUnmount() {
        if (this.view) {
            // destroy the map view
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