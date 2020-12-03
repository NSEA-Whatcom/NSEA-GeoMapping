import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from 'axios';
import { connect } from 'react-redux';


// icons
import SchoolName from '../assets/SchoolName.svg';
import FishPassageBarrier from '../assets/FishPassageBarrier.svg';
import FieldTripSite from '../assets/FieldTripSite.svg';
import LargeWoodyDebris from '../assets/LargeWoodyDebris.svg';
import RiparianPlanting from '../assets/RiparianPlanting.svg';

// configures for .env files
require('dotenv').config();

// Mapbox Api Key
const mapboxApiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
// Mapbox Style
const mapboxStyle = process.env.REACT_APP_MAP_STYLE;

// map state to props for redux store
const mapStateToProps = ({ session }) => ({
    session
});

class Map extends Component{
    constructor(props){
        super(props)

        // bind this to methods
        // this.onChangeFishType = this.onChangeFishType.bind(this);
        this.svgSelector = this.svgSelector.bind(this);

        this.state = {
            viewport: {
                width: "100vw",
                height: "100vh",
                latitude: 48.796827,
                longitude: -122.126277,
                zoom: 10
            },
            // keep track of selected project on map 
            SelectedProject: null,
            // array populated with all projects from the database
            Projects: [],
        }
    }

    componentDidMount(){
        // get list of projects
        axios.get('http://localhost:5000/projects/')
            .then(res => {
                if (res.data.length > 0){
                    this.setState({
                        Projects: res.data
                    })
                }
            })
            .catch(err => console.log(err));

        // get list of fish types for sorting dropdown box
        // axios.get('http://localhost:5000/fish/')
        //     .then(res => {
        //         if (res.data.length > 0){
        //             this.setState({
        //                 FishTypes: res.data.map(fish => fish.FishType),
        //                 FishType: res.data[0].FishType
        //             })
        //         }
        //     })
        //     .catch(err => console.log(err));
    }

    // onChangeFishType(e){
    //     this.setState({
    //         FishType: e.target.value
    //     })
    // }

    // svg selector function
    svgSelector(projectType = "FishPassageBarrier"){
        // given the project type select the corresponding svg
        // svgs are imported into the map component at the top 
        // default is fishPassageBarrier
        // returns svg corresponding to the project types

        let svg = null;
    
        switch (projectType){
            case "FieldTripSite":
                svg = FieldTripSite;
                break;
            case "RiparianPlanting":
                svg = RiparianPlanting;
                break;
            case "SchoolName":
                svg = SchoolName;
                break;
            case "LargeWoodyDebris":
                svg = LargeWoodyDebris;
                break;
            case "FishPassageBarrier":
                svg = FishPassageBarrier;
                break;
            default:
                svg = FishPassageBarrier;
        }

        return svg;
    }

    render(){
        return(
            <div className="map">
                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    mapboxApiAccessToken={mapboxApiKey}
                    mapStyle={mapboxStyle}
                >
                    {/* markers for each project */}
                    {this.state.Projects.map(project => {
                        return <Marker key={project._id} latitude={project.Latitude} longitude={project.Longitude}>
                            <button 
                            className="marker-btn" 
                            // on click of project, set the current selected project
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                    SelectedProject: project,
                                })
                            }}
                            >
                                <img src={this.svgSelector(project.ProjectType)} alt={project.ProjectType} />
                            </button>
                        </Marker>
                    })}

                    {this.state.SelectedProject ? (
                        <Popup 
                        latitude={this.state.SelectedProject.Latitude} 
                        longitude={this.state.SelectedProject.Longitude}
                        onClose={() => {
                            this.setState({
                                SelectedProject: null,
                            });
                        }}
                        >
                            <div>
                                <h3>{this.state.SelectedProject.PlaceName}</h3>
                                <p>{this.state.SelectedProject.ProjectDescription}</p>
                    <a href={this.state.SelectedProject.ProjectUrl} rel="noopener noreferrer" target="_blank">{this.state.SelectedProject.ProjectUrl}</a><p>Project Date: 2016</p>
                            </div>
                        </Popup>
                    ) : null}
                </ReactMapGL>
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(Map);