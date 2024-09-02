package au.edu.swin.sdmd.core2

import android.os.Parcelable
import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import kotlinx.parcelize.Parcelize

// The Book data class stores all the information related to a book, including the number of days it
// has been rented for.
@Parcelize
data class Book(
    @StringRes val nameResource: Int,
    @StringRes val descriptionResource: Int,
    @DrawableRes val imageResource: Int,
    val rating: Float,
    val pricePerDay: Double,
    val hasHardcover: Boolean,
    val isFiction: Boolean,
    val isInEnglish: Boolean,
    var daysRented: Int? = null
) : Parcelable { }
