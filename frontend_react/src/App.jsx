import { useEffect, useState } from "react";
import { getUser } from "./index";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const panggilData = async () => {
      const hasil = await getUser();

      console.log("HASIL:", hasil);

      if (hasil) {
        setUsers(hasil);
      }
    };

    panggilData();
  }, []);

  return (
    <div className="table">
      <table className="border-teal-300">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.nama}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
