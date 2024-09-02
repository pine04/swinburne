# Represents a music track.
# Attributes:
# name [String] The name of the track.
# artist [String] The name of the artist.
# collection [String] The name of the collection the track belongs to (album/playlist).
# number [Int] The track number.
# cover [String] The path to the cover image of the track.
# location [String] The path of to the sound file of the track.
class Track
	attr_accessor(:name, :artist, :collection, :number, :cover, :location)

	def initialize(name, artist, collection, number, cover, location)
		@name = name
		@artist = artist
		@collection = collection
		@number = number
		@cover = cover
		@location = location
	end
end