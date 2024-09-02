; function stage4_quicksort
; sorts given array using the sorting algorithm quicksort
; Arguments:
; r0 - size of array
; r1 - array to flash
; r2 - BASE address of peripherals

stage4_quicksort:
        push {r3,r4,r5,r6}
        mov r3,r0   ; r3 now holds a copy of array size
        mov r4,r1   ; r4 now holds a copy of array address
        mov r5,r2   ; r5 now holds a copy of peripheral base address

        mov r0,r4
        mov r1,#0
        sub r2,r3,#1
        push {lr}
        bl quicksort  ; sort the array
        pop {lr}

        mov r0,r5
        mov r1,r3
        mov r2,r4
        push {lr}
        bl stage2_flash_array   ; make LED flash
        pop {lr}

        mov r0,r4    ; return the address of sorted array in r0

        pop {r3,r4,r5,r6}
        bx lr

; function quicksort
; sorts an array in-place
; r0 stores the array to sort
; r1 stores the start index
; r2 stores the end index
quicksort:
        push {r3,r4,r5,r6}
        cmp r1,#0
        movlt r3,#1
        movge r3,#0
        cmp r1,r2
        movge r4,#1
        movlt r4,#0
        mov r5,r3
        orr r5,r4

        cmp r5,#0
        push {lr,r0}
        bleq partition  ; partition, backup the value of r0 cuz partition overwrites it
        cmp r5,#0
        moveq r6,r0     ; r6 now stores the index of the pivot
        pop {lr,r0}

        push {lr,r2}
        subeq r2,r6,#1
        bleq quicksort  ; quicksort the left
        pop {lr,r2}

        cmp r5,#0
        push {lr,r1}
        addeq r1,r6,#1
        bleq quicksort  ; quicksort the right
        pop {lr,r1}

        pop {r3,r4,r5,r6}

        bx lr

; function partition
; partitions the given array into two parts, one including values less than the last element and one including values greater than or equal to the last element
; r0 stores the address of the array
; r1 stores the start index
; r2 stores the end index
; the function returns the pivot index in r0
partition:
        push {r3,r4,r5,r6,r7,r8,r9,r10}
        mov r10,#4 ; the MUL operation only accepts two registers as operands, so #4 must be stored in a register.
        ; get the last element as the pivot
        mul r3,r2,r10
        ldr r4,[r0,r3] ;pivot now stored in r4

        mov r5,r1 ; r5 stores the end left
        mov r6,r1 ; r6 stores the loop variable
        ;loop
        partition_loop$:
                ; get value at r6
                mul r3,r6,r10
                ldr r7,[r0,r3]
                cmp r7,r4   ; compare value at r6 to pivot
                mullt r8,r5,r10
                ldrlt r9,[r0,r8]
                strlt r7,[r0,r8]
                strlt r9,[r0,r3]
                addlt r5,#1 ; increments end left
                add r6,#1
                cmp r6,r2
                blt partition_loop$
        mul r3,r5,r10  ; value at end left
        ldr r4,[r0,r3]
        mul r6,r2,r10  ; value at end of the array aka pivot
        ldr r7,[r0,r6]
        str r4,[r0,r6]
        str r7,[r0,r3]
        mov r0,r5 ; returns the new position of the pivot in r0
        pop {r3,r4,r5,r6,r7,r8,r9,r10}
        bx lr