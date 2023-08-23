import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import Sidebar from "../sidebar/sidebar";
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

    return (
        <div className="list">
          <Sidebar />
    
          <div className="qrcode-list">
            <h2>All Customers</h2>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
              {users.map((user ) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.country}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

export default AllCustomers;