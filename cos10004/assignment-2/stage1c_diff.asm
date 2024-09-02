; function stage1c_diff
; returns the difference between the max and min value out of three arguments passed in
; Arguments:
; r0 - first value
; r1 - second value
; r2 - third value
; Returns result in r0 register

stage1c_diff:
        push {r3,r4}

        push {r0,lr}   ; prepares to call stage1a, pushing r0 into the stack because stage1a overwrites r0, which is also an input to stage1b
        bl stage1a_min
        mov r3,r0      ; stores min in r3
        pop {r0,lr}

        push {lr}
        bl stage1b_max ; calls stage1
        mov r4,r0      ; stores max in r4
        pop {lr}

        sub r0,r4,r3   ; stores diff in r0

        pop {r3,r4}

        bx lr
