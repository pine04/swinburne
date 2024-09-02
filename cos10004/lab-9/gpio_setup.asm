SETUP:
        BASE=$3F000000
        GPIO_OFFSET=$200000
        mov r0,BASE
        orr r0,GPIO_OFFSET
        mov r1,#1
        lsl r1,#24
        str r1,[r0,#4]
        bx lr
