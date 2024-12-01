package footy.condition_variable;

public class Footy {
    public static void main(String[] args) {
        Player mike = new Player("Mike", 1, "Jack");
        Player jack = new Player("Jack", 2, "Carl");
        Player carl = new Player("Carl", 3, "Mike");

        mike.start();
        jack.start();
        carl.start();
    }
}