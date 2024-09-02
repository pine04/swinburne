require "rubygems";
require "gosu";

module ZOrder
	BACKGROUND, MIDDLE, TOP = *0..2;
end

WIN_WIDTH = 640;
WIN_HEIGHT = 400;

class DemoWindow < Gosu::Window
	def initialize()
		super(WIN_WIDTH, WIN_HEIGHT, false);
		@background = Gosu::Color::WHITE;
		@button_font = Gosu::Font.new(20);
		@info_font = Gosu::Font.new(10);
		@border_color = Gosu::Color::NONE;
	end

	def update()
		if (mouse_over_button())
			@border_color = Gosu::Color::BLACK;
		else 
			@border_color = Gosu::Color::NONE;
		end
	end

	def draw()
		Gosu.draw_rect(0, 0, WIN_WIDTH, WIN_HEIGHT, @background, ZOrder::BACKGROUND, mode=:default);
		Gosu.draw_rect(45, 45, 110, 60, @border_color, ZOrder::MIDDLE, mode=:default);
		Gosu.draw_rect(50, 50, 100, 50, Gosu::Color::GREEN, ZOrder::MIDDLE, mode=:default);
		@button_font.draw_text("Click me", 60, 60, ZOrder::TOP, 1.0, 1.0, Gosu::Color::BLACK);
		@info_font.draw_text("mouse_x: #{mouse_x}", 0, 350, ZOrder::TOP, 1.0, 1.0, Gosu::Color::BLACK);
		@info_font.draw_text("mouse_y: #{mouse_y}", 100, 350, ZOrder::TOP, 1.0, 1.0, Gosu::Color::BLACK);
	end

	def needs_cursor?()
		return true;
	end

	def mouse_over_button()
		return mouse_x() > 50 && mouse_x() < 150 && mouse_y() > 50 && mouse_y() < 100;
	end

	def button_down(id)
		case (id)
		when Gosu::MsLeft
			if (mouse_over_button())
				@background = Gosu::Color::YELLOW;
			else
				@background = Gosu::Color::WHITE;
			end
		end
	end
end

DemoWindow.new().show();