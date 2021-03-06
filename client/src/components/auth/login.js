import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {

    state = {
        name: '',
        email:'',
        password: '',
        password2:'',
        errors:{}
    }
 
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    };

    onSubmit = this.onSubmit.bind(this);

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('./dashboard')
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null
  }
 
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }
    if (this.props.auth.isAuthenticated) {
      this.setState({ isAuthenticated: this.props.auth.isAuthenticated })
      this.props.history.push('/dashboard');
    }
  }


    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        //console.log(user);
        this.props.loginUser(userData);
    }

  render() {

    const {errors} = this.state;

    return (
    <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="email" className={errors.email ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="Email Address" name="email"  value={this.state.email}  onChange = { (e)=> { this.onChangeHandler(e)} } />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="form-group">
                  <input type="password" className={errors.password ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="Password" name="password"    value={this.state.password}  onChange = { (e)=> { this.onChangeHandler(e)} }/>
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

//export default Login;
export default connect(mapStateToProps, { loginUser })(Login);
