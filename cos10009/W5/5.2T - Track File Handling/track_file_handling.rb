class Track
	attr_accessor(:name, :location);

	def initialize(name, location)
		@name = name;
		@location = location;
	end
end

def read_tracks(music_file)
	tracks = Array.new();
	count = music_file.gets().to_i();

	index = 0;
	while (index < count)
		track = read_track(music_file);
		tracks << track;
		index += 1;
	end

	return tracks;
end

def read_track(a_file)
	name = a_file.gets();
	location = a_file.gets();
	return Track.new(name, location);
end

def print_tracks(tracks)
	count = tracks.length();
	index = 0;
	while (index < count)
		print_track(tracks[index]);
		index += 1;
	end
end

def print_track(track)
	puts(track.name);
	puts(track.location);
end

def main()
	a_file = File.new("input.txt", "r");
	tracks = read_tracks(a_file);
	print_tracks(tracks);
	a_file.close();
end

main();

