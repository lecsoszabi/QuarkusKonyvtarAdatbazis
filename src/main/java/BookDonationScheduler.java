import io.quarkus.scheduler.Scheduled;
import io.smallrye.common.annotation.Blocking;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadLocalRandom;

@ApplicationScoped
public class BookDonationScheduler {

    @Inject
    BookService bookService;

    @Blocking
    @Scheduled(cron = "0 0 20 ? * MON-FRI") // Hétköznap este 8 órakor fut
    public void generateBookDonations() throws InterruptedException {

            try (ExecutorService executor = Executors.newFixedThreadPool(4)) {

                List<Runnable> tasks = new ArrayList<>();

                for (int i = 0; i < 4; i++) { // 4 szál indítása
                    tasks.add(() -> {
                        int totalBooks = ThreadLocalRandom.current().nextInt(2000, 4001); // 2000-4000 könyv per szál
                        List<Book> booksBatch = new ArrayList<>();

                        for (int j = 0; j < totalBooks; j++) {
                            Book book = new Book();
                            book.setTitle("Ismeretlen név " + ThreadLocalRandom.current().nextInt(1, 100000));
                            book.setAuthor("Ismeretlen szerző " + ThreadLocalRandom.current().nextInt(1, 100000));
                            book.setQuantity(ThreadLocalRandom.current().nextInt(1, 6)); // Mennyiség: 1-5

                            booksBatch.add(book);

                            if (booksBatch.size() == 100) { // Tranzakciónként maximum 100 könyv
                                bookService.saveBooks(new ArrayList<>(booksBatch));
                                booksBatch.clear();
                            }
                        }

                        if (!booksBatch.isEmpty()) { // Maradék könyvek mentése
                            bookService.saveBooks(booksBatch);
                        }
                    });
                }

                tasks.forEach(executor::execute); // Feladatok futtatása

                executor.shutdown();
                executor.awaitTermination(Long.MAX_VALUE, java.util.concurrent.TimeUnit.MILLISECONDS);
            } // 4 szál
        System.out.println("Adomány könyvek sikeresen hozzáadva az adatbázishoz.");
    }




}
