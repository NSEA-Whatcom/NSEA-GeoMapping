import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// import components
// import Navbar from "./components/navbar.component"; 
import Map from "./components/map.component";
import ProjectList from "./components/project-list.component";
import CreateProject from "./components/create-project.component";
import EditProject from "./components/edit-project.component";
import AdminLoginForm from "./components/admin.component";
// import CreateFishType from './components/create-fish-type.component';
// import CreateProjectType from './components/create-project-type.component';

import { AuthRoute, ProtectedRoute } from "./util/route";

function App() {
  return (
    <Router>
      <div>
        {/* <Navbar/> */}
        {/* <br/> */}
        <Route path="/" exact component={Map} />
        <AuthRoute path="/login" component={AdminLoginForm} />
        <ProtectedRoute path="/projects" component={ProjectList} />
        <ProtectedRoute path="/projects/edit/:id" component={EditProject} />
        <ProtectedRoute path="/projects/create" component={CreateProject} />
        {/* <Route path="/fish/create" exact component={CreateFishType} /> */}
        {/* <Route path="/projecttype/create" exact component={CreateProjectType} /> */}
      </div>
    </Router>
  );
}

export default App;
