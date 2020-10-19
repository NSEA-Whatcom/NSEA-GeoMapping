import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar.component';
import { connect } from 'react-redux';
import { logout } from '../actions/session';

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

// functional React component
// called in projectList method
const Project = props => (
    <tr>
        <td>{props.project.ProjectType}</td>
        <td>{props.project.PlaceName}</td>
        <td>{props.project.Latitude}</td>
        <td>{props.project.Longitude}</td>
        <td>{props.project.ProjectDescription}</td>
        <td>{props.project.ProjectUrl}</td>
        <td>{props.project.Year}</td>
        {/* <td>{ props.project.FunFact }</td>
        <td>{ props.project.FishType }</td> */}
        <td>
            <span>
                <Link to={"/projects/edit/" + props.project._id}>edit</Link> | <button className="btn btn-danger" onClick={() => { props.deleteProject(props.project._id) }}>delete</button>
            </span>
        </td>
    </tr>
)

class ProjectList extends Component {
    constructor(props) {
        super(props);

        this.deleteProject = this.deleteProject.bind(this);

        this.state = {
            projects: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/projects/')
            .then(res => {
                // populate projects array with projects from the database
                this.setState({ projects: res.data })
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteProject(id) {
        // delete from db
        axios.delete('http://localhost:5000/projects/' + id)
            .then(res => console.log(res.data));

        // remove from state array
        this.setState({
            projects: this.state.projects.filter(elem => elem._id !== id)
        });
    }

    projectList() {
        return this.state.projects.map(currentProject => {
            return <Project
                project={currentProject}
                deleteProject={this.deleteProject}
                key={currentProject._id}
            />
        });
    }

    render() {
        return (
            <div>
                <Navbar />
                <button className="btn-primary" onClick={this.props.logout}>Logout</button>
                <div className="container">
                    <h3>Projects</h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Project Type</th>
                                <th>Creek Name</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Project Description</th>
                                <th>Project Url</th>
                                <th>Actions</th>
                                <th>Year</th>
                                {/* <th>Fun Fact</th>
                            <th>Fish Type</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.projectList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectList);