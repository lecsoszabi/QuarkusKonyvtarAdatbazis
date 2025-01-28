import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, editUser, User } from '../services/UserService';
import EditUserForm from './EditUserForm';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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
      setUsers(users.filter((user) => user.id !== id)); // Törölt felhasználó eltávolítása
    } catch (error) {
      console.error('Hiba történt a felhasználó törlésekor:', error);
    }
  };

  const handleUpdate = async (updatedUser: User) => {
    try {
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user))); // Frissítjük az állapotot
      setEditingUser(null); // Bezárjuk a szerkesztési formot
    } catch (error) {
      console.error('Hiba történt a felhasználó frissítése során:', error);
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
                <button onClick={() => handleDelete(user.id!)}>Törlés</button>
                <button onClick={() => setEditingUser(user)}>Szerkesztés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Szerkesztési form megjelenítése */}
      {editingUser && (
        <EditUserForm user={editingUser} onSave={handleUpdate} />
      )}
    </div>
  );
};
export default UsersList;
