package au.edu.swin.sdmd.core1

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.graphics.Color
import androidx.activity.viewModels
import androidx.lifecycle.Observer

class DiceRollActivity : AppCompatActivity() {
    private val dices = arrayOf("\u2610", "\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.layout)

        val model: DiceRollViewModel by viewModels()

        val rollButton = findViewById<Button>(R.id.roll)
        val addButton = findViewById<Button>(R.id.add)
        val subtractButton = findViewById<Button>(R.id.subtract)
        val resetButton = findViewById<Button>(R.id.reset)

        val diceView = findViewById<TextView>(R.id.dice)
        val scoreView = findViewById<TextView>(R.id.score)

        rollButton.setOnClickListener {
            model.roll()
        }

        addButton.setOnClickListener {
            model.add()
        }

        subtractButton.setOnClickListener {
            model.subtract()
        }

        resetButton.setOnClickListener {
            model.reset()
        }

        val stateObserver = Observer<DiceRollUIState> { state ->
            when (state.state) {
                GameState.ROLLED -> {
                    rollButton.isEnabled = false
                    addButton.isEnabled = true
                    subtractButton.isEnabled = true
                }
                GameState.ROLLING -> {
                    rollButton.isEnabled = true
                    addButton.isEnabled = false
                    subtractButton.isEnabled = false
                }
                GameState.WON -> {
                    rollButton.isEnabled = false
                    addButton.isEnabled = false
                    subtractButton.isEnabled = false
                }
            }

            diceView.text = dices[state.diceValue]

            if (state.score < 20) {
                scoreView.setTextColor(Color.BLACK)
            } else if (state.score > 20) {
                scoreView.setTextColor(Color.RED)
            } else {
                scoreView.setTextColor(Color.GREEN)
            }

            scoreView.text = state.score.toString()
        }

        model.uiState.observe(this, stateObserver)
    }
}