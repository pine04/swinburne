; function stage1b_max
; returns the maximum value out of three arguments passed in
; Arguments:
; r0 - first value
; r1 - second value
; r2 - third value
; Returns result in r0 register

stage1b_max:
        push {r3}

        cmp r0,r1   ; compare first and second values
        movlt r3,r1 ; if first < second, move second into r3
        movge r3,r0 ; if first >= second, move first into r3

        cmp r2,r3   ; compare third and the lesser of first and second
        movge r3,r2 ; if third >= r3, move third into r3

        mov r0,r3   ; move final answer into r0
        pop {r3}

        bx lr