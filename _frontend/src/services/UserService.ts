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
export const updateUser = async (id: number, user: Omit<User, 'id'>): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, user);
  return response.data;
};

// Felhasználó törlése
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
