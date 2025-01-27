import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, User } from '../services/UserService';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Hiba történt a felhasználók lekérdezésekor:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Hiba történt a felhasználó törlésekor:', error);
    }
  };

  return (
    <div>
      <h2>Felhasználók</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Cím</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
