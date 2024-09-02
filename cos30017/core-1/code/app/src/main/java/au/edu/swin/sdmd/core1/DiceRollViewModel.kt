package au.edu.swin.sdmd.core1

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.MutableLiveData
import kotlin.math.max
import kotlin.random.Random

class DiceRollViewModel : ViewModel() {
    val uiState = MutableLiveData(DiceRollUIState())
    private val random = Random(1)

    fun roll() {
        Log.d("roll", "Rolling dice.")

        uiState.value = uiState.value?.copy(
            diceValue = random.nextInt(1, 7),
            state = GameState.ROLLED
        )

        Log.d("roll", "New game state: (${uiState.value?.toString()})")
    }

    fun add() {
        Log.d("add", "Adding rolled number.")

        val score = uiState.value?.score
        val diceValue = uiState.value?.diceValue

        if (score != null && diceValue != null) {
            val newScore = score + diceValue

            uiState.value = uiState.value?.copy(
                score = newScore,
                state = if (newScore == 20) GameState.WON else GameState.ROLLING
            )
        }

        Log.d("add", "New game state: (${uiState.value?.toString()})")
    }

    fun subtract() {
        Log.d("subtract", "Subtracting rolled number.")

        val score = uiState.value?.score
        val diceValue = uiState.value?.diceValue

        if (score != null && diceValue != null) {
            val newScore = max(score - diceValue, 0)

            uiState.value = uiState.value?.copy(
                score = newScore,
                state = if (newScore == 20) GameState.WON else GameState.ROLLING
            )
        }

        Log.d("subtract", "New game state: (${uiState.value?.toString()})")
    }

    fun reset() {
        uiState.value = DiceRollUIState()

        Log.d("reset", "New game state: (${uiState.value?.toString()})")
    }
}