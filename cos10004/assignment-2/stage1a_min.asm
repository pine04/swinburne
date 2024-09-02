; function stage1a_min
; returns the minimum value out of three arguments passed in
; Arguments:
; r0 - first value
; r1 - second value
; r2 - third value
; Returns result in r0 register

stage1a_min:
        push {r3}

        cmp r0,r1   ; compare first and second values
        movle r3,r0 ; if first <= second, move first into r3
        movgt r3,r1 ; if first > second, move second into r3

        cmp r2,r3   ; compare third value to the lesser of the first and second
        movle r3,r2 ; if third < r3, move third into r3

        mov r0,r3   ; move the final answer into r0
        pop {r3}

        bx lr