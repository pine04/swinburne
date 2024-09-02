package au.edu.swin.sdmd.core3.data

import java.util.Date

// The Meeting data class represents a club meeting. It contains 3 pieces of information:
// the name of the club, the meeting location, and the meeting time.
data class Meeting(
    val club: String,
    val location: String,
    val time: Date
)
