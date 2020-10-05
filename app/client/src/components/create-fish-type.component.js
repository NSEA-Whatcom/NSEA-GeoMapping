// import React, { Component } from 'react';
// import axios from 'axios';

// export default class CreateFishType extends Component{
//     constructor(props){
//         super(props);

//         this.onChangeFishType = this.onChangeFishType.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             FishType: ''
//         }
//     }

//     onChangeFishType(e){
//         this.setState({
//             FishType: e.target.value
//         });
//     }

//     onSubmit(e){
//         e.preventDefault();

//         const Fish = {
//             FishType: this.state.FishType
//         }

//         console.log(Fish);

//         // send to db
//         axios.post('http://localhost:5000/fish/add', Fish)
//             .then(res => console.log(res.data))
//             .catch(err => console.log(err));

//         this.setState({
//             FishType: ''
//         });
//     }

//     render(){
//         return(
//             <div>
//                 <h3>Create New Fish Type</h3>
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <label>FishType:</label>
//                         <input 
//                             type="text"
//                             required
//                             className="form-control"
//                             value={this.state.username}
//                             onChange={this.onChangeFishType}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="submit"
//                             className="btn btn-primary"
//                             value="Create FishType"
//                         />
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }