import android.view.View
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.UiController
import androidx.test.espresso.ViewAction
import androidx.test.espresso.action.ViewActions.click
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.BoundedMatcher
import androidx.test.espresso.matcher.ViewMatchers
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.espresso.matcher.ViewMatchers.withText
import androidx.test.ext.junit.rules.ActivityScenarioRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.LargeTest
import au.edu.swin.sdmd.core2.InfoActivity
import au.edu.swin.sdmd.core2.R
import com.google.android.material.slider.Slider
import org.hamcrest.BaseMatcher
import org.hamcrest.Description
import org.hamcrest.Matcher
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@RunWith(AndroidJUnit4::class)
@LargeTest
class Core2EspressoTest {

    @get:Rule
    val activityRule = ActivityScenarioRule(InfoActivity::class.java)

    // In InfoActivity, click Next once and the details of the second book should show.
    @Test
    fun clickNext1Time() {
        onView(withId(R.id.nextButton)).perform(click())

        onView(withId(R.id.bookTitleView)).check(matches(withText(R.string.book_2_name)))
        onView(withId(R.id.bookDescriptionView)).check(matches(withText(R.string.book_2_description)))
        onView(withId(R.id.costView)).check(matches(withText("$3.1")))
    }

    // In InfoActivity, click Next 3 times and the details of the fourth book should show.
    @Test
    fun clickNext3Times() {
        repeat(3) {
            onView(withId(R.id.nextButton)).perform(click())
        }

        onView(withId(R.id.bookTitleView)).check(matches(withText(R.string.book_4_name)))
        onView(withId(R.id.bookDescriptionView)).check(matches(withText(R.string.book_4_description)))
        onView(withId(R.id.costView)).check(matches(withText("$4.3")))
    }

    // In InfoActivity, click Next 2 times then click Rent and the name of the third book should
    // show in BorrowActivity.
    @Test
    fun clickNext2TimesThenRent() {
        repeat(2) {
            onView(withId(R.id.nextButton)).perform(click())
        }

        onView(withId(R.id.rentButton)).perform(click())
        onView(withId(R.id.currentlyRenting)).check(matches(withText("You are now renting Atomic Habits")))
    }

    // In InfoActivity, click Rent to launch the BorrowActivity then slide the Slider to 3 should
    // change the value of the Slider and display the correct total cost.
    @Test
    fun rentThenSelect3Days() {
        onView(withId(R.id.rentButton)).perform(click())
        onView(withId(R.id.daySelector)).perform(setValue(3.0f))

        onView(withId(R.id.daySelector)).check(matches(withValue(3.0f)))
        onView(withId(R.id.totalCost)).check(matches(withText("Total cost: $7.5")))
    }

    // In InfoActivity, click Rent to launch the BorrowActivity, slide the Slider to 3, then press
    // Confirm should take the user back to InfoActivity and update the Rent button's text to
    // reflect the due back date.
    @Test
    fun rentThenSelect3DaysConfirm() {
        onView(withId(R.id.rentButton)).perform(click())
        onView(withId(R.id.daySelector)).perform(setValue(3.0f))
        onView(withId(R.id.confirmButton)).perform(click())

        val dueDate = LocalDate.now().plusDays(3)
        val dateString = dueDate.format(DateTimeFormatter.ISO_LOCAL_DATE)

        onView(withId(R.id.rentButton)).check(matches(withText("Due back $dateString")))
    }

    // In InfoActivity, click Rent to launch the BorrowActivity, slide the Slider to 3, then press
    // Cancel should take the user back to InfoActivity and keep the Rent button's text unchanged.
    @Test
    fun rentThenSelect3DaysCancel() {
        onView(withId(R.id.rentButton)).perform(click())
        onView(withId(R.id.daySelector)).perform(setValue(3.0f))
        onView(withId(R.id.cancelButton)).perform(click())

        onView(withId(R.id.rentButton)).check(matches(withText(R.string.rent)))
    }

    // This function is used to check the value of the Slider.
    private fun withValue(expectedValue: Float): BaseMatcher<View?> {
        return object : BoundedMatcher<View?, Slider>(Slider::class.java) {
            override fun describeTo(description: Description) {
                description.appendText("expected: $expectedValue")
            }

            override fun matchesSafely(slider: Slider?): Boolean {
                return slider?.value == expectedValue
            }
        }
    }

    // This function is used to set the value of the Slider.
    fun setValue(value: Float): ViewAction {
        return object : ViewAction {
            override fun getDescription(): String {
                return "Set Slider value to $value"
            }

            override fun getConstraints(): Matcher<View> {
                return ViewMatchers.isAssignableFrom(Slider::class.java)
            }

            override fun perform(uiController: UiController?, view: View) {
                val seekBar = view as Slider
                seekBar.value = value
            }
        }
    }
}