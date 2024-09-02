require "gosu"
require "./constants.rb"
require "./icon.rb"

# Contains a track's attributes in the form of images for display.
# Attributes:
# name [Gosu::Image] The name of the track as an image from text.
# artist [Gosu::Image] The name of the artist as an image from text.
class TrackGraphic
    attr_accessor(:name, :artist)

    def initialize(name, artist)
        @name = Gosu::Image.from_text(name, TEXT_NORMAL, option = {font: POPPINS_REGULAR})
        @artist = Gosu::Image.from_text(artist, TEXT_SMALL, option = {font: POPPINS_REGULAR})
    end
end

# Returns an array of TrackGraphics from an array of Tracks.
# Parameter:
# albums [Array[Track]] An array of tracks.
# Return:
# (Array[TrackGraphic]) An array of TrackGraphics.
def create_track_graphics(tracks)
    graphics = Array.new()
    tracks.each do |track|
        graphics << TrackGraphic.new(track.name(), track.artist())
    end
    return graphics
end

# Returns the height of the tracklist in pixels.
# Parameter:
# track_count [Int] The number of tracks in the tracklist.
# Return:
# (Int) The height of the tracklist.
def tracklist_height(track_count)
    return track_count * 58
end

# Draws an unhighlighted TrackGraphic onto the screen.
# Parameters:
# graphic [TrackGraphic] The TrackGraphic to draw.
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# Return:
# (void)
def draw_track_unhighlighted(graphic, x, y)
    graphic.name().draw(x + 16, y + 8, 0, 1, 1, BRIGHT_GRAY)
    graphic.artist().draw(x + 16, y + 32, 0, 1, 1, BRIGHT_GRAY)
end

# Draws a highlighted TrackGraphic for an album track onto the screen.
# Parameters:
# graphic [TrackGraphic] The TrackGraphic to draw.
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# Return:
# (void)
def draw_album_track_highlighted(graphic, x, y)
    Gosu.draw_rect(x, y, 892, 58, BRIGHT_GRAY)
    graphic.name().draw(x + 16, y + 8, 0, 1, 1, DARK_BLUE)
    graphic.artist().draw(x + 16, y + 32, 0, 1, 1, DARK_BLUE)
    draw_plus_icon(1164, y + 21, 1, 0, DARK_BLUE)
end

# Draws a highlighted TrackGraphic for a playlist track onto the screen.
# Parameters:
# graphic [TrackGraphic] The TrackGraphic to draw.
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# Return:
# (void)
def draw_playlist_track_highlighted(graphic, x, y)
    Gosu.draw_rect(x, y, 892, 58, BRIGHT_GRAY)
    graphic.name().draw(x + 16, y + 8, 0, 1, 1, DARK_BLUE)
    graphic.artist().draw(x + 16, y + 32, 0, 1, 1, DARK_BLUE)
    draw_cross_icon(1132, y + 21, 1, 0, DARK_BLUE)
    draw_plus_icon(1164, y + 21, 1, 0, DARK_BLUE)
end