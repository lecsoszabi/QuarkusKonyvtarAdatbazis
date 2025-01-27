import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Book extends PanacheEntity {

    @Column(length = 100, nullable = false)
    @NotBlank
    public String title; // Title

    @Column(length = 100, nullable = false)
    @NotBlank
    public String author; // Author

    @Column(nullable = false)
    @Min(0)
    public int quantity; // Quantity

    // Getters and Setters


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
