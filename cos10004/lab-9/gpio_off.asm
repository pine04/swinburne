GPIO_OFF:
        mov r1,#1
        lsl r1,#18
        str r1,[r0,#40]
        bx lr
