require "rubygems";
require "gosu";

SCREEN_WIDTH = 800;
SCREEN_HEIGHT = 600;
SMOKE = Gosu::Image.new("./media/smoke.png"); # Loading the image just once here to reuse it later.

module ZOrder
	BACKGROUND, FOOD, PLAYER, UI = *0..3;
end

class Hunter
	attr_accessor(:score, :image, :yuk, :yum, :hunted, :hunted_image, :vel_x, :vel_y, :angle, :x, :y);

	def initialize(hunted)
		@image = Gosu::Image.new("media/Hunter.PNG");
		@yuk = Gosu::Sample.new("media/Yuk.wav");
		@yum = Gosu::Sample.new("media/Yum.wav");

		@hunted = hunted;  # default
		@hunted_image = Gosu::Image.new("media/SmallIcecream.png");

		@vel_x = @vel_y = 3.0;
		@x = @y = @angle = 0.0;
		@score = 0;
	end
end

def set_hunted(hunter, hunted)
	hunter.hunted = hunted;
	case (hunted)
	when :chips
		hunted_string = "media/" + "SmallChips.png";
	when :icecream
		hunted_string = "media/" + "SmallIcecream.png";
	when :burger
		hunted_string = "media/" + "SmallBurger.png";
	when :pizza
		hunted_string = "media/" + "SmallPizza.png";
	end
	hunter.hunted_image = Gosu::Image.new(hunted_string);
end

def warp(hunter, x, y)
  	hunter.x, hunter.y = x, y;
end

def move_left(hunter)
	hunter.x -= hunter.vel_x();
	hunter.x %= SCREEN_WIDTH;
end

def move_right(hunter)
	hunter.x += hunter.vel_x();
	hunter.x %= SCREEN_WIDTH;
end

def move_up(hunter)
	hunter.y -= hunter.vel_y();
	hunter.y %= SCREEN_HEIGHT;
end

def move_down(hunter)
	hunter.y += hunter.vel_y();
	hunter.y %= SCREEN_HEIGHT;
end

def draw_hunter(hunter)
	hunter.image().draw_rot(hunter.x(), hunter.y(), ZOrder::PLAYER, hunter.angle());
	hunter.hunted_image().draw_rot(hunter.x(), hunter.y(), ZOrder::PLAYER, hunter.angle());
end

def collect_food(all_food, hunter)
	all_food.reject! do |food|
		if (Gosu.distance(hunter.x(), hunter.y(), food.x(), food.y()) < 80)
			if (food.type() == hunter.hunted())
				hunter.score += 1;
				hunter.yum().play();
			else
				hunter.score += -1;
				hunter.yuk().play();
			end
			next true;
		else
			next false;
		end
	end
end

class Food
	attr_accessor(:x, :y, :type, :image, :vel_x, :vel_y, :angle, :is_changing, :start_time);

	def initialize(image, type)
		@type = type;
		@image = Gosu::Image.new(image);
		@vel_x = rand(-2 .. 2);
		@vel_y = rand(-2 .. 2);
		@angle = 0.0;
		@x = rand() * 640;
		@y = rand() * 480;
		@is_changing = false;
		@start_time = 0;
	end
end

def move(food)
	food.x += food.vel_x();
	food.x %= SCREEN_WIDTH;
	food.y += food.vel_y();
	food.y %= SCREEN_HEIGHT;
end

def draw_food(food)
	if (food.is_changing())
		SMOKE.draw_rot(food.x(), food.y(), ZOrder::FOOD, food.angle());
	else
  		food.image().draw_rot(food.x(), food.y(), ZOrder::FOOD, food.angle());
	end
end

class FoodHunterGame < (Example rescue Gosu::Window)
	def initialize()
		super(SCREEN_WIDTH, SCREEN_HEIGHT);
		self.caption = "Food Hunter Game";
		@background_image = Gosu::Image.new("media/space.png", :tileable => true);
		@all_food = Array.new();
		@player = Hunter.new(:icecream);
		warp(@player, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
		@font = Gosu::Font.new(20);
	end

	def update()
		if (Gosu.button_down?(Gosu::KB_LEFT) || Gosu.button_down?(Gosu::GP_LEFT))
			move_left(@player);
		end
		if (Gosu.button_down?(Gosu::KB_RIGHT) || Gosu.button_down?(Gosu::GP_RIGHT))
			move_right(@player);
		end
		if (Gosu.button_down?(Gosu::KB_UP) || Gosu.button_down?(Gosu::GP_BUTTON_0))
			move_up(@player);
		end
		if (Gosu.button_down?(Gosu::KB_DOWN) || Gosu.button_down?(Gosu::GP_BUTTON_9))
			move_down(@player);
		end
		@all_food.each { |food| move(food) };
		remove_food();
		collect_food(@all_food, @player);

		if (rand(100) < 2 && @all_food.size() < 4)
			@all_food.push(generate_food());
		end

		if (rand(400) == 0)
			change = rand(4);
			case (change)
			when 0
				set_hunted(@player, :icecream);
			when 1
				set_hunted(@player, :chips);
			when 2
				set_hunted(@player, :burger);
			when 3
				set_hunted(@player, :pizza);
			end
		end

		prepare_food_for_change();
		change_food_direction();
	end

	def draw()
		@background_image.draw(0, 0, ZOrder::BACKGROUND);
		draw_hunter(@player);
		@all_food.each { |food| draw_food(food) };
		@font.draw("Score: #{@player.score()}", 10, 10, ZOrder::UI, 1.0, 1.0, Gosu::Color::YELLOW);
	end

	def prepare_food_for_change()
		if (@all_food.length() == 0)
			return;
		end
		if (rand(150) == 0)
			to_change = rand(@all_food.length());
			if (@all_food[to_change].is_changing())
				return;
			end
			@all_food[to_change].is_changing = true;
			@all_food[to_change].start_time = Gosu.milliseconds() / 1000;
		end
	end

	def change_food_direction()
		now = Gosu.milliseconds() / 1000;
		@all_food.each do |food|
			if (food.is_changing() && now - food.start_time() >= 2)
				food.vel_x = rand(-2..2);
				food.vel_y = rand(-2..2);
				food.is_changing = false;
			end
		end
	end

	def generate_food()
		case (rand(4))
		when 0
			return Food.new("media/Chips.png", :chips);
		when 1
			return Food.new("media/Burger.png", :burger);
		when 2
			return Food.new("media/IceCream.png", :icecream);
		when 3
			return Food.new("media/Pizza.png", :pizza);
		end
	end

	def remove_food()
		@all_food.reject! do |food|
			if (food.x() > SCREEN_WIDTH || food.y() > SCREEN_HEIGHT || food.x() < 0 || food.y() < 0)
				next true;
			else
				next false;
			end
		end
	end

	def button_down(id)
		if (id == Gosu::KB_ESCAPE)
			close();
		end
	end
end

FoodHunterGame.new().show() if (__FILE__ == $0);
