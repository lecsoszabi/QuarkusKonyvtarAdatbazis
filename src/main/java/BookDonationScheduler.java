import io.quarkus.scheduler.Scheduled;
import io.smallrye.common.annotation.Blocking;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.annotation.PreDestroy;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

@ApplicationScoped
public class BookDonationScheduler {
    private final ExecutorService executor = Executors.newFixedThreadPool(4);

    @Inject
    BookService bookService;

    @Blocking
    @Scheduled(cron = "0 0 20 ? * MON-FRI")
    public void generateBookDonations() {
        List<CompletableFuture<Void>> futures = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            futures.add(CompletableFuture.runAsync(() -> {
                int totalBooks = ThreadLocalRandom.current().nextInt(2000, 4001);
                List<Book> booksBatch = new ArrayList<>(100);

                for (int j = 0; j < totalBooks; j++) {
                    Book book = new Book();
                    book.setTitle("Ismeretlen név " + ThreadLocalRandom.current().nextInt(1, 100000));
                    book.setAuthor("Ismeretlen szerző " + ThreadLocalRandom.current().nextInt(1, 100000));
                    book.setQuantity(ThreadLocalRandom.current().nextInt(1, 6));
                    booksBatch.add(book);

                    if (booksBatch.size() == 100) {
                        bookService.saveBooks(booksBatch);
                        booksBatch.clear();
                    }
                }

                if (!booksBatch.isEmpty()) {
                    bookService.saveBooks(booksBatch);
                }
            }, executor));
        }

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
    }

    @PreDestroy
    void shutdown() {
        executor.shutdownNow();
    }
}
