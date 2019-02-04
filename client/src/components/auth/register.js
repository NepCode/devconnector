import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {

    //old way
    /* constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    } */

    //onChange={this.onChange} to inputs

    state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors:{}
    };

    
 
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
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
    }

    

    onSubmit(e) {

        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };

        this.props.registerUser(newUser, this.props.history);
        //console.log(newUser);
        //axios.post('/api/users/register',newUser)
        //.then(res => console.log(res.data) )
        //.catch(err => console.log(err.response.data) )
        //.catch(err => console.log({ errors: err.response.data }) )
        //.catch(err => this.setState({ errors: err.response.data }) );
    }

  render() {
    const { errors } = this.state;
    //const errors = this.state.errors;

    //destructuring const { email, firstname, lastname } = this.state; 

    /*no destructuring 
    const email = this.state.email, 
    const firstname: this.state.firstname,
    const lastname: this.state.lastname
 */

    return (
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>

              <form noValidate  onSubmit={this.onSubmit}>

                <div className="form-group">
                  <input type="text" className={errors.name ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="Name" name="name" value={this.state.name}    onChange = { (e)=> { this.onChangeHandler(e)} }   />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>

                <div className="form-group">
                  <input type="email" className={errors.email ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="Email Address" name="email" value={this.state.email} onChange = { (e)=> { this.onChangeHandler(e)}} />
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                <div className="form-group">
                  <input type="password" className={errors.password ? "form-control form-control-clg is-invalid" : "form-control form-control-lg"} placeholder="Password" name="password" value={this.state.password} onChange = { (e)=> { this.onChangeHandler(e)}} />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                <div className="form-group">
                  <input type="password" className={errors.password2 ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="Confirm Password" name="password2" value={this.state.password2} onChange = { (e)=> { this.onChangeHandler(e)}} />
                  <div className="invalid-feedback">{errors.password2}</div>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

//export default Register;
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
