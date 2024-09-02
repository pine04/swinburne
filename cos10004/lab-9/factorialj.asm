FACTORIAL:
        sub r1,r1,#1
        cmp r1,#1
        beq EXIT
        mul r0,r0,r1
        push {r1,lr}
        bl FACTORIAL
        EXIT:
                pop {r1,lr}
        bx lr
