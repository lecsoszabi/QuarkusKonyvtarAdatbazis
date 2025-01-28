import api from './api';

export interface User {
  id: number;
  name: string;
  address: string;
}

// Felhasználók lekérdezése
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

// Új felhasználó hozzáadása
export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await api.post<User>('/users', user);
  return response.data;
};

// Felhasználó frissítése
export const editUser = async (id: number, updatedUser: User): Promise<User> => {
  const response = await api.put(`/users/${id}`, updatedUser);
  return response.data; // Visszaadjuk a frissített felhasználót
};

// Felhasználó törlése
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
