import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.transaction.Transactional;

import java.util.List;

@Path("/books")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BookResource {

    @GET
    public List<Book> listAllBooks() {
        return Book.listAll();
    }

    @GET
    @Path("/{id}")
    public Response getBookById(@PathParam("id") Integer id) {
        Book book = Book.findById(id);
        if (book == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Book not found").build();
        }
        return Response.ok(book).build();
    }
    //teszt arra hogy 8 orakor feltöltödnek e a konyvek

    @Inject
    BookDonationScheduler bookDonationScheduler;

    @GET
    @Path("/simulate-donation")
    public void simulateDonation() throws InterruptedException {
        bookDonationScheduler.generateBookDonations();
    }
    // ezt

    @Inject
    BookService bookService; // A service osztály injektálása

    @GET
    @Path("/donations") // Az adományok összegzéséhez tartozó végpont
    public List<BookDonationSummary> getDonationSummary() {
        return bookService.getDonationSummary(); // Meghívja a service metódust
    }

    @POST
    @Transactional
    public Response addBook(Book book) {
        if (book.quantity <= 0) {
            return Response.status(Response.Status.BAD_REQUEST).entity("0 könyvet nem lehet hozzáadni").build();
        }
        book.persist();
        return Response.status(Response.Status.CREATED).entity(book).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateBook(@PathParam("id") Integer id, Book updatedBook) {
        Book book = Book.findById(id);
        if (book == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Book not found").build();
        }

        if (updatedBook.getTitle() == null || updatedBook.getAuthor() == null || updatedBook.getQuantity() == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Missing required fields").build();
        }

        book.title = updatedBook.title;
        book.author = updatedBook.author;
        book.quantity = updatedBook.quantity;
        book.persist();

        return Response.ok(book).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteBook(@PathParam("id") Integer id) {
        Book book = Book.findById(id);
        if (book == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        book.delete();
        return Response.noContent().build();
    }


}

