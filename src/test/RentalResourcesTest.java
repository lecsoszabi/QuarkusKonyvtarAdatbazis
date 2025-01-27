import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class RentalResourceTest {

    @Test
    public void testReturnBook() {
        // 1. Könyv kölcsönzése
        given()
                .queryParam("bookId", 101)
                .queryParam("userId", 2)
                .queryParam("quantity", 2)
                .when()
                .post("/rentals/rent")
                .then()
                .statusCode(201); // Sikeres kölcsönzés

        // 2. Könyv visszahozása
        given()
                .when()
                .post("/rentals/return/2") // Kölcsönzés ID = 1
                .then()
                .statusCode(200) // Sikeres visszahozás
                .body("broughtBackAt", notNullValue()); // Ellenőrizzük, hogy a visszahozás dátuma frissült

        // 3. Ellenőrizzük, hogy a könyv darabszáma helyesen frissült
        given()
                .when()
                .get("/books/101") // Könyv ID = 1
                .then()
                .statusCode(200)
                .body("quantity", equalTo(10)); // Feltételezzük, hogy eredetileg 10 darab volt
    }
    @Test
    public void testReturnBookTwice() {
        given()
                .when()
                .post("/rentals/return/1")
                .then()
                .statusCode(400) // Hibás kérés
                .body("error", equalTo("Rental already returned"));
    }

    @Test
    public void testReturnNonExistentRental() {
        given()
                .when()
                .post("/rentals/return/9999") // Nem létező ID
                .then()
                .statusCode(404); // Nem található
    }


}
