import React, { useState } from 'react';
import { addUser } from '../services/UserService';

interface Props {
  onUserAdded: () => void;
}

const AddUserForm: React.FC<Props> = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser({ name, address });
      onUserAdded();
      setName('');
      setAddress('');
    } catch (error) {
      console.error('Hiba történt a felhasználó hozzáadása során:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Név"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cím"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button type="submit">Felhasználó hozzáadása</button>
    </form>
  );
};

export default AddUserForm;
