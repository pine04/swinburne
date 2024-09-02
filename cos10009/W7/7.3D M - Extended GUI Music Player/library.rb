require "gosu"
require "./constants.rb"
require "./track.rb"
require "./album.rb"
require "./playlist.rb"
require "./icon.rb"

# Contains an album's attributes in the form of images for display.
# Attributes:
# cover [Gosu::Image] The cover image of the album.
# name [Gosu::Image] The name of the album as an image from text.
# artist [Gosu::Image] The name of the artist as an image from text.
class AlbumGraphic
	attr_accessor(:name, :artist, :cover)

	def initialize(name, artist, cover)
		@cover = Gosu::Image.new(cover)
		@name = create_fit_text(name, TEXT_NORMAL, POPPINS_BOLD, 144)
		@artist = create_fit_text(artist, TEXT_SMALL, POPPINS_REGULAR, 144)
	end
end

# Contains a playlist's attributes in the form of images for display.
# Attributes:
# cover [Gosu::Image] The cover image of the playlist.
# name [Gosu::Image] The name of the playlist as an image from text.
class PlaylistGraphic
    attr_accessor(:name, :cover)

    def initialize(name, cover)
		@cover = Gosu::Image.new(cover)
		@name = create_fit_text(name, TEXT_NORMAL, POPPINS_BOLD, 144)
	end
end

# Returns an image created from text which fits a desired size. If the text exceeds this size, a part of it will be cut out and replaced by "...".
# Parameters:
# text [String] The text to be converted into an image.
# line_height [Int] The line height of the resulting text.
# font [String] The path to the file containing the desired font.
# max_size [Int] The maximum size of the resulting text.
# Return:
# (Gosu::Image) - An image created from text.
def create_fit_text(text, line_height, font, max_size)
	image = Gosu::Image.from_text(text, line_height, options = {font: font})
	if (image.width() > max_size)
		num_of_chars = (text.length().to_f() * max_size / image.width()).floor() - 3
		image = Gosu::Image.from_text(text[0..num_of_chars] + "...", line_height, options = {font: font})
	end
	return image
end

# Returns an array of AlbumGraphics from an array of Albums.
# Parameter:
# albums [Array[Album]] An array of albums.
# Return:
# (Array[AlbumGraphic]) An array of AlbumGraphics.
def create_album_graphics(albums)
	graphics = Array.new()
    albums.each do |album|
        graphics << AlbumGraphic.new(album.name(), album.artist(), album.cover())
    end
    return graphics
end

# Returns an array of PlaylistGraphics from an array of Playlists.
# Parameter:
# playlists [Array[Playlist]] An array of playlists.
# Return:
# (Array[PlaylistGraphic]) An array of PlaylistGraphics.
def create_playlist_graphics(playlists)
	graphics = Array.new()
    playlists.each do |playlist|
        graphics << PlaylistGraphic.new(playlist.name(), playlist.cover())
    end
    return graphics
end

# Returns an array of playlists read from a text file.
# Parameter:
# file_name [String] The name of the text file containing the playlist data.
# Return:
# (Array[Playlist]) An array of Playlists.
def read_playlists(file_name)
    file = File.new(file_name, "r")
    count = file.gets().to_i()
    playlists = Array.new()
    for i in 0...count
        playlist = read_playlist(file)
        playlists << playlist
    end
    file.close()
    return playlists
end

# Returns a playlist read from a text file.
# Parameter:
# file [File] The file object to read from.
# Return:
# (Playlist) A playlist object.
def read_playlist(file)
    name = file.gets().chomp()
    cover = file.gets().chomp()
    track_count = file.gets().to_i()
    tracks = Array.new()
    for i in 0...track_count
        track = read_track(file, name, i+1)
        tracks << track
    end
    return Playlist.new(name, cover, tracks)
end

# Returns an array of albums read from a text file.
# Parameter:
# file_name [String] The name of the text file containing the album data.
# Return:
# (Array[Album]) An array of Albums.
def read_albums(file_name)
    file = File.new(file_name, "r")
    count = file.gets().to_i()
    albums = Array.new()
    count.times() do
        album = read_album(file)
        albums << album
    end
    file.close()
    return albums
end

# Returns an album read from a text file.
# Parameter:
# file [File] The file object to read from.
# Return:
# (Album) An album object.
def read_album(file)
    name = file.gets().chomp()
    artist = file.gets().chomp()
    cover = file.gets().chomp()
    track_count = file.gets().chomp().to_i()
    tracks = Array.new()
    for i in 0...track_count
        track = read_track(file, name, i+1)
        tracks << track
    end
    return Album.new(name, artist, cover, tracks)
end

# Returns a track read from a text file.
# Parameters:
# file [File] The file object to read from.
# collection [String] The collection (album/playlist) the track belongs to.
# number [Int] The track number.
# Return:
# (Track) A track object.
def read_track(file, collection, number)
    name = file.gets().chomp()
    artist = file.gets().chomp()
    cover = file.gets().chomp()
    location = file.gets().chomp()
    return Track.new(name, artist, collection, number, cover, location)
end

# Writes an array of playlists into a text file.
# Parameters:
# file_name [String] The name of the text file to write to.
# playlists [Array[Playlist]] The array of playlists to write.
# Return:
# (void)
def write_playlists(file_name, playlists)
    file = File.new(file_name, "w")
    file.puts(playlists.length())
    playlists.each do |playlist|
        write_playlist(file, playlist)
    end
    file.close()
end

# Writes a playlist into a text file.
# Parameters:
# file [File] The file object to write to.
# playlist [Playlist] The playlist to write.
# Return:
# (void)
def write_playlist(file, playlist)
    file.puts(playlist.name())
    file.puts(playlist.cover())
    file.puts(playlist.tracks().length())
    playlist.tracks().each do |track|
        write_track(file, track)
    end
end

# Writes a track into a text file.
# Parameters:
# file [File] The file object to write to.
# track [Track] The track to write.
# Return:
# (void)
def write_track(file, track)
    file.puts(track.name())
    file.puts(track.artist())
    file.puts(track.cover())
    file.puts(track.location())
end

# Returns the height of the album block in the library in pixels.
# Parameter:
# album_count [Int] The number of albums in the library.
# Return:
# (Int) The height of the album block.
def album_library_height(album_count)
    return (album_count.to_f() / 2).ceil() * 186 - 16
end

# Returns the height of the playlist block in the library in pixels, also accounting for the "Add new playlist" button.
# Parameter:
# playlist_count [Int] The number of playlists in the library.
# Return:
# (Int) The height of the playlist block.
def playlist_library_height(playlist_count)
    if (playlist_count % 2 == 0)
        return (playlist_count.to_f() / 2).ceil() * 168 + 128
    else
        return (playlist_count.to_f() / 2).ceil() * 168 - 16 
    end
end

# Draws an album graphic onto the screen.
# Parameters:
# graphic [AlbumGraphic] The album graphic to draw.
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# Return:
# (void)
def draw_album_graphic(graphic, x, y)
    scale_x = 128.to_f() / graphic.cover().width()
    scale_y = 128.to_f() / graphic.cover().height()
    graphic.cover().draw(x, y, 0, scale_x, scale_y)
    name_x = x + 64 - graphic.name().width() / 2
    name_y = y + 128
    graphic.name().draw(name_x, name_y, 0)
    artist_x = x + 64 - graphic.artist().width() / 2
    artist_y = y + 128 + 24
    graphic.artist().draw(artist_x, artist_y, 0)
end

# Draws a playlist graphic onto the screen.
# Parameters:
# graphic [PlaylistGraphic] The playlist graphic to draw.
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# Return:
# (void)
def draw_playlist_graphic(graphic, x, y)
    scale_x = 128.to_f() / graphic.cover().width()
    scale_y = 128.to_f() / graphic.cover().height()
    graphic.cover().draw(x, y, 0, scale_x, scale_y)
    name_x = x + 64 - graphic.name().width() / 2
    name_y = y + 128
    graphic.name().draw(name_x, name_y, 0)
    Gosu.draw_rect(x + 104, y, 24, 24, BRIGHT_RED)
    draw_cross_icon(x + 108, y + 4, 1, 0, BRIGHT_GRAY)
end

# Draws the "Add new playlist" onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# Return:
# (void)
def draw_playlist_add_button(x, y)
    Gosu.draw_rect(x, y, 128, 128, LIGHT_TEAL)
    draw_plus_icon(x + 48, y + 48, 2, 0, BRIGHT_GRAY)
end