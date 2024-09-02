require "gosu"
require "fileutils"
require "./constants.rb"
require "./track.rb"
require "./playlist.rb"
require "./library.rb"
require "./tracklist.rb"
require "./controller.rb"
require "./viewport.rb"
require "./status_box.rb"

class MusicPlayerMain < Gosu::Window
    # Called by Gosu at the start. Initializes all necessary variables.
    def initialize()
        super(SCREEN_WIDTH, SCREEN_HEIGHT)
		self.caption = "Extended GUI Music Player"
        
        @library_view_mode = :ALBUM
        @library_album_tab = Gosu::Image.from_text("Albums", TEXT_LARGE, options = {font: POPPINS_BOLD})
        @library_playlist_tab = Gosu::Image.from_text("Playlists", TEXT_LARGE, options = {font: POPPINS_BOLD})
        @albums = read_albums("albums.txt")
        @playlists = read_playlists("playlists.txt")
        @album_graphics = create_album_graphics(@albums)
        @playlist_graphics = create_playlist_graphics(@playlists)
        @library_viewport = Viewport.new(0, 62, 304, 583, 62, album_library_height(@albums.length())) 

        @tracklist = @albums[0].tracks()
		@track_graphics = create_track_graphics(@tracklist)
        @tracklist_title = Gosu::Image.from_text(@albums[0].name(), TEXT_LARGE, options = {font: POPPINS_BOLD})
        @tracklist_type = :ALBUM
		@tracklist_viewport = Viewport.new(304, 62, 896, 501, 62, tracklist_height(@tracklist.length()))

        @selected_track = -1
        @popup_active = false
        @popup_x = 0
        @popup_y = 0
        @popup_viewport = Viewport.new(0, 34, 150, 166, 34, @playlists.length() * 30)

        @setlist = nil
        @queue = []
		@playing_track = nil
        @volume = 1.0
        @shuffled = false
        @looping = false

        @focused = true
        @status_box = StatusBox.new()
    end

    # Called by Gosu when the user drops a file into the game window. Used exclusively to change the cover image of playlists.
    def drop(file_name)
        if (@library_view_mode == :PLAYLIST)
            playlist_dropped_on = playlist_mouse_over()
            if (playlist_dropped_on != -1)
                FileUtils.cp(file_name, "./images")
                new_cover = "./images/" + file_name.split("\\").last()
                @playlists[playlist_dropped_on].cover = new_cover
                @playlist_graphics[playlist_dropped_on].cover = Gosu::Image.new(new_cover)
                write_playlists("playlists.txt", @playlists)
            end
        end
    end

    # Called by Gosu when the window gains focus. Switches the @focused flag to true.
    def gain_focus()
        @focused = true
    end

    # Called by Gosu when the window loses focus. Switches the @focused flag to false.
    def lose_focus()
        @focused = false
    end

    # Requires the cursor to be visible on the screen.
	def needs_cursor?()
		return true
	end

    # Takes the dimensions of a rectangular region of the screen and returns a boolean value indicating whether or not the user's mouse is over that region.
    # Takes as optional parameters the dimensions of a clip region. If the said rectangular region is partly outside the clip region, this excess bit is ignored.
    # Always returns false if the window is out of focus.
    def mouse_over?(x, y, width, height, clip_x = 0, clip_y = 0, clip_width = SCREEN_WIDTH, clip_height = SCREEN_HEIGHT)
        if (!@focused)
            return false
        end
        left = [x, clip_x].max()
        right = [x + width, clip_x + clip_width].min()
        top = [y, clip_y].max()
        bot = [y + height, clip_y + clip_height].min()
        return mouse_x() > left && mouse_x() < right && mouse_y() > top && mouse_y() < bot
    end

    # Called on every update. Attempts to automatically play the next track, either from the queue or from the setlist.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def auto_play()
        if (@playing_track == nil || is_track_finished(@playing_track.track()))
            if (@playing_track != nil && @looping)
                @playing_track = play_track(self, @playing_track.track_info(), @volume)
            else
                @playing_track = nil
                if (@queue.length() > 0)
                    @playing_track = play_track(self, @queue.shift(), @volume)
                else
                    if (@setlist != nil)
                        @setlist.index = (@setlist.index() + 1) % @setlist.tracks().length()
                        @playing_track = play_track(self, get_current_track(@setlist), @volume)
                    end
                end
            end
        end
    end

	def update()
        auto_play()
		if (@library_viewport.scrollbar_active())
            drag_scrollbar(@library_viewport, mouse_y())
        end
		if (@tracklist_viewport.scrollbar_active())
            drag_scrollbar(@tracklist_viewport, mouse_y())
        end
		if (@popup_viewport.scrollbar_active())
            drag_scrollbar(@popup_viewport, mouse_y())
        end
        if (Gosu.button_down?(Gosu::MS_LEFT) && mouse_over?(924, 623, 100, 8))
            @volume = (mouse_x() - 924).to_f() / 100
            if (@playing_track) 
                @playing_track.track().volume = @volume
            end
        end
	end

    # Draws the background for the window.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_background()
        Gosu.draw_rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, DARK_BLUE)
    end    

    # Draws the background for the library.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_library_background()
        Gosu.draw_rect(0, 0, 304, 675, DARK_GRAY)
    end    

    # Draws the background for the controller.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_controller_background()
        Gosu.draw_rect(304, 579, 896, 96, BRIGHT_GRAY)
    end
    
    # Draws all albums onto the screen in 2 columns.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_album_graphics()
        Gosu.clip_to(@library_viewport.x(), @library_viewport.y(), @library_viewport.width(), @library_viewport.height()) do
            for i in 0...@album_graphics.length()
                if (i % 2 == 0)
                    x = 16
                else
                    x = 160
                end
                y = @library_viewport.content_top() + (i / 2) * 186
                draw_album_graphic(@album_graphics[i], x, y)
            end
        end
    end

    # Draws all playlists onto the screen in 2 columns.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_playlist_graphics()
        Gosu.clip_to(@library_viewport.x(), @library_viewport.y(), @library_viewport.width(), @library_viewport.height()) do
            for i in 0...@playlist_graphics.length()
                if (i % 2 == 0)
                    x = 16
                else
                    x = 160
                end
                y = @library_viewport.content_top() + (i / 2) * 168
                draw_playlist_graphic(@playlist_graphics[i], x, y)
            end
        end
    end

    # Draws all tracks onto the screen.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_track_graphics()
        Gosu.clip_to(@tracklist_viewport.x(), @tracklist_viewport.y(), @tracklist_viewport.width(), @tracklist_viewport.height()) do
            for i in 0...@track_graphics.length()
                x = 304
                y = @tracklist_viewport.content_top() + i * 58
                if (@selected_track != -1)
                    if (i == @selected_track)
                        case (@tracklist_type)
                        when :ALBUM
                            draw_album_track_highlighted(@track_graphics[i], x, y)
                        when :PLAYLIST
                            draw_playlist_track_highlighted(@track_graphics[i], x, y)
                        end
                    else
                        draw_track_unhighlighted(@track_graphics[i], x, y)
                    end
                else
                    if (mouse_over?(x, y, 892, 58, @tracklist_viewport.x(), @tracklist_viewport.y(), @tracklist_viewport.width(), @tracklist_viewport.height()))
                        case (@tracklist_type)
                        when :ALBUM
                            draw_album_track_highlighted(@track_graphics[i], x, y)
                        when :PLAYLIST
                            draw_playlist_track_highlighted(@track_graphics[i], x, y)
                        end
                    else
                        draw_track_unhighlighted(@track_graphics[i], x, y)
                    end
                end
            end
        end
    end

    # Draws the library, including the library background, library tabs, album/playlist list and scrollbar.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_library()
        draw_library_background()
        case (@library_view_mode)
        when :ALBUM
            @library_album_tab.draw(16, 16, 0, 1, 1, BRIGHT_GRAY)
            @library_playlist_tab.draw(@library_album_tab.width() + 32, 16, 0, 1, 1, BRIGHT_GRAY_FADE)
            draw_album_graphics()
        when :PLAYLIST
            @library_album_tab.draw(16, 16, 0, 1, 1, BRIGHT_GRAY_FADE)
            @library_playlist_tab.draw(@library_album_tab.width() + 32, 16, 0, 1, 1, BRIGHT_GRAY)
            draw_playlist_graphics()
            if (@playlist_graphics.length() % 2 == 0)
                x = 16
            else
                x = 160
            end
            y = @library_viewport.content_top() + (@playlist_graphics.length() / 2) * 168
            draw_playlist_add_button(x, y)
        end
        draw_viewport_scrollbar(@library_viewport)
    end

    # Draws the tracklist, including the tracklist title, tracks and scrollbar.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_tracklist()
        @tracklist_title.draw(320, 16)
        draw_track_graphics()
        draw_viewport_scrollbar(@tracklist_viewport)
    end

    # Draws the controller, including the controller background, the currently playing track (if any) and the control buttons.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_controller()
        draw_controller_background()
        if (@playing_track != nil)
            draw_playing_track(@playing_track.cover(), @playing_track.name(), @playing_track.artist(), @playing_track.collection())
        end
        draw_prev_button()
        if (@playing_track != nil)
            paused = @playing_track.track().paused?()
        else
            paused = true
        end
        draw_play_pause_button(paused)
        draw_next_button()
        draw_shuffle_button(@shuffled)
        draw_loop_button(@looping)
        draw_volume_bar(@volume)
    end

    # Draws the small status box at the bottom left corner of the screen.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_status_box()
        if (Gosu.milliseconds() > @status_box.last_activated() && Gosu.milliseconds() - @status_box.last_activated() < 4000)
            opacity = 1.0 / (1.0 + 2.71828 ** (10 * ((Gosu.milliseconds() - @status_box.last_activated()).to_f() / 1000) - 35)) * 255
            draw_status_message(@status_box.message(), opacity)
        end
    end

    # Draws the popup box when it is active.
    # Parameter:
    # (void)
    # Return:
    # (void)
    def draw_popup()
        if (@popup_active)
            Gosu.draw_rect(@popup_x, @popup_y, 150, 200, DARK_GRAY)
            Gosu::Image.from_text("Add to playlist", TEXT_SMALL, options = {font: POPPINS_BOLD}).draw(@popup_x + 8, @popup_y + 8, 0, 1, 1, BRIGHT_GRAY)
            Gosu.clip_to(@popup_viewport.x(), @popup_viewport.y(), @popup_viewport.width(), @popup_viewport.height()) do
                for i in 0...@playlists.length()
                    if (mouse_over?(@popup_x, @popup_viewport.content_top() + i * 30, 146, 30))
                        bg_color = BRIGHT_GRAY
                        text_color = DARK_GRAY
                    else
                        bg_color = DARK_GRAY
                        text_color = BRIGHT_GRAY
                    end
                    Gosu.draw_rect(@popup_x, @popup_viewport.content_top() + i * 30, 146, 30, bg_color)
                    tab = Gosu::Image.from_text(@playlists[i].name(), TEXT_NORMAL, options = {font: POPPINS_REGULAR})
                    tab.draw(@popup_x + 8, @popup_viewport.content_top() + i * 30 + 3, 0, 1, 1, text_color)
                end
            end
            draw_viewport_scrollbar(@popup_viewport)
        end
    end

    def draw()
        draw_background()
        draw_library()
        draw_tracklist()
        draw_controller()
        draw_status_box()
        draw_popup()
    end

    # Returns the index of the album the user's mouse is over.
    # Parameter:
    # (void)
    # Return:
    # (Int) The index of the album. -1 if the user is not hovering on any album.
    def album_mouse_over()
        index = -1
        for i in 0...@album_graphics.length()
            if (i % 2 == 0)
                x = 16
            else
                x = 160
            end
            y = @library_viewport.content_top() + (i / 2) * 186
            if (mouse_over?(x, y, 128, 128, @library_viewport.x(), @library_viewport.y(), @library_viewport.width(), @library_viewport.height()))
                index = i
            end
        end
        return index
    end

    # Returns the index of the playlist the user's mouse is over.
    # Parameter:
    # (void)
    # Return:
    # (Int) The index of the playlist. -1 if the user is not hovering on any playlist.
    def playlist_mouse_over()
        index = -1
        for i in 0...@playlist_graphics.length()
            if (i % 2 == 0)
                x = 16
            else
                x = 160
            end
            y = @library_viewport.content_top() + (i / 2) * 168
            if (mouse_over?(x, y, 128, 128, @library_viewport.x(), @library_viewport.y(), @library_viewport.width(), @library_viewport.height()))
                index = i
            end
        end
        return index
    end

    # Returns the index of the playlist whose delete button the user's mouse is over.
    # Parameter:
    # (void)
    # Return:
    # (Int) The index of the playlist. -1 if the user is not hovering on any playlist.
    def playlist_mouse_over_delete()
        index = -1
        for i in 0...@playlist_graphics.length()
            if (i % 2 == 0)
                x = 120
            else
                x = 264
            end
            y = @library_viewport.content_top() + (i / 2) * 168
            if (mouse_over?(x, y, 24, 24, @library_viewport.x(), @library_viewport.y(), @library_viewport.width(), @library_viewport.height()))
                index = i
            end
        end
        return index
    end

    # Returns the index of the track the user's mouse is over.
    # Parameter:
    # (void)
    # Return:
    # (Int) The index of the track. -1 if the user is not hovering on any track.
    def track_mouse_over()
        index = -1
        for i in 0...@track_graphics.length()
            x = 304
            y = @tracklist_viewport.content_top() + i * 58
            if (mouse_over?(x, y, 892, 58, @tracklist_viewport.x(), @tracklist_viewport.y(), @tracklist_viewport.width(), @tracklist_viewport.height()))
                index = i
            end
        end
        return index
    end

    # Returns the index of the track whose queue button the user's mouse is over.
    # Parameter:
    # (void)
    # Return:
    # (Int) The index of the track to add to queue. -1 if the user is not hovering on any track.
    def track_mouse_over_queue()
        index = -1
        for i in 0...@track_graphics.length()
            x = 1164
            y = @tracklist_viewport.content_top() + i * 58 + 21
            if (mouse_over?(x, y, 16, 16, @tracklist_viewport.x(), @tracklist_viewport.y(), @tracklist_viewport.width(), @tracklist_viewport.height()))
                index = i
            end
        end
        return index
    end

    # Returns the index of the track whose "remove from playlist" button the user's mouse is over.
    # Parameter:
    # (void)
    # Return:
    # (Int) The index of the track to delete. -1 if the user is not hovering on any track.
    def track_mouse_over_delete()
        index = -1
        for i in 0...@track_graphics.length()
            x = 1132
            y = @tracklist_viewport.content_top() + i * 58 + 21
            if (mouse_over?(x, y, 16, 16, @tracklist_viewport.x(), @tracklist_viewport.y(), @tracklist_viewport.width(), @tracklist_viewport.height()))
                index = i
            end
        end
        return index
    end

    def button_down(id)
        case (id)
        when Gosu::MS_LEFT
            # Handles click events associated with the popup. When the user clicks outside of the popup, it should close.
            if (@popup_active)
                if (mouse_over?(@popup_x, @popup_y, 150, 200))
                    # Activates the popup scrollbar if the user clicks on it.
                    popup_sb_dimension = scrollbar_dimension(@popup_viewport)
                    if (mouse_over?(popup_sb_dimension[0], popup_sb_dimension[1], popup_sb_dimension[2], popup_sb_dimension[3]))
                        activate_scrollbar(@popup_viewport, mouse_y())
                    end
                    # Adds the currently selected track to the corresponding playlist the user clicked on.
                    for i in 0...@playlists.length()
                        x = @popup_x
                        y = @popup_viewport.content_top() + i * 30
                        if (mouse_over?(x, y, 150, 30, @popup_viewport.x(), @popup_viewport.y(), @popup_viewport.width(), @popup_viewport.height()))
                            new_track_name = @tracklist[@selected_track].name()
                            new_track_artist = @tracklist[@selected_track].artist()
                            new_track_collection = @playlists[i].name()
                            new_track_number = @playlists[i].tracks().length() + 1
                            new_track_cover = @tracklist[@selected_track].cover()
                            new_track_location = @tracklist[@selected_track].location()
                            push_message(@status_box, "Added track #{new_track_name} to playlist #{new_track_collection}.")
                            @playlists[i].tracks() << Track.new(new_track_name, new_track_artist, new_track_collection, new_track_number, new_track_cover, new_track_location)
                            write_playlists("playlists.txt", @playlists)
                        end
                    end
                    # Terminates the function early so that the click events for the elements beneath the popup will be ignored.
                    return
                else
                    # Closes the popup when the user clicks outside of it.
                    @selected_track = -1
                    @popup_active = false
                end
            end

            # Handles click events associated with the library.
            # Switches library tabs when the user clicks on either "Albums" or "Playlists".
            if (mouse_over?(16, 16, @library_album_tab.width(), @library_album_tab.height()))
                @library_view_mode = :ALBUM
                @library_viewport.content_top = @library_viewport.y()
                @library_viewport.content_height = album_library_height(@album_graphics.length())
            end
            if (mouse_over?(@library_album_tab.width() + 32, 16, @library_album_tab.width(), @library_playlist_tab.height()))
                @library_view_mode = :PLAYLIST
                @library_viewport.content_top = @library_viewport.y()
                @library_viewport.content_height = playlist_library_height(@playlist_graphics.length())
            end
            if (@library_view_mode == :ALBUM)
                # Changes the tracklist to this album's tracklist when the user clicks on it.
                album_clicked = album_mouse_over()
                if (album_clicked != -1)
                    @tracklist = @albums[album_clicked].tracks()
                    @track_graphics = create_track_graphics(@tracklist)
                    @tracklist_title = Gosu::Image.from_text(@albums[album_clicked].name(), TEXT_LARGE, options = {font: POPPINS_BOLD})
                    @tracklist_type = :ALBUM
                    @tracklist_viewport.content_top = @tracklist_viewport.y()
                    @tracklist_viewport.content_height = tracklist_height(@track_graphics.length())
                end
            elsif (@library_view_mode == :PLAYLIST)
                # Creates a new playlist when the user clicks on the "Add playlist" button.
                if (@playlist_graphics.length() % 2 == 0)
                    x = 16
                else
                    x = 160
                end
                y = @library_viewport.content_top() + (@playlist_graphics.length() / 2) * 168
                if (mouse_over?(x, y, 128, 128, @library_viewport.x(), @library_viewport.y(), @library_viewport.width(), @library_viewport.height()))
                    playlist = Playlist.new("Playlist ##{@playlists.length() + 1}", "./images/playlist-default.png", [])
                    @playlists << playlist
                    playlist_graphic = PlaylistGraphic.new(playlist.name(), playlist.cover())
                    @playlist_graphics << playlist_graphic
                    @library_viewport.content_height = playlist_library_height(@playlist_graphics.length())
                    push_message(@status_box, "Created playlist.")
                    write_playlists("playlists.txt", @playlists)
                end
                # Deletes a playlist when the user clicks on the delete button at the top right corner of it.
                playlist_deleted = playlist_mouse_over_delete()
                if (playlist_deleted != -1)
                    push_message(@status_box, "Deleted playlist #{@playlists[playlist_deleted].name()}.")
                    @playlists.delete_at(playlist_deleted)
                    @playlist_graphics.delete_at(playlist_deleted)
                    write_playlists("playlists.txt", @playlists)
                end
                # Changes the tracklist to this playlist's tracklist when the user clicks on it.
                playlist_clicked = playlist_mouse_over()
                if (playlist_clicked != -1 && playlist_clicked != playlist_deleted)
                    @tracklist = @playlists[playlist_clicked].tracks()
                    @track_graphics = create_track_graphics(@tracklist)
                    @tracklist_title = Gosu::Image.from_text(@playlists[playlist_clicked].name(), TEXT_LARGE, options = {font: POPPINS_BOLD})
                    @tracklist_type = :PLAYLIST
                    @tracklist_viewport.content_top = @tracklist_viewport.y()
                    @tracklist_viewport.content_height = tracklist_height(@track_graphics.length())
                end
            end
            # Activates the library scrollbar if the user clicks on it.
            library_sb_dimension = scrollbar_dimension(@library_viewport)
            if (mouse_over?(library_sb_dimension[0], library_sb_dimension[1], library_sb_dimension[2], library_sb_dimension[3]))
                activate_scrollbar(@library_viewport, mouse_y())
            end

            # Handles click events associated with the tracklist.
            # Removes a track from a playlist when the user clicks on the X button (only for tracklists belonging to a playlist).
            if (@tracklist_type == :PLAYLIST)
                track_removed = track_mouse_over_delete()
                if (track_removed != -1)
                    push_message(@status_box, "Deleted track #{@tracklist[track_removed].name()}.")
                    @tracklist.delete_at(track_removed)
                    @track_graphics.delete_at(track_removed)
                    write_playlists("playlists.txt", @playlists)
                end
            else
                track_removed = -1
            end
            # Adds a track to the queue.
            track_to_queue = track_mouse_over_queue()
            if (track_to_queue != -1 && track_to_queue != track_removed)
                @queue.push(@tracklist[track_to_queue])
                push_message(@status_box, "Pushed track #{@tracklist[track_to_queue].name()} to the queue.")
            end
            # Plays the track the user clicks on and updates the setlist to the one containing the clicked track.
            track_clicked = track_mouse_over()
            if (track_clicked != -1 && track_clicked != track_removed && track_clicked != track_to_queue)
                @setlist = Setlist.new(@tracklist, track_clicked, @shuffled)
                @playing_track = play_track(self, get_current_track(@setlist), @volume)
            end
            # Activates the tracklist scrollbar if the user clicks on it.
            tracklist_sb_dimension = scrollbar_dimension(@tracklist_viewport)
            if (mouse_over?(tracklist_sb_dimension[0], tracklist_sb_dimension[1], tracklist_sb_dimension[2], tracklist_sb_dimension[3]))
                activate_scrollbar(@tracklist_viewport, mouse_y())
            end

            # Handles click events associated with the controller.
            # If the mouse is over the play/pause button, play or pause the currently playing track.
            if (mouse_over?(1072, 619, 16, 16) && @playing_track)
                toggle_track(@playing_track.track())
            end
            # If the mouse is over the PREV button, stop the current track (if any) and play the previous track in the setlist.
            if (mouse_over?(1040, 619, 16, 16))
                if (@playing_track != nil)
                    @playing_track.track().stop()
                    @playing_track = nil
                end
                if (@setlist != nil)
                    @setlist.index = (@setlist.index() - 1) % @setlist.tracks().length()
                    @playing_track = play_track(self, get_current_track(@setlist), @volume)
                end
            end
            # If the mouse is over the NEXT button, stop the current track (if any) and either play the next song in the queue or in the setlist.
            if (mouse_over?(1104, 619, 16, 16))
                if (@playing_track != nil)
                    @playing_track.track().stop()
                    @playing_track = nil
                end
                if (@queue.length() > 0)
                    @playing_track = play_track(self, @queue.shift(), @volume)
                else
                    if (@setlist != nil)
                        @setlist.index = (@setlist.index() + 1) % @setlist.tracks().length()
                        @playing_track = play_track(self, get_current_track(@setlist), @volume)
                    end
                end
            end
            # If the mouse is over the SHUFFLE/UNSHUFFLE button, shuffle/unshuffle the setlist accordingly.
            if (mouse_over?(1136, 619, 16, 16))
                if (@setlist != nil)
                    if (@shuffled)
                        unshuffle_setlist(@setlist)
                    else
                        shuffle_setlist(@setlist)
                    end
                end
                @shuffled = !@shuffled
            end
            # If the mouse is over the LOOPING/UNLOOPING button, flip the @looping flag.
            if (mouse_over?(1168, 619, 16, 16))
                @looping = !@looping
            end
        when Gosu::MS_RIGHT
            # Activates the popup if the user right-clicks on a track.
            track_clicked = track_mouse_over()
            if (track_clicked != -1)
                @popup_active = true
                @selected_track = track_clicked
                @popup_x = mouse_x().clamp(0, 1050)
                @popup_y = mouse_y().clamp(0, 475)
                @popup_viewport.x = @popup_x
                @popup_viewport.y = @popup_viewport.content_top = @popup_y + 34
                @popup_viewport.content_height = @playlists.length() * 30
            end
        when Gosu::MS_WHEEL_DOWN
            # Scrolls the content in the popup.
			if (@popup_active && mouse_over?(@popup_viewport.x(), @popup_viewport.y(), @popup_viewport.width(), @popup_viewport.height()))
                scroll_viewport_content(@popup_viewport, -40)
                return
            end
            # Scrolls the content in the library.
            if (mouse_over?(@library_viewport.x(), @library_viewport.y(), @library_viewport.width(), @library_viewport.height()))
                scroll_viewport_content(@library_viewport, -40)
            end
            # Scrolls the content in the tracklist.
			if (mouse_over?(@tracklist_viewport.x(), @tracklist_viewport.y(), @tracklist_viewport.width(), @tracklist_viewport.height()))
                scroll_viewport_content(@tracklist_viewport, -40)
            end
        when Gosu::MS_WHEEL_UP
            # Scrolls the content in the popup.
			if (@popup_active && mouse_over?(@popup_viewport.x(), @popup_viewport.y(), @popup_viewport.width(), @popup_viewport.height()))
                scroll_viewport_content(@popup_viewport, 40)
                return
            end
            # Scrolls the content in the library.
            if (mouse_over?(@library_viewport.x(), @library_viewport.y(), @library_viewport.width(), @library_viewport.height()))
                scroll_viewport_content(@library_viewport, 40)
            end
            # Scrolls the content in the tracklist.
			if (mouse_over?(@tracklist_viewport.x(), @tracklist_viewport.y(), @tracklist_viewport.width(), @tracklist_viewport.height()))
                scroll_viewport_content(@tracklist_viewport, 40)
            end
        when Gosu::KB_UP
            # Increases the volume if the UP ARROW is pressed.
            @volume = (@volume + 0.1).clamp(0, 1)
            if (@playing_track != nil)
                @playing_track.track().volume = @volume
            end
        when Gosu::KB_DOWN
            # Decreases the volume if the DOWN ARROW is pressed.
            @volume = (@volume - 0.1).clamp(0, 1)
            if (@playing_track != nil)
                @playing_track.track().volume = @volume
            end
        end
    end

    # Used exclusively to deactivate all scrollbars when the user lets go of the left mouse.
    def button_up(id)
        if (id == Gosu::MS_LEFT)
            deactivate_scrollbar(@library_viewport)
            deactivate_scrollbar(@tracklist_viewport)
            deactivate_scrollbar(@popup_viewport)
        end
    end
end

MusicPlayerMain.new().show() if __FILE__ == $0