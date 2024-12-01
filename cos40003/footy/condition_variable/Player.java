package footy.condition_variable;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Player extends Thread {
    private static String currentPlayer = "Mike";
    private static Lock lock = new ReentrantLock();
    private static Condition ballReady = lock.newCondition();

    private String player;
    private String nextPlayer;
    private int seconds;

    public Player(String player, int seconds, String nextPlayer) {
        this.player = player;
        this.seconds = seconds;
        this.nextPlayer = nextPlayer;
    }

    @Override
    public void run() {
        while (true) {
            lock.lock();
            try {
                while (!currentPlayer.equals(this.player)) {
                    ballReady.await();
                }                
                // For correct grammar :)
                if (this.seconds == 1) {
                    System.out.printf("%s takes the ball, runs for %d second;\n", this.player, this.seconds);
                } else {                    
                    System.out.printf("%s takes the ball, runs for %d seconds;\n", this.player, this.seconds);
                }

                Thread.sleep(1000 * this.seconds);
                currentPlayer = this.nextPlayer;
                ballReady.signalAll();
            } catch (InterruptedException e) {
                e.printStackTrace();
                lock.unlock();
            }
        }
    }
}
