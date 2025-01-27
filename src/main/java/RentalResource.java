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
    @Path("/rentals")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Rental> listAllRentals() {
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
    @Consumes(MediaType.APPLICATION_JSON) //JSON formátum
    public Response rentBook(RentalRequest rentalRequest) {
        Integer bookId = rentalRequest.getBookId();
        Integer userId = rentalRequest.getUserId();
        Integer quantity = rentalRequest.getQuantity();

        if (bookId == null || userId == null || quantity == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Missing parameters").build();
        }

        Book book = Book.findById(bookId);
        if (book == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Book not found").build();
        }

        User user = User.findById(userId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }

        if (book.getQuantity() < quantity) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Not enough books available").build();
        }

        Rental rental = new Rental();
        rental.setBookId(bookId);
        rental.setUserId(userId);
        rental.setQuantity(quantity);
        rental.setTakenOutAt(LocalDateTime.now());

        book.setQuantity(book.getQuantity() - quantity);

        rental.persist();
        book.persist();

        return Response.status(Response.Status.CREATED).entity(rental).build();
    }



    // Könyv visszahozása
    @POST
    @Path("/return/{rentalId}")
    @Transactional
    public Response returnBook(@PathParam("rentalId") Integer rentalId) {
        // Kölcsönzés keresése ID alapján
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
            book.persist(); // Könyv frissítése az adatbázisban
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Book not found for this rental").build();
        }

        // A meglévő kölcsönzés frissítése (nem hozunk létre újat!)
        return Response.ok(rental).build();
    }

}
