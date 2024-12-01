package footy.semaphore;

import java.util.concurrent.Semaphore;

public class Player extends Thread {
    private String player;
    private int seconds;
    private Semaphore me;
    private Semaphore nextPlayer;

    public Player(String player, int seconds, Semaphore me, Semaphore nextPlayer) {
        this.player = player;
        this.seconds = seconds;
        this.me = me;
        this.nextPlayer = nextPlayer;
    }

    @Override
    public void run() {
        while (true) {
            try {
                me.acquire();
                // For correct grammar :)
                if (seconds == 1) {
                    System.out.printf("%s takes the ball, runs for %d second;\n", player, seconds);
                } else {                    
                    System.out.printf("%s takes the ball, runs for %d seconds;\n", player, seconds);
                }
                Thread.sleep(1000 * seconds);
                nextPlayer.release();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
