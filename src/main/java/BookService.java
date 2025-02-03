import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@ApplicationScoped
public class BookService {

    private final ConcurrentHashMap<String, Integer> bookSummary = new ConcurrentHashMap<>();

    @Transactional
    public void saveBooks(List<Book> books) {
        // Bulk
        Book.persist(books);

        books.forEach(book -> {
            String key = book.getTitle() + " - " + book.getAuthor();
            bookSummary.merge(key, book.getQuantity(), Integer::sum);
        });
    }
    public List<BookDonationSummary> getDonationSummary() {
        return bookSummary.entrySet().stream()
                .map(e -> {
                    String[] parts = e.getKey().split(" - ");
                    return new BookDonationSummary(parts[0], parts[1], e.getValue());
                })
                .collect(Collectors.toList());
    }
}
