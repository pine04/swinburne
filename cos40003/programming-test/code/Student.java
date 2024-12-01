import java.util.concurrent.Semaphore;

public class Student extends Thread {
    private int studentNumber;
    private Semaphore seats;
    private Semaphore professor;
    private Semaphore awaitingStudents;

    public Student(int studentNumber, Semaphore seats, Semaphore professor, Semaphore awaitingStudents) {
        this.studentNumber = studentNumber;
        this.seats = seats;
        this.professor = professor;
        this.awaitingStudents = awaitingStudents;
    }

    @Override
    public void run() {
        // Try acquiring a seat. Leave if no seats are available.
        if (!seats.tryAcquire()) {
            System.out.printf("No available seat. Student %d just left.\n", studentNumber);
            return;
        }

        try {
            System.out.printf("Student %d just sat down.\n", studentNumber);
            // Inform the professor that there is a new waiting student. This will wake up the 
            // professor thread if it is asleep.
            awaitingStudents.release(); 
            // Acquire the professor to consult if he is available. Otherwise, sleep (wait).
            professor.acquire(); 
            // If the professor is available, free your seat and start consulting.
            seats.release();
            System.out.printf("Student %d is consulting.\n", studentNumber);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
