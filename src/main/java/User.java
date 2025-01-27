import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class User extends PanacheEntity {

    @Column(length = 50, nullable = false)
    @NotBlank
    private String name; // Name

    @Column(length = 100, nullable = false)
    @NotBlank
    private String address; // Address

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
