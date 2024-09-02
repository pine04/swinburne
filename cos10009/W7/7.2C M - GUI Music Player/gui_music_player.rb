require "rubygems";
require "gosu";

# Music is available at https://drive.google.com/drive/folders/1q7dVH3gQxQtJlWklNnC5V5bgjlEZiUSw?usp=share_link
# All the music needed is in the CREDIT LEVEL MUSIC folder.

module ZOrder
	BACKGROUND, PLAYER, UI = *0..2;
end

SCREEN_WIDTH = 800;
SCREEN_HEIGHT = 450;
BACKGROUND_COLOR = Gosu::Color.argb(255, 30, 40, 49);
HIGHLIGHT_COLOR = Gosu::Color.argb(255, 0, 173, 181);
UI_COLOR = Gosu::Color.argb(255, 238, 238, 238);

class Track
	attr_accessor(:name, :location);

	def initialize(name, location)
		@name = name;
		@location = location;
	end
end

class Album
	attr_accessor(:name, :artist, :cover, :tracks);

	def initialize(name, artist, cover, tracks)
		@name = name;
		@artist = artist;
		@cover = cover;
		@tracks = tracks;
	end
end

class MusicPlayerMain < Gosu::Window
	def initialize()
	    super(SCREEN_WIDTH, SCREEN_HEIGHT);
	    self.caption = "Music Player";
		@albums = read_albums("albums.txt");
		@font = Gosu::Font.new(20, options={name: "./Poppins-Regular.ttf"});
		@selected_album = nil;
		@playing_album = nil;
		@track_index = -1;
		@current_song = nil;
	end

	def read_albums(file_name)
		file = File.new(file_name, "r");
		albums = Array.new();
		album_count = file.gets().chomp().to_i();
		for i in 0...album_count
			albums << read_album(file);
		end
		file.close();
		return albums;
	end

	def read_album(file)
		name = file.gets().chomp();
		artist = file.gets().chomp();
		cover_src = file.gets().chomp();
		cover_img = Gosu::Image.new(cover_src);
		track_count = file.gets().chomp().to_i();
		tracks = Array.new();
		for i in 0...track_count
			tracks << read_track(file);
		end
		return Album.new(name, artist, cover_img, tracks);
	end

	def read_track(file)
		name = file.gets().chomp();
		location = file.gets().chomp();
		return Track.new(name, location);
	end

	def play_track(track)
		song = Gosu::Song.new(track.location());
		song.play(false);
		return song;
	end

	def update()
		if (!@current_song || !@current_song.playing?())
			@playing_album = nil;
			@track_index = -1;
		end
	end

	def draw_background()
		Gosu.draw_rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, BACKGROUND_COLOR);
	end

	def draw_albums(albums)
		for i in 0...albums.length()
			if (i % 2 == 0)
				x = 50;
			else
				x = 194;
			end
			y = 50 + 184 * (i / 2);
			draw_album(albums[i], x, y);
		end
	end

	def draw_album(album, x, y)
		scale = 128.to_f() / album.cover().height();
		album.cover().draw(x, y, ZOrder::UI, scale, scale);
		name_text_width = @font.text_width(album.name());
		if (name_text_width > 128)
			chars_to_get = (128.to_f() / name_text_width * album.name().length()).to_i() - 3;
			name = album.name()[0...chars_to_get] + "...";
		else
			name = album.name();
		end
		@font.draw_text(name, x + 64 - @font.text_width(name) / 2, y + 128, 0, 1, 1, UI_COLOR);
		@font.draw_text(album.artist(), x + 64 - @font.text_width(album.artist()) / 2, y + 148, 0, 1, 1, UI_COLOR);
	end

	def draw_track_list(tracks)
		for i in 0...tracks.length()
			@font.draw_text("#{i+1} - #{tracks[i].name()}", 400, 50 + i * 30, 0, 1, 1, UI_COLOR);
		end
	end

	def draw_track_pointer(track_index)
		Gosu.draw_triangle(375, 55 + track_index * 30, HIGHLIGHT_COLOR, 375, 65 + track_index * 30, HIGHLIGHT_COLOR, 390, 60 + track_index * 30, HIGHLIGHT_COLOR, ZOrder::UI);
	end

	def draw_now_playing_text(album, track_index)
		@font.draw_text("Now playing: #{album.tracks()[track_index].name()} - #{album.artist()}", 350, 400, 0, 1, 1, UI_COLOR);
	end
	
	def draw()
		draw_background();
		draw_albums(@albums);
		if (@selected_album != nil)
			draw_track_list(@selected_album.tracks());
		end
		if (@selected_album == @playing_album && @track_index != -1)
			draw_track_pointer(@track_index);
		end
		if (@playing_album && @track_index != -1)
			draw_now_playing_text(@playing_album, @track_index);
		end
	end
	
	def needs_cursor?()
		return true;
	end

	def area_clicked(left_x, top_y, right_x, bottom_y)
		return mouse_x() >= left_x && mouse_x() <= right_x && mouse_y() >= top_y && mouse_y() <= bottom_y;
	end

	def get_album_clicked_on(albums)
		for i in 0...albums.length()
			if (i % 2 == 0)
				left_x = 50;
			else
				left_x = 194;
			end
			top_y = 50 + 184 * (i / 2);
			right_x = left_x + 128;
			bottom_y = top_y + 128;
			if (area_clicked(left_x, top_y, right_x, bottom_y))
				return albums[i];
			end
		end
		return nil;
	end

	def get_track_clicked_on(tracks)
		for i in 0...tracks.length()
			left_x = 400;
			right_x = left_x + @font.text_width(tracks[i].name());
			top_y = 50 + i * 30;
			bottom_y = top_y + 20;
			if (area_clicked(left_x, top_y, right_x, bottom_y))
				return i;
			end
		end
		return -1;
	end	
	
	def button_down(id)
		case (id)
		when Gosu::MS_LEFT
			album = get_album_clicked_on(@albums);
			if (album != nil)
				@selected_album = album;
			end
			if (@selected_album)
				index = get_track_clicked_on(@selected_album.tracks());
				if (index != -1)
					@playing_album = @selected_album;
					@track_index = index;
					@current_song = play_track(@playing_album.tracks()[@track_index]);
				end
			end
		end
	end
end

MusicPlayerMain.new().show() if __FILE__ == $0;
	
