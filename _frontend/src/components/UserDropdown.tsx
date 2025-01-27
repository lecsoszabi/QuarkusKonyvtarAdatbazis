import React, { useEffect, useState } from 'react';
import { getUsers, User } from '../services/UserService';

interface Props {
  onSelectUser: (userId: number) => void;
}

const UserDropdown: React.FC<Props> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(e.target.value, 10);
    setSelectedUserId(userId);
    onSelectUser(userId);
  };

  return (
    <div>
      <label>Válassz felhasználót:</label>
      <select value={selectedUserId || ''} onChange={handleChange}>
        <option value="" disabled>
          Válassz...
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserDropdown;
