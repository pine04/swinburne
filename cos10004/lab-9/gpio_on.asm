GPIO_ON:
        mov r1,#1
        lsl r1,#18
        str r1,[r0,#28]
        bx lr
