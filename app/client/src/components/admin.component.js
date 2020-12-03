import React, { Component } from 'react';
import { login } from '../actions/session';
import { connect } from 'react-redux';
// import errors from '../reducers/errors/errors';

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    login: admin => dispatch(login(admin))
});

class AdminLoginForm extends Component {
    constructor(props) {
        super(props);

        // bind this to methods
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Username: '',
            Password: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            Username: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            Password: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const admin = {
            Username: this.state.Username,
            Password: this.state.Password
        }

        this.props.login(admin);
    }

    render() {
        return (
            <div>
                <div className="container buffer">
                    <h2>Admin Login</h2>
                    <p id="err-msg"></p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.Username}
                                onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.Password}
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-primary"
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLoginForm);