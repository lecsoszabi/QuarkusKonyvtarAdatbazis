import api from './api';

// Könyv típus definiálása
export interface Book {
  id?: number;
  title: string;
  author: string;
  quantity: number;
}

// Könyvek lekérdezése
export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get('/books');
  return response.data;
};

// Új könyv hozzáadása
export const addBook = async (book: Book): Promise<Book> => {
  const response = await api.post('/books', book);
  return response.data;
};

// Könyv szerkesztése
export const editBook = async (id: number, updatedBook: Book): Promise<Book> => {
  const response = await api.put(`/books/${id}`, updatedBook);
  return response.data;
}; 
// Könyv törlése
export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};

export interface BookDonationSummary {
  title: string;
  author: string;
  quantity: number;
}

export const getDonationSummary = async (): Promise<BookDonationSummary[]> => {
  const response = await fetch('http://localhost:8080/books/donations');
  if (!response.ok) {
    throw new Error(`Hiba történt az API hívás során: ${response.statusText}`);
  }
  return response.json();
};

export const simulateDonation = async (): Promise<void> => {
  const response = await fetch('http://localhost:8080/books/simulate-donation', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`Hiba történt az adomány szimuláció során: ${response.statusText}`);
  }
};

