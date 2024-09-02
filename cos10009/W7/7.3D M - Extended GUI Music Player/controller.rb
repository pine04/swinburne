require "gosu"
require "./constants.rb"
require "./icon.rb"

# Contains the information and graphical elements of the currently playing track.
# Attributes:
# track_info [Track] The Track object of the playing track.
# track [Gosu::Song] The actual Song object that can be played/paused.
# cover [Gosu::Image] The cover image of the playing track.
# name [Gosu::Image] The name of the playing track in the form of an image to display.
# artist [Gosu::Image] The name of the artist in the form of an image to display.
# collection [Gosu::Image] The name of the collection (album/playlist) the track belongs to in the form of an image to display.
class PlayingTrack
    attr_accessor(:track_info, :track, :cover, :name, :artist, :collection)
    
    def initialize(track)
        @track_info = track
        @track = Gosu::Song.new(track.location())
        @cover = Gosu::Image.new(track.cover())
        @name = Gosu::Image.from_text(track.name(), TEXT_NORMAL, options = {font: POPPINS_BOLD})
        @artist = Gosu::Image.from_text(track.artist(), TEXT_SMALL, options = {font: POPPINS_REGULAR})
        @collection = Gosu::Image.from_text("from #{track.collection()}", TEXT_SMALL, options = {font: POPPINS_ITALIC})
    end
end

# Represents a setlist, which is an array of tracks to play bundled with an index indicating the current track playing in that array.
# Attributes:
# tracks [Array[Track]] The array of tracks to play.
# index [Int] The index of the currently playing track in the setlist.
class Setlist
    attr_accessor(:tracks, :index)

    def initialize(tracks, index, shuffled)
        if (shuffled)
            @tracks = tracks.shuffle()
            @index = get_track_index(@tracks, tracks[index])
        else
            @tracks = tracks.map() {|track| track}
            @index = index
        end
    end
end

# Returns the current track in the setlist.
# Parameter:
# setlist [Setlist] The setlist to get the track from.
# Return:
# (Track) The current track in the setlist.
def get_current_track(setlist)
    return setlist.tracks()[setlist.index()]
end

# Returns the index of the target track in an array of tracks.
# Parameters:
# tracks [Array[Track]] An array of tracks.
# track [Track] The target track.
# Return:
# (Integer or Nil) The index of the target track in the array, or nil if the target track is not in the array.
def get_track_index(tracks, track)
    return tracks.index { |t| next t.name() == track.name() && t.collection() == track.collection() }
end

# Shuffles a setlist. The input setlist will be modified.
# Parameter:
# setlist [Setlist] The setlist to shuffle.
# Return:
# (void)
def shuffle_setlist(setlist)
    current_track = get_current_track(setlist)
    setlist.tracks = setlist.tracks().shuffle()
    setlist.index = get_track_index(setlist.tracks(), current_track)
end

# Unshuffles a setlist. The input setlist will be modified.
# Parameter:
# setlist [Setlist] The setlist to unshuffle.
# Return:
# (void)
def unshuffle_setlist(setlist)
    current_track = get_current_track(setlist)
    setlist.tracks = setlist.tracks().sort { |a, b| next a.number() <=> b.number() }
    setlist.index = get_track_index(setlist.tracks(), current_track)
end

# Returns a boolean value indicating whether or not a track has finished playing.
# Parameter:
# track [Gosu::Song] The target track.
# Return:
# (true/false)
def is_track_finished(track)
    return !track.playing?() && !track.paused?()
end

# Plays a track at a given volume.
# Parameter:
# track [Track] The track to play.
# volume [Int] [default = 1] The desired volume.
# Return:
# (PlayingTrack) The PlayingTrack object associated with the track.
def play_track(window, track, volume = 1)
    window.caption = "#{track.artist()} - #{track.name()}";
    playing_track = PlayingTrack.new(track)
    playing_track.track().play(false)
    playing_track.track().volume = volume
    return playing_track
end

# Pauses or unpauses a track.
# Parameter:
# track [Gosu::Song] The target track.
# Return:
# (void)
def toggle_track(track)
    if (track.paused?())
        track.play()
    else
        track.pause()
    end
end

# Draws the currently playing track at a fixed position on the screen.
# Parameter:
# cover [Gosu::Image] The cover image of the playing track.
# name [Gosu::Image] The name of the playing track as an image to display.
# artist [Gosu::Image] The name of the artist as an image to display.
# collection [Gosu::Image] The collection (album/playlist) of the track as an image to display.
# Return:
# (void)
def draw_playing_track(cover, name, artist, collection)
    scale_x = 64.to_f() / cover.width()
    scale_y = 64.to_f() / cover.height()
    cover.draw(320, 595, 0, scale_x, scale_y)
    name.draw(400, 595, 0, 1, 1, DARK_BLUE)
    artist.draw(400, 619, 0, 1, 1, DARK_BLUE)
    collection.draw(400, 637, 0, 1, 1, DARK_BLUE)
end

# Draws the PREVIOUS button at a fixed position on the screen.
# Parameter:
# (void)
# Return:
# (void)
def draw_prev_button()
    draw_prev_icon(1040, 619, 1, 0, DARK_BLUE)
end

# Draws the PLAY/PAUSE button at a fixed position on the screen.
# Parameter:
# paused [Boolean] A Boolean value indicating whether the playing track is paused or not.
# Return:
# (void)
def draw_play_pause_button(paused)
    if (paused)
        draw_play_icon(1072, 619, 1, 0, DARK_BLUE)
    else
        draw_pause_icon(1072, 619, 1, 0, DARK_BLUE)
    end
end

# Draws the NEXT button at a fixed position on the screen.
# Parameter:
# (void)
# Return:
# (void)
def draw_next_button()
    draw_next_icon(1104, 619, 1, 0, DARK_BLUE)
end

# Draws the shuffle/unshuffle button at a fixed position on the screen.
# Parameter:
# shuffled [Boolean] A boolean value indicating whether the player in shuffle or not.
# Return:
# (void)
def draw_shuffle_button(shuffled)
    if (shuffled)
        draw_unshuffle_icon(1136, 619, 1, 0, DARK_BLUE)
    else
        draw_shuffle_icon(1136, 619, 1, 0, DARK_BLUE)
    end
end

# Draws the loop/unloop button at a fixed position on the screen.
# Parameter:
# looping [Boolean] A boolean value indicating whether the player in looping or not.
# Return:
# (void)
def draw_loop_button(looping)
    if (looping)
        draw_unloop_icon(1168, 619, 1, 0, DARK_BLUE)
    else
        draw_loop_icon(1168, 619, 1, 0, DARK_BLUE)
    end
end

# Draws the volume bar at a fixed position on the screen.
# Parameter:
# volume [Float] [from 0 to 1] The current volume.
# Return:
# (void)
def draw_volume_bar(volume)
    Gosu.draw_rect(924, 623, 100, 8, DARK_GRAY)
    Gosu.draw_rect(924, 623, 100 * volume, 8, LIGHT_TEAL)
    Gosu.draw_rect(918 + 100 * volume, 621, 12, 12, LIGHT_TEAL)
end