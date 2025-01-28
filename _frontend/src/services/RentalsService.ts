import api from './api';

// Kölcsönzés típus definiálása
export interface Rental {
    id: number;
    bookId: number;
    userId: number;
    quantity: number;
    takenOutAt: string; // A kivétel dátuma mindig string
    broughtBackAt: string | null; // A visszahozás dátuma lehet string vagy null
  }


export const rentBook = async (rentalData: { bookId: number; userId: number; quantity: number }) => {
  const response = await api.post('/rentals/rent', rentalData, {
    headers: {
      'Content-Type': 'application/json', // Beállítjuk a JSON formátumot
    },
  });
  return response.data;
};

// Könyv visszahozása
export const returnBook = async (rentalId: number): Promise<void> => {
    await api.post(`/rentals/return/${rentalId}`);
  };
 
  export const getRentals = async (): Promise<Rental[]> => {
    const response = await api.get<Rental[]>('/rentals');
    return response.data;
  };

  export const editRental = async (id: number, updatedRental: Rental): Promise<Rental> => {
    const response = await api.put(`/rentals/${id}`, updatedRental);
    return response.data;
  };
  
  export const deleteRental = async (id: number): Promise<void> => {
    await api.delete(`/rentals/${id}`);
  };
  
  