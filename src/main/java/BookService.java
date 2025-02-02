import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class BookService {

    private final Map<String, Integer> bookSummary = new HashMap<>(); // Összegzés tárolása

    // Könyvek mentése és összegzés frissítése
    @Transactional
    public void saveBooks(List<Book> books) {
        for (Book book : books) {
            book.persist();

            // Összegzés frissítése
            String key = book.title + " - " + book.author;
            synchronized (bookSummary) {
                bookSummary.put(key, bookSummary.getOrDefault(key, 0) + book.quantity);
            }
        }
    }

    // Összegzett adatok lekérése
    public List<BookDonationSummary> getDonationSummary() {
        synchronized (bookSummary) {
            List<BookDonationSummary> summaryList = new ArrayList<>();
            for (Map.Entry<String, Integer> entry : bookSummary.entrySet()) {
                String[] parts = entry.getKey().split(" - ");
                summaryList.add(new BookDonationSummary(parts[0], parts[1], entry.getValue()));
            }
            return summaryList;
        }
    }
}
