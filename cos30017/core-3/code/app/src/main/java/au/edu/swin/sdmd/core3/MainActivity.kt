package au.edu.swin.sdmd.core3

import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import au.edu.swin.sdmd.core3.data.DataModel
import au.edu.swin.sdmd.core3.data.Meeting

class MainActivity : AppCompatActivity() {
    private lateinit var allMeetings: List<Meeting>
    private lateinit var meetingsToShow: MutableList<Meeting>
    private lateinit var meetingListAdapter: MeetingListAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout_main)
        // Sets the Toolbar as the top app bar.
        setSupportActionBar(findViewById(R.id.toolbar))

        // Reads the meeting data from the CSV file and sorts it by time in ascending order.
        allMeetings = DataModel.readCsvFile(resources, R.raw.groups).sortedBy { it.time }
        // Creates a mutable copy of the allMeetings list to pass into the adapter.
        meetingsToShow = allMeetings.toMutableList()

        // Gets the recycler view.
        val recyclerView = findViewById<RecyclerView>(R.id.meetingList)
        // Creates a new ListAdapter object, passing in the mutable array of meetings to show.
        meetingListAdapter = MeetingListAdapter(meetingsToShow)
        // Associates the adapter with the recycler view.
        recyclerView.adapter = meetingListAdapter
    }

    // Creates the options menu of the top app bar. In this case the menu will only have one item:
    // the filter button.
    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu, menu)
        return true
    }

    // Called when an item in the menu is pressed on. In this case, calls the filterMeetings method
    // when the filter button is pressed on.
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.action_filter_none -> filterMeetings("All")
            R.id.action_filter_programming -> filterMeetings("Programming")
            R.id.action_filter_cheerleading -> filterMeetings("Cheerleading")
            R.id.action_filter_bookworm -> filterMeetings("Bookworm")
            R.id.action_filter_esports -> filterMeetings("ESports")
        }
        return true
    }

    // Filters out all meetings not of the provided "club" from the data object passed into the adapter.
    // Notifies the adapter of this change.
    private fun filterMeetings(club: String) {
        if (club == "All") {
            meetingsToShow.clear()
            meetingsToShow.addAll(allMeetings)
        } else {
            meetingsToShow.clear()
            meetingsToShow.addAll(allMeetings.filter { it.club == club })
        }

        meetingListAdapter.notifyDataSetChanged()
    }
}