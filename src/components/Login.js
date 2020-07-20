import React, { Component } from "react";
import { login, clearAuthState } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  componentWillUnmount()
  {
    this.props.dispatch(clearAuthState());
  }
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("this.state", this.state);
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };
  render() {
    const {error, inProgress,isLoggedin} = this.props.auth;
    const {from}= this.props.location.state || {from :{pathname: '/'}}; 
    console.log(" I AM in the Login Comp", this.props.location);

    if(isLoggedin)
    {
      return <Redirect to={from}></Redirect>
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
    {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field">
          {inProgress ? <button onClick={this.handleFormSubmit}  disabled={inProgress}>Logging In....</button>
         :  <button onClick={this.handleFormSubmit}  disabled={inProgress}>Log In</button> 
        
        }
          
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
