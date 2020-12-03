import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/projects" className="navbar-brand">NSEA-Project-Map</Link>
                    <div className="collapse navbar-collapse">
                        {/* home, create project, go to map */}
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/projects" className="nav-link">Projects</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/projects/create" className="nav-link">Add New Project</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Go To Map</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}