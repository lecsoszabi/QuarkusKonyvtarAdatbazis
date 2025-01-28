import React, { useState } from 'react';
import { editUser, User } from '../services/UserService';

interface Props {
  user: User;
  onSave: () => void;
}

const EditUserForm: React.FC<Props> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editUser(user.id, { ...user, name, address });
      onSave();
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
