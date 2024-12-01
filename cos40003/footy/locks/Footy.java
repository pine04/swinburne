package footy.locks;

public class Footy extends Thread {
    public static void main(String[] args) {
        Player mike = new Player("Mike", "Jack", 1);
        Player jack = new Player("Jack", "Carl", 2);
        Player carl = new Player("Carl", "Mike", 3);

        mike.start();
        jack.start();
        carl.start();
    }
}