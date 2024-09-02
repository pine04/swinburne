package au.edu.swin.sdmd.core1

data class DiceRollUIState (
    val score: Int = 0,
    val diceValue: Int = 0,
    val state: GameState = GameState.ROLLING
)