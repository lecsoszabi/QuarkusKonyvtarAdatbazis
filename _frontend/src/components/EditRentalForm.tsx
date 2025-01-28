import React, { useState, useEffect } from 'react';
import { editRental, Rental } from '../services/RentalsService';

interface Props {
  rental: Rental;
  onSave: (updatedRental: Rental) => void;
}

const EditRentalForm: React.FC<Props> = ({ rental, onSave }) => {
  const [quantity, setQuantity] = useState(rental.quantity);
  const [takenOutAt, setTakenOutAt] = useState(rental.takenOutAt);
  const [broughtBackAt, setBroughtBackAt] = useState(rental.broughtBackAt || '');

  // Figyeljük a "rental" prop változását, és frissítjük az állapotot
  useEffect(() => {
    setQuantity(rental.quantity);
    setTakenOutAt(rental.takenOutAt);
    setBroughtBackAt(rental.broughtBackAt || '');
  }, [rental]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rental.id) {
      console.error('A kölcsönzés ID-ja hiányzik!');
      return;
    }
    try {
      const updatedRental = { ...rental, quantity, takenOutAt, broughtBackAt };
      await editRental(rental.id, updatedRental); // Küldjük el az Axios hívást
      onSave(updatedRental); // Visszaadjuk a frissített adatokat a szülő komponensnek
    } catch (error) {
      console.error('Hiba történt a kölcsönzés frissítése során:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Darabszám"
        required
      />
      <input
        type="datetime-local"
        value={new Date(takenOutAt).toISOString().slice(0, -1)}
        onChange={(e) => setTakenOutAt(e.target.value)}
        placeholder="Kivétel dátuma"
        required
      />
      <input
        type="datetime-local"
        value={broughtBackAt ? new Date(broughtBackAt).toISOString().slice(0, -1) : ''}
        onChange={(e) => setBroughtBackAt(e.target.value)}
        placeholder="Visszahozás dátuma"
      />
      <button type="submit">Mentés</button>
    </form>
  );
};

export default EditRentalForm;
