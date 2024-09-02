require "gosu"
require "./constants.rb"

# This file contains all the procedures to draw custom icons.
# By default all icons are 16x16 pixels in size.

# Draws a shuffle icon onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# scale [Int] [default = 1] The scale of the icon.
# z [Int] [default = 0] The z-index of the icon.
# color [Gosu::Color] [default = BRIGHT_GRAY] The color of the icon.
# Return:
# (void)
def draw_shuffle_icon(x, y, scale = 1, z = 0, color = BRIGHT_GRAY)
    Gosu.draw_rect(x, y + 3 * scale, 4 * scale, 2 * scale, color, z)
    Gosu.draw_rect(x, y + 11 * scale, 4 * scale, 2 * scale, color, z)
    Gosu.draw_quad(x + 4 * scale, y + 3 * scale, color, x + 4 * scale, y + 5 * scale, color, x + 8 * scale, y + 11 * scale, color, x + 8 * scale, y + 13 * scale, color, z)
    Gosu.draw_quad(x + 4 * scale, y + 11 * scale, color, x + 4 * scale, y + 13 * scale, color, x + 8 * scale, y + 3 * scale, color, x + 8 * scale, y + 5 * scale, color, z)
    Gosu.draw_rect(x + 8 * scale, y + 3 * scale, 4 * scale, 2 * scale, color, z)
    Gosu.draw_rect(x + 8 * scale, y + 11 * scale, 4 * scale, 2 * scale, color, z)
    Gosu.draw_triangle(x + 12 * scale, y, color, x + 12 * scale, y + 8 * scale, color, x + 16 * scale, y + 4 * scale, color, z)
    Gosu.draw_triangle(x + 12 * scale, y + 8 * scale, color, x + 12 * scale, y + 16 * scale, color, x + 16 * scale, y + 12 * scale, color, z)
end

# Draws a unshuffle icon onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# scale [Int] [default = 1] The scale of the icon.
# z [Int] [default = 0] The z-index of the icon.
# color [Gosu::Color] [default = BRIGHT_GRAY] The color of the icon.
# Return:
# (void)
def draw_unshuffle_icon(x, y, scale = 1, z = 0, color = BRIGHT_GRAY)
    Gosu.draw_rect(x, y + 3 * scale, 12 * scale, 2 * scale, color, z)
    Gosu.draw_rect(x, y + 11 * scale, 12 * scale, 2 * scale, color, z)
    Gosu.draw_triangle(x + 12 * scale, y, color, x + 12 * scale, y + 8 * scale, color, x + 16 * scale, y + 4 * scale, color, z)
    Gosu.draw_triangle(x + 12 * scale, y + 8 * scale, color, x + 12 * scale, y + 16 * scale, color, x + 16 * scale, y + 12 * scale, color, z)
end

# Draws a loop icon onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# scale [Int] [default = 1] The scale of the icon.
# z [Int] [default = 0] The z-index of the icon.
# color [Gosu::Color] [default = BRIGHT_GRAY] The color of the icon.
# Return:
# (void)
def draw_loop_icon(x, y, scale = 1, z = 0, color = BRIGHT_GRAY)
    Gosu.draw_rect(x, y + 3 * scale, 4 * scale, 2 * scale, color, z)
    Gosu.draw_rect(x, y + 3 * scale, 2 * scale, 10 * scale, color, z)
    Gosu.draw_rect(x, y + 11 * scale, 9 * scale, 2 * scale, color, z)
    Gosu.draw_triangle(x + 4 * scale, y, color, x + 4 * scale, y + 8 * scale, color, x + 8 * scale, y + 4 * scale, color, z)
    Gosu.draw_rect(x + 7 * scale, y + 3 * scale, 9 * scale, 2 * scale, color, z)
    Gosu.draw_rect(x + 14 * scale, y + 3 * scale, 2 * scale, 10 * scale, color, z)
    Gosu.draw_rect(x + 12 * scale, y + 11 * scale, 4 * scale, 2 * scale, color, z)
    Gosu.draw_triangle(x + 8 * scale, y + 12 * scale, color, x + 12 * scale, y + 8 * scale, color, x + 12 * scale, y + 16 * scale, color, z)
end

# Draws a unloop icon onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# scale [Int] [default = 1] The scale of the icon.
# z [Int] [default = 0] The z-index of the icon.
# color [Gosu::Color] [default = BRIGHT_GRAY] The color of the icon.
# Return:
# (void)
def draw_unloop_icon(x, y, scale = 1, z = 0, color = BRIGHT_GRAY)
    Gosu.draw_rect(x, y + 7 * scale, 16 * scale, 2 * scale, color, z)
    Gosu.draw_triangle(x + 2 * scale, y + 4 * scale, color, x + 2 * scale, y + 12 * scale, color, x + 6 * scale, y + 8 * scale, color, z)
    Gosu.draw_triangle(x + 10 * scale, y + 4 * scale, color, x + 10 * scale, y + 12 * scale, color, x + 14 * scale, y + 8 * scale, color, z)
end

# Draws a play icon onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# scale [Int] [default = 1] The scale of the icon.
# z [Int] [default = 0] The z-index of the icon.
# color [Gosu::Color] [default = BRIGHT_GRAY] The color of the icon.
# Return:
# (void)
def draw_play_icon(x, y, scale = 1, z = 0, color = BRIGHT_GRAY)
    Gosu.draw_triangle(x, y, color, x, y + 16 * scale, color, x + 16 * scale, y + 8 * scale, color, z)
end

# Draws a pause icon onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# scale [Int] [default = 1] The scale of the icon.
# z [Int] [default = 0] The z-index of the icon.
# color [Gosu::Color] [default = BRIGHT_GRAY] The color of the icon.
# Return:
# (void)
def draw_pause_icon(x, y, scale = 1, z = 0, color = BRIGHT_GRAY)
    Gosu.draw_rect(x + 2 * scale, y, 2 * scale, 16 * scale, color, z)
    Gosu.draw_rect(x + 13 * scale, y, 2 * scale, 16 * scale, color, z)
end

# Draws a previous icon onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# scale [Int] [default = 1] The scale of the icon.
# z [Int] [default = 0] The z-index of the icon.
# color [Gosu::Color] [default = BRIGHT_GRAY] The color of the icon.
# Return:
# (void)
def draw_prev_icon(x, y, scale = 1, z = 0, color = BRIGHT_GRAY)
    Gosu.draw_rect(x, y, 2 * scale, 16 * scale, color, z)
    Gosu.draw_triangle(x + 1 * scale, y + 8 * scale, color, x + 16 * scale, y, color, x + 16 * scale, y + 16 * scale, color, z)
end

# Draws a next icon onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# scale [Int] [default = 1] The scale of the icon.
# z [Int] [default = 0] The z-index of the icon.
# color [Gosu::Color] [default = BRIGHT_GRAY] The color of the icon.
# Return:
# (void)
def draw_next_icon(x, y, scale = 1, z = 0, color = BRIGHT_GRAY)
    Gosu.draw_rect(x + 14 * scale, y, 2 * scale, 16 * scale, color, z)
    Gosu.draw_triangle(x, y, color, x, y + 16 * scale, color, x + 15 * scale, y + 8 * scale, color, z)
end

# Draws a plus icon onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# scale [Int] [default = 1] The scale of the icon.
# z [Int] [default = 0] The z-index of the icon.
# color [Gosu::Color] [default = BRIGHT_GRAY] The color of the icon.
# Return:
# (void)
def draw_plus_icon(x, y, scale = 1, z = 0, color = BRIGHT_GRAY)
    Gosu.draw_rect(x + 6 * scale, y, 4 * scale, 16 * scale, color, z)
    Gosu.draw_rect(x, y + 6 * scale, 16 * scale, 4 * scale, color, z)
end

# Draws a cross icon onto the screen.
# Parameters:
# x [Int] The x-coordinate of the top left corner to start drawing.
# y [Int] The y-coordinate of the top left corner to start drawing.
# scale [Int] [default = 1] The scale of the icon.
# z [Int] [default = 0] The z-index of the icon.
# color [Gosu::Color] [default = BRIGHT_GRAY] The color of the icon.
# Return:
# (void)
def draw_cross_icon(x, y, scale = 1, z = 0, color = BRIGHT_GRAY)
    Gosu.draw_quad(x, y + 2 * scale, color, x + 2 * scale, y, color, x + 16 * scale, y + 14 * scale, color, x + 14 * scale, y + 16 * scale, color, z)
    Gosu.draw_quad(x, y + 14 * scale, color, x + 2 * scale, y + 16 * scale, color, x + 14 * scale, y, color, x + 16 * scale, y + 2 * scale, color, z)
end