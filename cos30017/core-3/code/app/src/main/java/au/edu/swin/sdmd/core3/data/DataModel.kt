package au.edu.swin.sdmd.core3.data

import android.content.res.Resources
import androidx.annotation.RawRes
import java.io.BufferedReader
import java.io.InputStreamReader
import java.util.Date

// The DataModel singleton object contains a method that reads the meeting data from a CSV file
// located in res/raw. The method returns a list of meetings.
object DataModel {
    fun readCsvFile(resources: Resources, @RawRes resourceId: Int): List<Meeting> {
        // Opens the CSV file as an input stream.
        val inputStream = resources.openRawResource(resourceId)
        // Creates a reader object for the input stream.
        val reader = BufferedReader(InputStreamReader(inputStream))

        val meetings = mutableListOf<Meeting>()
        var line: String?

        // Reads the file line by line until the end of the file where line is null.
        do {
            line = reader.readLine()
            // If line is not null, convert the line into a Meeting object.
            if (line != null) {
                val columns = line.split(",")
                meetings.add(
                    Meeting(
                        club = columns[0],
                        location = columns[1],
                        time = Date(columns[2].toLong())
                    )
                )
            }
        } while (line != null)

        return meetings
    }
}