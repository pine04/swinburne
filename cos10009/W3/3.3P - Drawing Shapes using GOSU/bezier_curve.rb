require "gosu";

def lerp(a, b, t)
    return (1 - t) * a + t * b;
end

def create_bezier_curve(controls)
    points = [];
    t = 0;
    while (t <= 1)
        control_points = controls;
        while (control_points.length() > 1)
            temp = [];
            (control_points.length() - 1).times do |i|
                px = lerp(control_points[i][0], control_points[i+1][0], t);
                py = lerp(control_points[i][1], control_points[i+1][1], t);
                temp << [px, py];
            end
            control_points = temp;
        end
        points << control_points[0];
        t += 0.001;
    end
    return points;    
end

def draw_bezier_curve(points, thickness, z, color)
    (points.length() - 1).times do |i|
        Gosu.draw_line(points[i][0], points[i][1], color, points[i+1][0], points[i+1][1], color, z);
    end
    points.length().times do |i|
        Gosu.draw_line(points[i][0], points[i][1], color, points[i][0], points[i][1]+thickness, color, z);
    end
end