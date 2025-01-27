import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
public class Rental extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // Id

    @Column(nullable = false)
    private Integer bookId; // BookId

    @Column(nullable = false)
    private Integer userId; // UserId

    @Column(nullable = false)
    @Min(1)
    private Integer quantity; // Quantity

    @Column(nullable = false)
    private LocalDateTime takenOutAt; // TakenOutAt

    @Column(nullable = true)
    private LocalDateTime broughtBackAt; // BroughtBackAt

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getTakenOutAt() {
        return takenOutAt;
    }

    public void setTakenOutAt(LocalDateTime takenOutAt) {
        this.takenOutAt = takenOutAt;
    }

    public LocalDateTime getBroughtBackAt() {
        return broughtBackAt;
    }

    public void setBroughtBackAt(LocalDateTime broughtBackAt) {
        this.broughtBackAt = broughtBackAt;
    }
}
