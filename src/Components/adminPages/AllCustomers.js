import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import Sidebar from "../sidebar/sidebar";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AllCustomers = () => {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersByRole();
  }, []);
  const fetchUsersByRole = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/users/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {

    e.preventDefault()
    setErrorMessage(null)
    if (password.length < 4) {
      setErrorMessage('The password must contain at least 4 characters');
      return;
    }
    if (password !== reEnterPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (phoneNumber.length < 8) {
      setErrorMessage('Phone number invalid')
      return;
    }
    try {
      const response = await axios.post('http://localhost:5002/api/auth/register', {
        firstname,
        lastname,
        email,
        password,
        reEnterPassword,
        phoneNumber,
        country,
      });

      const user = response.data;
      console.log('User saved:', user);
      setSuccessMessage(response.data.message)
      setErrorMessage(null)


    } catch (error) {
      setErrorMessage(error.response.data.message);
      setSuccessMessage(null)
      console.log(error.response.data);
      console.error('Error while registering:', error.response.data);
    }
  }


  return (
    <div className="list">
      <Sidebar />

      <div className="qrcode-list">
        <h2>All Customers</h2>
        <div style={{ display: "flex" }}>
          <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#myModal"
            style={{ marginLeft: "auto" }}>
            Add new customer
          </button>
        </div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add new customer</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {errorMessage &&
                  <div class="alert alert-danger alert-dismissible fade show">
                    <strong>{errorMessage}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" onClick={() => setErrorMessage(null)}  ></button>
                  </div>
                }
                {successMessage &&
                  <div className="alert alert-success alert-dismissible fade show">
                    <strong>{successMessage}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                  </div>
                }
                <form onSubmit={handleSubmit}>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">First and last name</span>
                    </div>
                    <input type="text" aria-label="First name" value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required class="form-control" />
                    <input type="text" aria-label="Last name" name="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required class="form-control" />
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Email</span>
                    </div>
                    <input type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required class="form-control" />

                  </div>
                  <div class="input-group  mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Password</span>
                    </div>
                    <input type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      class="form-control" id="password" />
                  </div>
                  <div class="input-group  mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Reenter password</span>
                    </div>
                    <input type="password"
                      name="reEnterPassword"
                      value={reEnterPassword}
                      onChange={(e) => setReEnterPassword(e.target.value)}
                      required
                      class="form-control" />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Phone number</span>
                    </div>
                    <input type="text"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                      required
                      class="form-control" />
                  </div>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Country</span>
                    </div>
                    <input type="text"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      class="form-control" />
                  </div>

                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary">Enregistrer les modifications</button>
              </div>
            </div>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.country}</td>
                <td >
                  <div class="d-grid gap-2 d-md-block">
                    <Link to="" className="btn btn-success">
                      Update
                    </Link>&nbsp;
                    <button type="button" class="btn btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default AllCustomers;