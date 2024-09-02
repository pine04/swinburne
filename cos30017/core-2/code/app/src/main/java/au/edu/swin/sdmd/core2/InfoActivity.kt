package au.edu.swin.sdmd.core2

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.RatingBar
import android.widget.TextView
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.snackbar.Snackbar
import java.time.LocalDate
import java.time.format.DateTimeFormatter

class InfoActivity : AppCompatActivity() {
    private var currentBookIndex = 0

    private lateinit var imageView: ImageView
    private lateinit var titleView: TextView
    private lateinit var descriptionView: TextView
    private lateinit var ratingBar: RatingBar
    private lateinit var hardcoverView: TextView
    private lateinit var fictionView: TextView
    private lateinit var englishView: TextView
    private lateinit var costView: TextView
    private lateinit var nextButton: Button
    private lateinit var rentButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_info)

        // Gets all the views that need to be modified for this activity.
        imageView = findViewById(R.id.bookImageView)
        titleView = findViewById(R.id.bookTitleView)
        descriptionView = findViewById(R.id.bookDescriptionView)
        ratingBar = findViewById(R.id.ratingView)
        hardcoverView = findViewById(R.id.hardcoverView)
        fictionView = findViewById(R.id.fictionView)
        englishView = findViewById(R.id.englishView)
        costView = findViewById(R.id.costView)
        nextButton = findViewById(R.id.nextButton)
        rentButton = findViewById(R.id.rentButton)

        // Displays the first book.
        showBook(books[currentBookIndex])

        // Adds an event listener to the Next button which increases the book index by 1 and shows
        // the next book.
        nextButton.setOnClickListener {
            currentBookIndex++
            if (currentBookIndex >= books.size) currentBookIndex = 0
            showBook(books[currentBookIndex])
        }

        // Adds an event listener to the Rent button which creates an Intent to launch the Borrow
        // Activity, which is the screen in which the book can be rented. The current book object
        // is passed into the Intent object.
        rentButton.setOnClickListener {
            val intent = Intent(this, BorrowActivity::class.java)
            intent.putExtra("book", books[currentBookIndex])
            startForResult.launch(intent)
        }
    }

    // Updates the screen with the information of the given book.
    private fun showBook(book: Book) {
        book.apply {
            imageView.setImageResource(imageResource)
            titleView.setText(nameResource)
            descriptionView.setText(descriptionResource)
            ratingBar.rating = rating

            hardcoverView.setBackgroundColor(
                if (hasHardcover) getColor(R.color.purple_500) else getColor(R.color.purple_200)
            )
            fictionView.setBackgroundColor(
                if (isFiction) getColor(R.color.purple_500) else getColor(R.color.purple_200)
            )
            englishView.setBackgroundColor(
                if (isInEnglish) getColor(R.color.purple_500) else getColor(R.color.purple_200)
            )

            costView.text = getString(R.string.cost, pricePerDay.toString())

            // If the book is already rented (indicated by daysRented being non-null), disable the
            // Rent button and changes its text to "Due back <DATE>". Otherwise, the button is
            // active and displays "Rent".
            if (book.daysRented != null) {
                rentButton.isEnabled = false
                val dueDate = LocalDate.now().plusDays(daysRented?.toLong() ?: 0)
                rentButton.text =
                    getString(R.string.due_back, dueDate.format(DateTimeFormatter.ISO_LOCAL_DATE))
            } else {
                rentButton.isEnabled = true
                rentButton.text = getString(R.string.rent)
            }
        }
    }

    // Creates an Activity launcher that expects a result using the registerForActivityResult
    // function. This function requires a contract that specifies the type of the input to start
    // the activity and the type of the result. In this case, the StartActivityForResult contract
    // specifies that the input type is Intent and result type is ActivityResult. This function also
    // receives a callback which is called when the result is available.
    private val startForResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == RESULT_OK) {
                // If the result code is OK, meaning the book has been rented successfully, extract
                // the number of rented days from the ActivityResult object.
                val data: Intent? = result.data
                val daysRented = data?.extras?.getInt("daysRented")
                // Updates the current book object (which must be the one that has been rented.)
                books[currentBookIndex].daysRented = daysRented
                // Updates the information on the screen.
                showBook(books[currentBookIndex])

                // Shows a Snackbar to let the user know that they has rented successfully.
                val dueDate = LocalDate.now().plusDays(daysRented!!.toLong())
                val dateString = dueDate.format(DateTimeFormatter.ISO_LOCAL_DATE)
                Snackbar.make(findViewById(R.id.content),
                    getString(R.string.rent_successful, dateString), 3000).show()

            } else if (result.resultCode == RESULT_CANCELED) {
                // If the result code is CANCELED, shows a Snackbar to let the user know that they
                // has canceled the rent.
                Snackbar.make(findViewById(R.id.content), getString(R.string.rent_cancelled), 3000).show()
            }
        }
}