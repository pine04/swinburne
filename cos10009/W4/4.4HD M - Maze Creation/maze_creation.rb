require "gosu";

module ZOrder
	BACKGROUND, MIDDLE, TOP = *0..2;
end

MAP_WIDTH = 200;
MAP_HEIGHT = 200;
CELL_DIM = 20;

class Cell
	attr_accessor(:north, :south, :east, :west, :vacant, :visited, :on_path);
	
	def initialize()
		@north = nil;
		@south = nil;
		@east = nil;
		@west = nil;
		@vacant = false; # true when it is not a wall
		@visited = false;
		@on_path = false;
	end
end

class GameWindow < Gosu::Window
	def initialize()
		super(MAP_WIDTH, MAP_HEIGHT, false);
		self.caption = "Map Creation";
		@path = nil;
		
		x_cell_count = MAP_WIDTH / CELL_DIM;
		y_cell_count = MAP_HEIGHT / CELL_DIM;
		
		@columns = Array.new(x_cell_count);
		column_index = 0;
		row_index = 0;
		
		while (column_index < x_cell_count)
			row = Array.new(y_cell_count);
			@columns[column_index] = row;
			row_index = 0;
			while (row_index < y_cell_count)
				cell = Cell.new();
				@columns[column_index][row_index] = cell;
				row_index += 1;
			end
			column_index += 1;
		end

		column_count = @columns.length();
		row_count = @columns[0].length();
		column_index = 0;
		row_index = 0;
		while (column_index < column_count)
			row_index = 0;
			while (row_index < row_count)
				if (column_index > 0)
					@columns[column_index][row_index].west = @columns[column_index-1][row_index];
				end
				if (column_index < column_count - 1)
					@columns[column_index][row_index].east = @columns[column_index+1][row_index];
				end
				if (row_index > 0)
					@columns[column_index][row_index].north = @columns[column_index][row_index-1];
				end
				if (row_index < row_count - 1)
					@columns[column_index][row_index].south = @columns[column_index][row_index+1];
				end
				row_index += 1;
			end
			column_index += 1;
		end

		display_adjacent_cells();
	end

	def display_adjacent_cells()
		cols = @columns.length();
		rows = @columns[0].length();
		col_index = 0;
		row_index = 0;
		while (col_index < cols)
			row_index = 0;
			while (row_index < rows)
				print("Cell x: #{col_index}, y: #{row_index}, north: ");
				if (@columns[col_index][row_index].north())
					print("1");
				else
					print("0");
				end
				print(", south: ");
				if (@columns[col_index][row_index].south())
					print("1");
				else
					print("0");
				end
				print(", east: ");
				if (@columns[col_index][row_index].east())
					print("1");
				else
					print("0");
				end
				print(", west: ");
				if (@columns[col_index][row_index].west())
					print("1");
				else
					print("0");
				end
				print("\n");
				row_index += 1;
			end
			puts("----------END OF COLUMN----------");
			col_index += 1;
		end
	end

	def needs_cursor?()
		return true;
	end

	def mouse_over_cell()
		if (mouse_x() <= CELL_DIM)
			cell_x = 0;
		else
			cell_x = (mouse_x() / CELL_DIM).to_i();
		end
		
		if (mouse_y() <= CELL_DIM)
			cell_y = 0;
		else
			cell_y = (mouse_y() / CELL_DIM).to_i();
		end
		
		return [cell_x, cell_y];
	end

	def search(cell_x, cell_y)
		if (cell_x == ((MAP_WIDTH / CELL_DIM) - 1))
			if (ARGV.length() > 0)
				puts("End of one path x: " + cell_x.to_s() + " y: " + cell_y.to_s());
			end
			return [[cell_x,cell_y]];
		else			
			north_path = nil;
			west_path = nil;
			east_path = nil;
			south_path = nil;

			if (ARGV.length() > 0)
				puts("Searching. In cell x: " + cell_x.to_s() + " y: " + cell_y.to_s());
			end

			# CODE MISSING. To be added in Week 10.

			if (north_path != nil)
				path = north_path;
			elsif (south_path != nil)
				path = south_path;
			elsif (east_path != nil)
				path = east_path;
			elsif (west_path != nil)
				path = west_path;
			end
			
			if (path != nil)
				if (ARGV.length() > 0)
					puts("Added x: " + cell_x.to_s() + " y: " + cell_y.to_s());
				end
				return [[cell_x,cell_y]].concat(path);
			else
				if (ARGV.length() > 0)
					puts("Dead end x: " + cell_x.to_s() + " y: " + cell_y.to_s());
				end
				return nil;
			end
		end
	end

	def button_down(id)
		case id
		when Gosu::MS_LEFT
			cell = mouse_over_cell();
			if (ARGV.length() > 0)
				puts("Cell clicked on is x: " + cell[0].to_s() + " y: " + cell[1].to_s());
			end
			@columns[cell[0]][cell[1]].vacant = true;
		when Gosu::MS_RIGHT
			cell = mouse_over_cell();
			@path = search(cell[0],cell[1]);
		end
	end

	def walk(path)
		index = path.length();
		count = 0;
		while (count < index)
			cell = path[count];
			@columns[cell[0]][cell[1]].on_path = true;
			count += 1;
		end
	end

	def update()
		if (@path != nil)
			if (ARGV.length() > 0)
				puts("Displaying path");
				puts(@path.to_s());
			end
			walk(@path);
			@path = nil;
		end
	end

	def draw()
		x_cell_count = MAP_WIDTH / CELL_DIM;
		y_cell_count = MAP_HEIGHT / CELL_DIM;
		column_index = 0;
		while (column_index < x_cell_count)
			row_index = 0;
			while (row_index < y_cell_count)				
				if (@columns[column_index][row_index].vacant())
					color = Gosu::Color::YELLOW;
				else
					color = Gosu::Color::GREEN;
				end
				if (@columns[column_index][row_index].on_path())
					color = Gosu::Color::RED;
				end				
				Gosu.draw_rect(column_index * CELL_DIM, row_index * CELL_DIM, CELL_DIM, CELL_DIM, color, ZOrder::TOP, mode=:default);				
				row_index += 1;
			end
			column_index += 1;
		end
	end
end

GameWindow.new().show();