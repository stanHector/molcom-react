import axios from "axios";

class UserService {
  createUser(user) {
    return axios.post("https://molcom-server.herokuapp.com/api/auth/signup", user);
  }

  loginUser(user) {
    return axios.post("https://molcom-server.herokuapp.com/api/auth/signin", user)
  }
}
export default new UserService();
