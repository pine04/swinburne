package au.edu.swin.sdmd.core2

// An array of book objects.
val books = arrayOf(
    Book(
        nameResource = R.string.book_1_name,
        descriptionResource = R.string.book_1_description,
        hasHardcover = true,
        isFiction = false,
        isInEnglish = true,
        rating = 4.2f,
        imageResource = R.drawable.outlive,
        pricePerDay = 2.5
    ),
    Book(
        nameResource = R.string.book_2_name,
        descriptionResource = R.string.book_2_description,
        hasHardcover = false,
        isFiction = true,
        isInEnglish = true,
        rating = 3.5f,
        imageResource = R.drawable.dune,
        pricePerDay = 3.1
    ),
    Book(
        nameResource = R.string.book_3_name,
        descriptionResource = R.string.book_3_description,
        hasHardcover = false,
        isFiction = false,
        isInEnglish = true,
        rating = 4.5f,
        imageResource = R.drawable.atomic_habits,
        pricePerDay = 5.2
    ),
    Book(
        nameResource = R.string.book_4_name,
        descriptionResource = R.string.book_4_description,
        hasHardcover = true,
        isFiction = true,
        isInEnglish = true,
        rating = 5.0f,
        imageResource = R.drawable.court_of_thorns_and_roses,
        pricePerDay = 4.3
    )
)