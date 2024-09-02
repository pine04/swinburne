package au.edu.swin.sdmd.core2

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.slider.Slider
import com.google.android.material.snackbar.Snackbar

class BorrowActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_borrow)

        // Gets all the views that need to be modified for this activity.
        val currentlyRentingView = findViewById<TextView>(R.id.currentlyRenting)
        val daySelector = findViewById<Slider>(R.id.daySelector)
        val totalCostView = findViewById<TextView>(R.id.totalCost)
        val confirmButton = findViewById<Button>(R.id.confirmButton)
        val cancelButton = findViewById<Button>(R.id.cancelButton)
        val snackbar = Snackbar.make(findViewById(R.id.content),
            getString(R.string.zero_days_disallowed), 3000)

        // Gets the Book object passed into the Intent and into this activity.
        val selectedBook = intent.extras?.getParcelable<Book>("book")

        // Gets the title of the book and shows it on the screen.
        val bookTitle = getText(selectedBook?.nameResource ?: R.string.unknown_book)
        currentlyRentingView.text = getString(R.string.you_are_now_renting, bookTitle)

        // Gets the daily rent of the book and shows the total cost on the screen. At the beginning,
        // this cost is 0.
        val dailyRent = selectedBook?.pricePerDay ?: 0.0
        var days = 0
        totalCostView.text = getString(R.string.total_cost, (days * dailyRent).toString())

        // Adds an event listener to the Slider to update the number of rented days.
        daySelector.addOnChangeListener { _, value, _ ->
            days = value.toInt()
            totalCostView.text = getString(R.string.total_cost, (days * dailyRent).toString())
        }

        // Adds an event listener to the Confirm button.
        confirmButton.setOnClickListener {
            if (days == 0) {
                // If the user selects 0 days, inform them that this is not allowed.
                snackbar.show()
            } else {
                // Otherwise, creates an Intent to go back to the InfoActivity, passing back the
                // number of rented days.
                val intent = Intent(this, InfoActivity::class.java)
                intent.putExtra("daysRented", days)
                setResult(RESULT_OK, intent)
                finish()
            }
        }

        // Adds an event listener to the Cancel button to take the user back to the InfoActivity
        // and to inform the activity that the rent has been cancelled.
        cancelButton.setOnClickListener {
            val intent = Intent(this, InfoActivity::class.java)
            setResult(RESULT_CANCELED, intent)
            finish()
        }
    }

    // When the user presses back, takes them back to the InfoActivity
    // and informs the activity that the rent has been cancelled.
    override fun onBackPressed() {
        val intent = Intent(this, InfoActivity::class.java)
        setResult(RESULT_CANCELED, intent)
        super.onBackPressed()
    }
}