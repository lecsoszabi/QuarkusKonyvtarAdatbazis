import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.List;

@Path("/rentals")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RentalResource {

    // Összes kölcsönzés listázása
    @GET
    public List<Rental> listAll() {
        return Rental.listAll();
    }

    @GET
    @Path("/{id}")
    public Response getRentalById(@PathParam("id") Integer id) {
        Rental rental = Rental.findById(id);
        if (rental == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Rental not found").build();
        }
        return Response.ok(rental).build();
    }

    // Könyv kölcsönzése
    @POST
    @Path("/rent")
    @Transactional
    public Response rentBook(@QueryParam("bookId") Integer bookId,
                             @QueryParam("userId") Integer userId,
                             @QueryParam("quantity") Integer quantity) {
        // Ellenőrizzük, hogy a könyv és a felhasználó létezik-e
        Book book = Book.findById(bookId);
        User user = User.findById(userId);

        if (book == null || user == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid book or user ID").build();
        }

        // Ellenőrizzük, hogy van-e elég példány a könyvből
        if (book.getQuantity() < quantity) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Not enough books available").build();
        }

        // Frissítjük a könyv darabszámát
        book.setQuantity(book.getQuantity() - quantity);
        book.persist();

        // Létrehozzuk a kölcsönzést
        Rental rental = new Rental();
        rental.setBookId(bookId);
        rental.setUserId(userId);
        rental.setQuantity(quantity);
        rental.setTakenOutAt(LocalDateTime.now());

        rental.persist();

        return Response.status(Response.Status.CREATED).entity(rental).build();
    }

    // Könyv visszahozása
    @POST
    @Path("/return/{rentalId}")
    @Transactional
    public Response returnBook(@PathParam("rentalId") Integer rentalId) {
        Rental rental = Rental.findById(rentalId);

        if (rental == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Rental not found").build();
        }

        if (rental.getBroughtBackAt() != null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Rental already returned").build();
        }

        // Frissítsük a visszahozás dátumát
        rental.setBroughtBackAt(LocalDateTime.now());

        // Növeljük a könyv darabszámát az adatbázisban
        Book book = Book.findById(rental.getBookId());
        if (book != null) {
            book.setQuantity(book.getQuantity() + rental.getQuantity());
            book.persist(); // Ez biztosítja, hogy az adatbázis frissüljön
        }

        rental.persist();

        return Response.ok(rental).build();
    }

}
