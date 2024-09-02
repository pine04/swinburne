package au.edu.swin.sdmd.core3

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import au.edu.swin.sdmd.core3.data.Meeting

// The custom adapter object for the recycler view. It receives a list of meetings.
class MeetingListAdapter(private val dataset: List<Meeting>) : RecyclerView.Adapter<MeetingListAdapter.ViewHolder>() {
    // The view holder will contain references to the child views of a meeting row.
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val clubNameView = view.findViewById<TextView>(R.id.clubName)
        val locationView = view.findViewById<TextView>(R.id.location)
        val timeView = view.findViewById<TextView>(R.id.time)
        val iconView = view.findViewById<ImageView>(R.id.typeIcon)
    }

    // Called when a view holder is created.
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.meeting_row, parent, false)
        return ViewHolder(view)
    }

    // Binds data to a view holder.
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.clubNameView.text = dataset[position].club
        holder.locationView.text = dataset[position].location
        holder.timeView.text = dataset[position].time.toLocaleString()

        // If the meeting location is "Online", draws a computer icon in the meeting row item.
        if (dataset[position].location == "Online") {
            holder.iconView.setImageResource(R.drawable.computer_24px)
        } else {
            holder.iconView.setImageDrawable(null)
        }
    }

    // Returns the size of the dataset.
    override fun getItemCount(): Int {
        return dataset.size
    }
}