require "gosu";

module ZOrder
  	BACKGROUND, MIDDLE, TOP = *0..2;
end

WIDTH = 400;
HEIGHT = 500;
SHAPE_DIM = 50;

class GameWindow < Gosu::Window
	def initialize()
		super(WIDTH, HEIGHT, false);
		self.caption = "Shape Moving";		
		@shape_y = HEIGHT / 2;
		@shape_x = WIDTH / 2;
	end

	def update()
		if (Gosu.button_down?(Gosu::KB_RIGHT) && (@shape_x <= WIDTH - SHAPE_DIM))
			@shape_x += 3;
		end
		if (Gosu.button_down?(Gosu::KB_LEFT) && (@shape_x >= 0))
			@shape_x -= 3;
		end
		if (Gosu.button_down?(Gosu::KB_UP) && (@shape_y >= 0))
			@shape_y -= 3;
		end
		if (Gosu.button_down?(Gosu::KB_DOWN) && (@shape_y + SHAPE_DIM <= HEIGHT))
			@shape_y += 3;
		end
	end

	def draw()
		Gosu.draw_rect(@shape_x, @shape_y, SHAPE_DIM, SHAPE_DIM, Gosu::Color::RED, ZOrder::TOP, mode=:default);
	end
end

GameWindow.new().show();