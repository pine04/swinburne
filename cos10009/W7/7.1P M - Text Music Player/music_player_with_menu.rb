require "./input_functions";

module Genre
    POP, CLASSIC, JAZZ, ROCK = *1..4;
end

$genre_names = ["Null", "Pop", "Classic", "Jazz", "Rock"];

class Track
    attr_accessor(:name, :location);

    def initialize(name, location)
        @name = name;
        @location = location;
    end
end

class Album
    attr_accessor(:id, :name, :artist, :year, :genre, :tracks);

    def initialize(id, name, artist, year, genre, tracks)
        @id = id;
        @name = name;
        @artist = artist;
        @year = year;
        @genre = genre;
        @tracks = tracks;
    end
end

def text_music_menu()
    while (true)
        system("cls");
        puts("MAIN MENU");
        puts("1 - Read in albums");
        puts("2 - Display albums");
        puts("3 - Play an album");
        puts("4 - Update an existing album");
        puts("5 - Exit");
        action = read_integer_in_range("Option: ", 1, 5);
        case action
        when 1
            albums = read_album_menu();
        when 2
            display_albums_menu(albums);
        when 3
            play_album_menu(albums);
        when 4
            update_album_menu(albums);
        when 5
            break;
        end
    end
end

def read_album_menu()
    system("cls");
    puts("READ ALBUMS FROM FILE");
    file_name = read_string("Enter file name: ");
    albums = read_albums(file_name);
    puts("Press ENTER to continue.");
    gets();
    return albums;
end

def read_albums(file_name)
    albums = Array.new();
    data_file = File.new(file_name, "r");
    album_count = data_file.gets().to_i();
    for i in 0...album_count
        album = read_album(data_file, i+1);
        albums << album;
    end
    data_file.close();
    return albums;
end

def read_album(file, album_id)
    artist = file.gets().chomp();
    name = file.gets().chomp();
    year = file.gets().to_i();
    genre = file.gets().to_i();
    track_count = file.gets().to_i();
    tracks = Array.new();
    for i in 0...track_count
        track = read_track(file);
        tracks << track;
    end
    return Album.new(album_id, name, artist, year, genre, tracks);
end

def read_track(file)
    name = file.gets().chomp();
    location = file.gets().chomp();
    return Track.new(name, location);
end

def display_albums_menu(albums)
    while (true)
        system("cls");
        puts("DISPLAY ALBUMS");
        puts("1 - All albums");
        puts("2 - All albums of genre");
        puts("3 - Back");
        option = read_integer_in_range("Option: ", 1, 3);
        case (option)
        when 1
            display_albums_all(albums);
        when 2
            display_albums_by_genre(albums);
        when 3
            break;
        end
    end 
end

def display_albums_all(albums)
    system("cls");
    albums.each do |album|
        display_album(album);
    end
    puts("Press ENTER to continue.");
    gets();
end

def display_albums_by_genre(albums);
    system("cls");
    chosen_genre = read_genre();
    matching_albums = albums.filter { |album| next album.genre() == chosen_genre };
    matching_albums.each do |album|
        display_album(album);
    end
    puts("Press ENTER to continue");
    gets();
end

def read_genre()
    puts("SELECT A GENRE");
    for i in 1...$genre_names.length()
        puts("#{i} - #{$genre_names[i]}");
    end
    return read_integer_in_range("Option: ", 1, $genre_names.length()-1);
end

def display_album(album)
    puts();
    puts("#{album.artist()} - #{album.name()}");
    puts("Album number: #{album.id()}");
    puts("Year released: #{album.year()}");
    puts("Genre: #{$genre_names[album.genre()]}");
    puts();
end

def play_album_menu(albums)
    while (true)
        system("cls");
        puts("PLAY AN ALBUM");
        puts("1 - By album number");
        puts("2 - By album name");
        puts("3 - Back");
        action = read_integer_in_range("Option: ", 1, 3);
        case (action)
        when 1
            play_album_by_id(albums);
        when 2
            play_album_by_name(albums);
        when 3
            break;
        end    
    end    
end

def play_album_by_id(albums)
    entered_id = read_integer("Enter the album number to play: ");
    found_id = albums.index{ |album| next album.id() == entered_id };
    if (found_id == nil)
        puts("Album not found.");
        puts("Press ENTER to continue.");
        gets();
    else 
        play_album(albums[found_id]);
    end
end

def play_album_by_name(albums)
    entered_name = read_string("Enter the album name to play: ");
    found_id = albums.index{ |album| next album.name().chomp() == entered_name.chomp()};
    if (found_id == nil)
        puts("Album not found.");
        puts("Press ENTER to continue.");
        gets();
    else 
        play_album(albums[found_id]);
    end
end

def play_album(album)
    system("cls");
    puts("In album #{album.name()} by #{album.artist()}.");
    for i in 0...album.tracks().length()
        puts("#{i+1} - #{album.tracks()[i].name()}");
    end
    entered_track = read_integer("Select track: ");
    if (entered_track - 1 < 0 || entered_track > album.tracks().length())
        puts("Track #{entered_track} not found.");
        gets();
    else
        puts("Playing track #{album.tracks()[entered_track-1].name()} from album #{album.name()}.");
        sleep(3);
    end
end

def update_album_menu(albums)
    system("cls");
    puts("UPDATE AN ALBUM");
    albums.each do |album|
        display_album(album);
    end
    selected_album = read_integer("Enter an album number to update: ");
    found_index = albums.index { |album| album.id() == selected_album }
    if (found_index != nil)
        update_album(albums[found_index]);
    else
        puts("Album not found.");
        puts("Press ENTER to continue.");
        gets();
    end
end

def update_album(album)
    while (true)
        system("cls");
        puts("Updating album #{album.name()} by #{album.artist()}.");
        puts("1 - Update title.");
        puts("2 - Update genre.");
        puts("3 - Return");
        action = read_integer_in_range("Option: ", 1, 3);
        case (action)
        when 1
            update_album_title(album);
        when 2
            update_album_genre(album);
        when 3
            break;
        end
    end
end

def update_album_title(album)
    new_title = read_string("Enter the new title: ");
    album.name = new_title;
    puts("Album title updated.");
    puts("Press ENTER to continue.");
    gets();
end

def update_album_genre(album)
    new_genre = read_genre();
    album.genre = new_genre;
    puts("Album genre updated.");
    puts("Press ENTER to continue.");
    gets();
end

def main()
    text_music_menu();
end

main();
