package footy.locks;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Player extends Thread {
    private static Lock lock = new ReentrantLock();
    private static String currentPlayer = "Mike";

    private String player;
    private String nextPlayer;
    private int seconds;

    public Player(String player, String nextPlayer, int seconds) {
        this.player = player;
        this.nextPlayer = nextPlayer;
        this.seconds = seconds;
    }

    @Override
    public void run() {
        while (true) {
            lock.lock();
            
            try {
                if (currentPlayer != this.player) {
                    continue;
                }

                System.out.println(this.player + " takes the ball, runs for " + seconds + " second(s);");
                Thread.sleep(this.seconds * 1000);
                currentPlayer = this.nextPlayer;
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        }
    }
}
