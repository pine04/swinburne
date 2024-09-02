; function stage3_bubblesort
; sorts numarray using the sorting algorithm bubble sort
; Arguments:
; r0 - size of array
; r1 - array to flash
; r2 - BASE address of peripherals

stage3_bubblesort:
        push {r3,r4,r5,r6,r7,r8,r9}
        sub r9,r0,#2

        loop1$:
                mov r3,#0 ; r3 represents the swapped boolean flag
                mov r4,#0 ; r4 is inner loop variable
                mov r5,#0 ; r5 is the offset for array[r4]
                mov r6,#4 ; r6 is the offset for array[r4+1]

                loop2$:
                        ldr r7,[r1,r5]
                        ldr r8,[r1,r6]

                        cmp r7,r8
                        strgt r7,[r1,r6]
                        strgt r8,[r1,r5]
                        movgt r3,#1 ; set swapped boolean flag to true

                        add r4,#1
                        add r5,#4
                        add r6,#4

                        cmp r4,r9
                        ble loop2$

                sub r9,r9,#1

                cmp r3,#0 ; if no swaps occurred in the inner loop, the array is already sorted
                bne loop1$

         mov r3,r0 ; size
         mov r4,r1 ; array
         mov r5,r2 ; base add
         mov r0,r5
         mov r1,r3
         mov r2,r4
         push {lr}
         bl stage2_flash_array
         pop {lr}

         mov r0,r1 ; move the address of the array into r0 as per the requirement
         pop {r3,r4,r5,r6,r7,r8,r9}
         bx lr