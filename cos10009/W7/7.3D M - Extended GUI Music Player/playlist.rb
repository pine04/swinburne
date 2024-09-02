# Represents a music playlist.
# Attributes:
# name [String] The name of the playlist.
# cover [String] The path to the cover image of the playlist.
# tracks [Array[Track]] The array of tracks in the playlist.
class Playlist
    attr_accessor(:name, :cover, :tracks)

    def initialize(name, cover, tracks)
        @name = name
        @cover = cover
        @tracks = tracks
    end
end