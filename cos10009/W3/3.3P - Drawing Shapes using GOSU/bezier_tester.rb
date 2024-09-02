# This file is for experimenting with bezier curve control points only.

require "gosu";
require "./bezier_curve.rb";

def draw_thick_point(center_x, center_y, color, z)
    Gosu.draw_rect(center_x-1, center_y-1, 3, 3, color, z);
end

class Screen < Gosu::Window
    def initialize()
        super(800, 450);
        self.caption = "Bezier Curve Testing";
        @speed = 10;
        @selected = 0;
        @controls = [
            [1, 300], [160, 300], [320, 300], [480, 300], [640, 300], [799, 300]
        ];
        @curve = create_bezier_curve(@controls); ####################################################
    end

    def button_down(id)
        case id
        when 21
            @controls.length().times do |i|
                @controls[i][1] = 300
            end
        when 79
            @selected = (@selected + 1) % 6;
        when 80
            @selected = (@selected - 1) % 6;
        when 82
            @controls[@selected][1] -= @speed;
        when 81
            @controls[@selected][1] += @speed;
        end
        @curve = create_bezier_curve(@controls); #############################################################
    end

    def draw()
        Gosu::Image::from_text("Selected point #{@selected + 1}", 16).draw(0, 0);
        @controls.each_with_index do |point, index|
            Gosu::Image::from_text("Point #{index+1}: X=#{point[0]}, Y=#{point[1]}", 16).draw(0, 16*(1+index))
            draw_thick_point(point[0], point[1], Gosu::Color::CYAN, 100)
        end
        draw_bezier_curve(@curve, 1, 10, Gosu::Color::RED); ##################################################
    end
end

Screen.new.show();