# Represents a music album.
# Attributes:
# name [String] The name of the album.
# artist [String] The name of the artist.
# cover [String] The path to the cover image of the album.
# tracks [Array[Track]] The array of tracks in the album.
class Album
	attr_accessor(:name, :artist, :cover, :tracks)

	def initialize(name, artist, cover, tracks)
		@name = name
		@artist = artist
		@cover = cover
		@tracks = tracks
	end
end