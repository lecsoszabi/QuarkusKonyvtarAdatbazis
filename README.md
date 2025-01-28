# React + TypeScript + Vite + Quarkus Backend

Ez a projekt egy teljes körű alkalmazást valósít meg, amely tartalmaz egy **React** frontendet (TypeScript-tel és Vite-tel) és egy **Quarkus** alapú backendet. A projekt célja egy könyvkölcsönző rendszer létrehozása, amely lehetővé teszi a könyvek, felhasználók és kölcsönzések kezelését (CRUD műveletek: létrehozás, olvasás, frissítés, törlés).

---

## **Frontend (React + TypeScript)**

A frontend a React keretrendszert használja TypeScript és Vite segítségével. A projekt támogatja a Hot Module Replacement-et (HMR) és az ESLint szabályokat.

### **Főbb funkciók**
1. **Könyvek kezelése**:
   - Könyvek listázása.
   - Könyvek hozzáadása.
   - Könyvek szerkesztése.
   - Könyvek törlése.

2. **Felhasználók kezelése**:
   - Felhasználók listázása.
   - Felhasználók hozzáadása.
   - Felhasználók szerkesztése.
   - Felhasználók törlése.

3. **Kölcsönzések kezelése**:
   - Kölcsönzések listázása.
   - Kölcsönzések létrehozása.
   - Kölcsönzések szerkesztése.
   - Kölcsönzések törlése.

---

### **Frontend fájlstruktúra**

#### **`src/services`**
- `BooksService.ts`: Könyvekkel kapcsolatos API hívások (`getBooks`, `addBook`, `editBook`, `deleteBook`).
- `UserService.ts`: Felhasználókkal kapcsolatos API hívások (`getUsers`, `addUser`, `editUser`, `deleteUser`).
- `RentalsService.ts`: Kölcsönzésekkel kapcsolatos API hívások (`getRentals`, `addRental`, `editRental`, `deleteRental`).

#### **`src/components`**
- **Könyvek**:
  - `BooksList.tsx`: Könyvek listázása táblázatos formában.
  - `AddBookForm.tsx`: Új könyv hozzáadása.
  - `EditBookForm.tsx`: Könyv szerkesztési űrlap.
- **Felhasználók**:
  - `UsersList.tsx`: Felhasználók listázása táblázatos formában.
  - `AddUserForm.tsx`: Új felhasználó hozzáadása.
  - `EditUserForm.tsx`: Felhasználó szerkesztési űrlap.
- **Kölcsönzések**:
  - `RentalsList.tsx`: Kölcsönzések listázása táblázatos formában.
  - `AddRentalForm.tsx`: Új kölcsönzés hozzáadása.
  - `EditRentalForm.tsx`: Kölcsönzés szerkesztési űrlap.

---

### **Frontend funkciók részletei**

#### **1. Könyvek kezelése**
- **Listázás**:
  ```tsx
  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);
  ```
- **Hozzáadás**:
  ```tsx
  const handleAddBook = async (newBook: Book) => {
    await addBook(newBook);
    fetchBooks(); // Lista frissítése
  };
  ```
- **Szerkesztés**:
  ```tsx
  const handleEditBook = async (updatedBook: Book) => {
    await editBook(updatedBook.id!, updatedBook);
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
  };
  ```
- **Törlés**:
  ```tsx
  const handleDeleteBook = async (id: number) => {
    await deleteBook(id);
    setBooks(books.filter((book) => book.id !== id));
  };
  ```

#### **2. Felhasználók kezelése**
- Azonos logikát követ, mint a könyveknél: listázás, hozzáadás, szerkesztés, törlés.

#### **3. Kölcsönzések kezelése**
- Azonos logikát követ, mint a könyveknél: listázás, hozzáadás, szerkesztés, törlés.

---

## **Backend (Quarkus)**

A backend a Quarkus keretrendszerre épül, amely egy könnyű és gyors Java-alapú platform. A backend REST API-kat biztosít a frontend számára.

### **Főbb funkciók**
1. Könyvek kezelése (`/books`):
   - GET `/books`: Könyvek listázása.
   - POST `/books`: Új könyv hozzáadása.
   - PUT `/books/{id}`: Könyv frissítése.
   - DELETE `/books/{id}`: Könyv törlése.

2. Felhasználók kezelése (`/users`):
   - GET `/users`: Felhasználók listázása.
   - POST `/users`: Új felhasználó hozzáadása.
   - PUT `/users/{id}`: Felhasználó frissítése.
   - DELETE `/users/{id}`: Felhasználó törlése.

3. Kölcsönzések kezelése (`/rentals`):
   - GET `/rentals`: Kölcsönzések listázása.
   - POST `/rentals`: Új kölcsönzés létrehozása.
   - PUT `/rentals/{id}`: Kölcsönzés frissítése.
   - DELETE `/rentals/{id}`: Kölcsönzés törlése.

---

### **Backend fájlstruktúra**

- **Entitások**:
  - `Book.java`
  - `User.java`
  - `Rental.java`
- **Erőforrások (REST API-k)**:
  - `BookResource.java`
  - `UserResource.java`
  - `RentalResource.java`

---

### **Backend funkciók részletei**

#### **1. Könyvek kezelése**
- Példa a könyvek frissítésére szolgáló PUT végpontra:
```java
@PUT
@Path("/{id}")
@Transactional
public Response updateBook(@PathParam("id") Integer id, Book updatedBook) {
    Book book = Book.findById(id);
    if (book == null) {
        return Response.status(Response.Status.NOT_FOUND).entity("Book not found").build();
    }
    book.title = updatedBook.title;
    book.author = updatedBook.author;
    book.quantity = updatedBook.quantity;
    book.persist();
    return Response.ok(book).build();
}
```

#### **2. Felhasználók kezelése**
- Példa a felhasználók törlésére szolgáló DELETE végpontra:
```java
@DELETE
@Path("/{id}")
@Transactional
public Response deleteUser(@PathParam("id") Integer id) {
    User user = User.findById(id);
    if (user == null) {
        return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
    }
    user.delete();
    return Response.noContent().build();
}
```

#### **3. Kölcsönzések kezelése**
- Példa a kölcsönzések frissítésére szolgáló PUT végpontra:
```java
@PUT
@Path("/{id}")
@Transactional
public Response updateRental(@PathParam("id") Integer id, Rental updatedRental) {
    Rental rental = Rental.findById(id);
    if (rental == null) {
        return Response.status(Response.Status.NOT_FOUND).entity("Rental not found").build();
    }
    rental.quantity = updatedRental.quantity;
    rental.takenOutAt = updatedRental.takenOutAt;
    rental.broughtBackAt = updatedRental.broughtBackAt;
    rental.persist();
    return Response.ok(rental).build();
}
```

---

## **Telepítés**

### Frontend telepítése és futtatása:
1. Telepítsd a függőségeket:
   ```bash
   npm install
   ```
2. Indítsd el a fejlesztési szervert:
   ```bash
   npm start
   ```

### Backend telepítése és futtatása:
1. Indítsd el a Quarkus fejlesztési szervert:
   ```bash
   ./mvnw quarkus:dev
   ```

---

## **Tesztelés**

1. Teszteld az API-kat Postman-nel vagy cURL-lel.
2. Ellenőrizd a frontend működését böngészőben.

---

Ezzel az alkalmazás teljes körűen működik, beleértve a könyvek, felhasználók és kölcsönzések kezelését is! 😊