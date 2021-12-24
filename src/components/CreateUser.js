import React, { Component } from "react";
import UserService from "../services/UserService";

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: "",
      email: "",
      password: "",
      loading: false,
    };

    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordlHandler = this.changePasswordlHandler.bind(this);

    this.addUser = this.addUser.bind(this);
  }
  addUser = (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    let user = {
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password,

    };
    // console.log("user => " + JSON.stringify(user));
    if (this.state.phone) {
      if (this.state.email && this.state.email) {
        if (this.state.password) {

          UserService.createUser(user).then((res) => {
            this.setState({ loading: false })
            this.props.history.push("/dashboard");
          });

        } else {
          alert('enter a valid password !')
          this.setState({ loading: false })
        }

      } else {
        alert('please enter a valid email ')
        this.setState({ loading: false })
      }

    } else {
      alert('please enter phone')
      this.setState({ loading: false })
    }


  };

  changePhoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  changePasswordlHandler = (event) => {
    this.setState({ password: event.target.value });
  };


  cancel() {
    this.props.history.push("/login");
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="container"
          style={{ marginTop: "15px", padding: "50px" }}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center" style={{ margin: "15px" }}> Register</h3>
              <div className="card-body">
                <form>
                  <div className="container">
                    <div className="form-group">

                      <label style={{ marginTop: "10px" }}> Email </label>
                      <div className="col-sm-12">
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                      </div>

                      <label style={{ marginTop: "10px" }}> Phone</label>
                      <div className="col-sm-12">
                        <input placeholder=" " type="number" name="phone" className="form-control" value={this.state.phone} onChange={this.changePhoneHandler} />
                      </div>

                      <label style={{ marginTop: "10px" }}> Password </label>
                      <div className="col-sm-12">
                        <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordlHandler} />
                      </div>
                    </div>
                    <div className="form-row text-center" style={{ marginTop: "12px" }}>
                      <div className="col-12">
                        <button className="btn btn-success" onClick={this.addUser} disabled={this.state.loading}>
                          {this.state.loading && <div class="spinner-border text-light" role="status"></div>}
                          Register
                        </button>

                        <button className="btn btn-danger" 
                        onClick={this.cancel.bind(this)} style={{ margin: "22px" }}>Cancel</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateUser