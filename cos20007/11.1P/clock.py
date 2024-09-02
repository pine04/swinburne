class Counter:
    def __init__(self, name):
        self.__count = 0
        self.name = name
    
    def increment(self):
        self.__count += 1

    def reset(self):
        self.__count = 0

    def ticks(self):
        return self.__count

class Clock:
    def __init__(self):
        self.__hours = Counter("hours")
        self.__minutes = Counter("minutes")
        self.__seconds = Counter("seconds")
    
    def reset(self):
        self.__hours.reset()
        self.__minutes.reset()
        self.__seconds.reset()

    def tick(self):
        self.__seconds.increment()

        if self.__seconds.ticks() == 60:
            self.__seconds.reset()
            self.__minutes.increment()
        
        if self.__minutes.ticks() == 60:
            self.__minutes.reset()
            self.__hours.increment()
        
        if self.__hours.ticks() == 24:
            self.__hours.reset()
        
    def time(self):
        return "{:02d}".format(self.__hours.ticks()) + ":" + "{:02d}".format(self.__minutes.ticks()) + ":" + "{:02d}".format(self.__seconds.ticks())

def main():
    clock = Clock()

    for i in range(0, 1243):
        clock.tick()

    print(clock.time())

main()
