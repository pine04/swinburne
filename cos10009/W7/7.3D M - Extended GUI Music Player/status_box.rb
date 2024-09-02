require "gosu"
require "./constants.rb"

# Contains the content and state of a status box.
# Attributes:
# message [String] The message of the status box.
# last_activated [Int] The time (in milliseconds since the program's start) when the status box was last activated.
class StatusBox
    attr_accessor(:message, :last_activated)

    def initialize()
        @last_activated = -4000
    end
end

# Updates the message in a status box and reactivates it.
# Parameters:
# status_box [StatusBox] The status box to update.
# message [String] The message to the status box.
# Return:
# (void)
def push_message(status_box, message)
    status_box.message = message
    status_box.last_activated = Gosu.milliseconds()
end

# Draws a status message onto the screen.
# Parameters:
# message [String] The message to draw.
# opacity [Int] [from 0 to 255] The opacity of the message.
# Return:
# (void)
def draw_status_message(message, opacity)
    text = Gosu::Image.from_text(message, TEXT_SMALL, options = {font: POPPINS_BOLD})
    Gosu.draw_rect(16, 633, text.width() + 16, text.height() + 8, Gosu::Color.argb(opacity, 0, 173, 181))
    text.draw(24, 637, 0, 1, 1, Gosu::Color.argb(opacity, 238, 238, 238))
end