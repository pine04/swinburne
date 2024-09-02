mov r1,#4
mov sp,#1000
mov r0,r1
bl FACTORIAL
mov r7,r0
bl SETUP
loop$:
        bl GPIO_ON
        mov r2,$0F0000
        bl TIMER
        bl GPIO_OFF
        mov r2,$0F0000
        bl TIMER
        sub r7,#1
        cmp r7,#0
        bne loop$

wait:
b wait

include "TIMER.asm"
include "factorialj.asm"
include "gpio_setup.asm"
include "gpio_on.asm"
include "gpio_off.asm"
