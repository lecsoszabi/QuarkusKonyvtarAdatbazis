import React, { useEffect, useState } from 'react';
import { getRentals, editRental, Rental } from '../services/RentalsService';
import EditRentalForm from './EditRentalForm';

const RentalsList: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [editingRental, setEditingRental] = useState<Rental | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await getRentals();
        setRentals(data);
      } catch (error) {
        console.error('Hiba történt a kölcsönzések lekérdezésekor:', error);
      }
    };

    fetchRentals();
  }, []);

  const handleUpdate = async (updatedRental: Rental) => {
    try {
      const response = await editRental(updatedRental.id!, updatedRental); // Frissített kölcsönzés visszaadása
      setRentals(rentals.map((rental) => (rental.id === response.id ? response : rental))); // Állapot frissítése
      setEditingRental(null); // Bezárjuk a szerkesztési formot
    } catch (error) {
      console.error('Hiba történt a kölcsönzés frissítése során:', error);
    }
  };

  return (
    <div>
      <h2>Kölcsönzések</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Könyv ID</th>
            <th>Felhasználó ID</th>
            <th>Darabszám</th>
            <th>Kivétel Dátuma</th>
            <th>Visszavitel Dátuma</th>
            <th>Műveletek</th> {/* Új oszlop a műveletekhez */}
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td>{rental.id}</td>
              <td>{rental.bookId}</td>
              <td>{rental.userId}</td>
              <td>{rental.quantity}</td>
              <td>
                {new Date(rental.takenOutAt).toLocaleString('hu-HU', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td>
                {rental.broughtBackAt
                  ? new Date(rental.broughtBackAt).toLocaleString('hu-HU', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Nincs visszahozva'}
              </td>
              {/* Szerkesztés gomb hozzáadása */}
              <td>
                <button onClick={() => setEditingRental(rental)}>Szerkesztés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Szerkesztési form megjelenítése */}
      {editingRental && (
        <EditRentalForm rental={editingRental} onSave={handleUpdate} />
      )}
    </div>
  );
};

export default RentalsList;
