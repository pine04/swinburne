require "gosu";
require "./bezier_curve.rb";

BG_BRIGHT = Gosu::Color.rgba(195, 20, 50, 255);
BG_DARK = Gosu::Color.rgba(36, 11, 54, 255);
POLE_BRIGHT = Gosu::Color.rgba(74, 7, 20, 255);
POLE_DARK = Gosu::Color.rgba(41, 3, 10, 255);
WIRE = Gosu::Color.rgba(26, 1, 6, 255);

class Drawing < Gosu::Window
    def initialize()
        super(800, 450);
        self.caption = "GOSU Drawing";
        @wire_left_1 = create_bezier_curve([[0, 200], [200, 200], [365, 142]]);
        @wire_left_2 = create_bezier_curve([[0, 300], [200, 300], [425, 112]]);
        @wire_right_1 = create_bezier_curve([[365, 142], [600, 250], [800, 200]]);
        @wire_right_2 = create_bezier_curve([[425, 112], [600, 300], [800, 250]]);
    end

    def draw()
        Gosu.draw_rect(0, 0, 800, 450, BG_DARK);
        Gosu.draw_quad(0, 0, BG_DARK, 500, 150, BG_DARK, 0, 450, BG_BRIGHT, 800, 450, BG_DARK);

        Gosu.draw_quad(390, 105, POLE_BRIGHT, 400, 100, POLE_BRIGHT, 390, 450, POLE_BRIGHT, 400, 450, POLE_BRIGHT, 10); 
        Gosu.draw_quad(400, 100, POLE_DARK, 410, 105, POLE_DARK, 400, 450, POLE_DARK, 410, 450, POLE_DARK, 9); 
        
        Gosu.draw_quad(350, 160, POLE_BRIGHT, 350, 170, POLE_BRIGHT, 450, 110, POLE_BRIGHT, 450, 120, POLE_BRIGHT, 10); 
        Gosu.draw_quad(350, 170, POLE_DARK, 360, 175, POLE_DARK, 450, 120, POLE_DARK, 460, 125, POLE_DARK, 9); 
        Gosu.draw_quad(450, 110, POLE_DARK, 450, 120, POLE_DARK, 460, 115, POLE_DARK, 460, 125, POLE_DARK, 9); 

        Gosu.draw_quad(360, 155, POLE_BRIGHT, 360, 145, POLE_BRIGHT, 370, 140, POLE_BRIGHT, 370, 150, POLE_BRIGHT, 10);
        Gosu.draw_quad(370, 140, POLE_DARK, 370, 150, POLE_DARK, 380, 145, POLE_DARK, 380, 155, POLE_DARK, 9);
        
        Gosu.draw_quad(420, 125, POLE_BRIGHT, 420, 115, POLE_BRIGHT, 430, 110, POLE_BRIGHT, 430, 120, POLE_BRIGHT, 10);
        Gosu.draw_quad(430, 110, POLE_DARK, 430, 120, POLE_DARK, 440, 115, POLE_DARK, 440, 125, POLE_DARK, 9);
        
        draw_bezier_curve(@wire_left_1, 1, 11, WIRE);
        draw_bezier_curve(@wire_left_2, 1, 11, WIRE);
        draw_bezier_curve(@wire_right_1, 1, 0, WIRE);
        draw_bezier_curve(@wire_right_2, 1, 0, WIRE);
    end
end

Drawing.new().show();