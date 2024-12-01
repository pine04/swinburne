package footy.semaphore;

import java.util.concurrent.Semaphore;

public class Footy {
    private static Semaphore mikeTurn = new Semaphore(1);
    private static Semaphore jackTurn = new Semaphore(0);
    private static Semaphore carlTurn = new Semaphore(0);

    public static void main(String[] args) {
        Player mike = new Player("Mike", 1, mikeTurn, jackTurn);
        Player jack = new Player("Jack", 2, jackTurn, carlTurn);
        Player carl = new Player("Carl", 3, carlTurn, mikeTurn);

        mike.start();
        jack.start();
        carl.start();
    }
}