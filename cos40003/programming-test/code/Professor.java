import java.util.concurrent.Semaphore;

public class Professor extends Thread {
    private static final long CONSULTATION_TIME = 3000;

    private Semaphore professor;
    private Semaphore awaitingStudents;

    public Professor(Semaphore professor, Semaphore awaitingStudents) {
        this.professor = professor;
        this.awaitingStudents = awaitingStudents;
    }

    @Override
    public void run() {
        while (true) {
            try {
                // Acquire a waiting student. Sleep if there is none.
                awaitingStudents.acquire();
                // Do some consulting for 3 seconds.
                System.out.println("Professor is explaining.");
                Thread.sleep(CONSULTATION_TIME);
                // Consulting done, inform waiting students that the professor is now available.
                // This wakes up waiting students.
                professor.release();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
