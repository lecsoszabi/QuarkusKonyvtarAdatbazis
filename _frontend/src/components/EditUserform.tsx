import React, { useState } from 'react';
import { updateUser } from '../services/UserService';

interface Props {
  userId: number;
  currentName: string;
  currentAddress: string;
  onUserUpdated: () => void;
}

const EditUserForm: React.FC<Props> = ({ userId, currentName, currentAddress, onUserUpdated }) => {
  const [name, setName] = useState(currentName);
  const [address, setAddress] = useState(currentAddress);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(userId, { name, address });
      onUserUpdated();
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
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button type="submit">Mentés</button>
    </form>
  );
};

export default EditUserForm;
