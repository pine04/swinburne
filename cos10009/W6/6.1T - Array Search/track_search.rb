require "./input_functions";

class Track
	attr_accessor(:name, :location);

	def initialize(name, location)
		@name = name;
		@location = location;
	end
end

def read_track(music_file)
	name = music_file.gets();
	location = music_file.gets();
	return Track.new(name, location);
end

def read_tracks(music_file)
	count = music_file.gets().to_i();
	tracks = Array.new();
	index = 0;
	while (index < count)
		track = read_track(music_file);
		tracks << track;
		index += 1;
	end
	return tracks;
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
	puts(track.name);
	puts(track.location);
end

def search_for_track_name(tracks, search_string)
	found_index = -1;
	index = 0;
	count = tracks.length();
	while (index < count)
		if (tracks[index].name.chomp() == search_string.chomp())
			found_index = index;
		end
		index += 1;
	end
	return found_index;
end

def main()
  	music_file = File.new("album.txt", "r");
	tracks = read_tracks(music_file);
    print_tracks(tracks);
  	music_file.close();

  	search_string = read_string("Enter the track name you wish to find: ");
  	index = search_for_track_name(tracks, search_string);
  	if (index != -1)
   		puts("Found " + tracks[index].name() + " at " + index.to_s());
  	else
    	puts("Entry not Found");
  	end
end

main();

