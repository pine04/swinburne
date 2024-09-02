Vue.createApp({
    data() {
        return {
            number: 0,
            answer: getRandomNumber(1, 100),
            message: "Start guessing."
        }
    },
    methods: {
        startOver() {
            this.answer = getRandomNumber(1, 100);
            this.message = "Start guessing.";
        },
        checkGuess() {
            if (this.number > this.answer) {
                this.message = "Guess lower.";
            } else if (this.number < this.answer) {
                this.message = "Guess higher.";
            } else {
                this.message = "You got it!";
            }
        },
        giveUp() {
            this.message = `The correct number is ${this.answer}. Click "Start Over" to play again.`;
        }
    }
}).mount("#app");

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}