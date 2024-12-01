import java.util.concurrent.Semaphore;

public class Main {
    private static final long TIME_UNTIL_NEXT_STUDENT = 1000;

    // The number of seats in the waiting queue.
    private static Semaphore seats = new Semaphore(2);
    // A binary semaphore indicating whether the professor is available.
    // The fairness setting for this semaphore has to be true. As two waiting student threads might 
    // be contending for the professor at once, the first thread to call acquire() should get the 
    // professor first.
    private static Semaphore professor = new Semaphore(1, true);
    // A semaphore containing the number of students waiting for consultation in the queue.
    private static Semaphore awaitingStudents = new Semaphore(0);

    public static void main(String[] args) {
        // Create and start the professor thread.
        Professor professorThread = new Professor(professor, awaitingStudents);
        professorThread.start();

        // Create and start a student thread every 1 second.
        int studentCounter = 1;
        while (true) {
            try {
                new Student(studentCounter, seats, professor, awaitingStudents).start();
                studentCounter++;
                Thread.sleep(TIME_UNTIL_NEXT_STUDENT);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } 
    }
}