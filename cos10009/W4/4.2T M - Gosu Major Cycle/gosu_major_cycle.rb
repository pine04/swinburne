require "gosu";

module ZOrder
	BACKGROUND, MIDDLE, TOP = *0..2;
end

class GameWindow < Gosu::Window
	def initialize()
		super(200, 135, false);
		self.caption = "Gosu Cycle Example";
		@background_image = Gosu::Image.new("./media/earth.png");
		@font = Gosu::Font.new(20);
		@cycle = 0;
		puts("0. In initialize\n");
		@shape_x = 0;
  	end

	def update()
		puts("1. In update. Sleeping for one second\n");
		@cycle += 1;
		@shape_x += 10;
		sleep(1);
	end

	def button_down(id)
		puts("In Button Down " + id.to_s);
	end

	def draw()
		@background_image.draw(0, 0, z = ZOrder::BACKGROUND);
		Gosu.draw_rect(@shape_x, 30, 50, 50, Gosu::Color::WHITE, z = ZOrder::TOP);
		@font.draw_text("Cycle count: #{@cycle}", 10, 10, z = ZOrder::TOP, 1.0, 1.0, Gosu::Color::BLACK);
		puts("2. In draw\n");
	end
end

GameWindow.new().show();