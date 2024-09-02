; function stage2_flash_array
; flashes the contents of array given
; Arguments:
; r0 - BASE address of peripherals
; r1 - size of array
; r2 - array to flash
; Function returns nothing

stage2_flash_array:
        push {r3,r4,r5}

        mov r3,#0 ; r3 is the human-readable array index which is used to control the loop
        mov r4,#0 ; r4 is the offset value, which is a multiple of 4
        loop$:
                ldr r5,[r2,r4] ; stores current element in r5

                push {r1,r2}
                mov r1,r5      ; pass the current element into FLASH function via r1
                mov r2,$20000
                push {lr}
                bl FLASH
                mov r1,$200000
                bl PAUSE
                pop {lr}
                pop {r1,r2}

                add r3,#1
                add r4,#4
                cmp r3,r1
                blt loop$

        pop {r3,r4,r5}
        bx lr