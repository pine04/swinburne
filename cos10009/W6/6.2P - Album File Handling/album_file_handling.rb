module Genre
  	POP, CLASSIC, JAZZ, ROCK = *1..4;
end

$genre_names = ["Null", "Pop", "Classic", "Jazz", "Rock"];

class Album
	attr_accessor(:title, :artist, :genre, :tracks);

	def initialize(title, artist, genre, tracks)
		@title = title;
		@artist = artist;
		@genre = genre;
		@tracks = tracks;
	end
end

class Track
	attr_accessor(:name, :location);

	def initialize(name, location)
		@name = name;
		@location = location;
	end
end

def read_album(file)
	album_artist = file.gets();
	album_title = file.gets();
	album_genre = file.gets().to_i();
	tracks = read_tracks(file);
	album = Album.new(album_title, album_artist, album_genre, tracks);
	return album;
end

def read_tracks(file)
	tracks = Array.new();
	count = file.gets().to_i();
	index = 0;
	while (index < count)
		track = read_track(file);
		tracks << track;
		index += 1;
	end
	return tracks;
end

def read_track(file)
	name = file.gets();
	location = file.gets();
	return Track.new(name, location);
end

def print_album(album)
	puts(album.artist());
	puts(album.title());
	puts("Genre is " + album.genre().to_s());
	puts($genre_names[album.genre()]);
	album.tracks().each do |track|
		puts(track.name());
		puts(track.location());
	end
end

def print_tracks(tracks)
	index = 0;
	count = tracks.length();
	while (index < count)
		print_track(tracks[index]);
		index += 1;
	end
end

def print_track(track)
  	puts("Track title is: " + track.title());
	puts("Track file location is: " + track.location());
end

def main()
	music_file = File.new("album.txt", "r");
	album = read_album(music_file);
	music_file.close();
	print_album(album);
end

main();