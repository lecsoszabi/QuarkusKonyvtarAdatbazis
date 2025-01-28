import React, { useState, useEffect } from 'react';
import { editUser, User } from '../services/UserService';

interface Props {
  user: User;
  onSave: (updatedUser: User) => void;
}

const EditUserForm: React.FC<Props> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);

  // Figyeljük a "user" prop változását, és frissítjük az állapotot
  useEffect(() => {
    setName(user.name);
    setAddress(user.address);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.id) {
      console.error('A felhasználó ID-ja hiányzik!');
      return;
    }
    try {
      const updatedUser = { ...user, name, address };
      await editUser(user.id, updatedUser); // Küldjük el az Axios hívást
      onSave(updatedUser); // Visszaadjuk a frissített adatokat a szülő komponensnek
    } catch (error) {
      console.error('Hiba történt a felhasználó frissítése során:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Név"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Cím"
        required
      />
      <button type="submit">Mentés</button>
    </form>
  );
};

export default EditUserForm;
