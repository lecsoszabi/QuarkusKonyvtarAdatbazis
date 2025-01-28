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
