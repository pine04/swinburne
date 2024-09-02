require "gosu"
require "./constants.rb"

# Represents a viewport, which is a box on the screen that comes with a scrollbar.
# When the content of the viewport overflows it, the excess should be clipped out during draw.
# Attributes:
# x [Int] The x-coordinate of the top-left corner of the viewport.
# y [Int] The y-coordinate of the top-left corner of the viewport.
# width [Int] The width of the viewport.
# height [Int] The height of the viewport.
# content_top [Int] The top y-coordinate of the viewport's content.
# content_height [Int] The height of the viewport's content.
# scrollbar_active [Boolean] A boolean value indicating whether the viewport's scrollbar is active or not.
# last_mouse_y [Int] The y-coordinate of where the user clicks on the viewport's scrollbar.
class Viewport
    attr_accessor(:x, :y, :width, :height, :content_top, :content_height, :scrollbar_active, :last_mouse_y)

    def initialize(x, y, width, height, content_top, content_height)
        @x = x
        @y = y
        @width = width
        @height = height
        @content_top = content_top
        @content_height = content_height
        @scrollbar_active = false
        @last_mouse_y = 0
    end
end

# Activates the scrollbar associated with a viewport.
# Parameters:
# viewport [Viewport] The viewport containing the target scrollbar.
# mouse_y [Int] The y-coordinate of the user's mouse.
# Return:
# (void)
def activate_scrollbar(viewport, mouse_y)
    viewport.scrollbar_active = true
    viewport.last_mouse_y = mouse_y
end

# Deactivates the scrollbar associated with a viewport.
# Parameter:
# viewport [Viewport] The viewport containing the target scrollbar.
# Return:
# (void)
def deactivate_scrollbar(viewport)
    viewport.scrollbar_active = false
end

# Scrolls the content of a viewport as its scrollbar is being dragged vertically on the screen.
# Parameters:
# viewport [Viewport] The viewport containing the target scrollbar.
# mouse_y [Int] The y-coordinate of the user's mouse.
# Return:
# (void)
def drag_scrollbar(viewport, mouse_y)
    content_scroll_distance = (viewport.last_mouse_y() - mouse_y).to_f() / viewport.height() * viewport.content_height()
    scroll_viewport_content(viewport, content_scroll_distance)
    viewport.last_mouse_y = mouse_y
end

# Returns the dimensions of the scrollbar associated with a viewport. This includes its top-left x, y coordinates, width and height.
# Parameter:
# viewport [Viewport] The viewport containing the target scrollbar.
# Return:
# (Array[Int]) A 4-element array containing the x, y coordinates, width and height of the scrollbar.
def scrollbar_dimension(viewport)
    if (viewport.content_height() <= viewport.height())
        return [0, 0, 0, 0]
    end
    sb_x = viewport.x() + viewport.width() - 4
    sb_y = viewport.y() + (viewport.y() - viewport.content_top()).to_f() / viewport.content_height() * viewport.height()
    sb_w = 4
    sb_h = viewport.height() * viewport.height() / viewport.content_height()
    return [sb_x, sb_y, sb_w, sb_h]
end

# Draws the scrollbar associated with a viewport.
# Parameter:
# viewport [Viewport] The viewport containing the target scrollbar.
# Return:
# (void)
def draw_viewport_scrollbar(viewport)
    sb_dimension = scrollbar_dimension(viewport)
    Gosu.draw_rect(sb_dimension[0], sb_dimension[1], sb_dimension[2], sb_dimension[3], LIGHT_TEAL)
end

# Vertically scrolls the content of a viewport by a particular distance.
# Parameters:
# viewport [Viewport] The target viewport.
# distance [Int] The distance to scroll. Negative values to scroll down and positive values to scroll up.
# Return:
# (void)
def scroll_viewport_content(viewport, distance)
    if (viewport.content_height() <= viewport.height())
        return
    end
    content_top_min = viewport.y() + viewport.height() - viewport.content_height()
    content_top_max = viewport.y()
    viewport.content_top = (viewport.content_top + distance).clamp(content_top_min, content_top_max)
end