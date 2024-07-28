function parpadeo () {
    basic.showLeds(`
        . # . # .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(3000)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        # . . . #
        . # # # .
        `)
}
input.onButtonPressed(Button.A, function () {
    eboticsMIBO.init_wheel(AnalogPin.P1, AnalogPin.P2)
    basic.showString("Cogeme si puedes!!!")
    cogeme = 1
})
input.onButtonPressed(Button.AB, function () {
    if (discoparty == 0) {
        strip = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
        strip.showRainbow(1, 360)
        discoparty = 1
    } else {
        discoparty = 0
        strip.clear()
    }
})
input.onGesture(Gesture.Shake, function () {
    if (cogeme == 1) {
        cogeme = 0
        basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
        basic.showString("F!!!")
    }
})
function neopixel2 () {
    while (discoparty == 1) {
        strip.rotate(1)
        basic.pause(100)
        strip.show()
    }
}
let movimiento = 0
let strip: neopixel.Strip = null
let cogeme = 0
let discoparty = 0
basic.showString("Hello!")
discoparty = 0
cogeme = 0
loops.everyInterval(1000, function () {
    if (cogeme == 1) {
        movimiento = randint(0, 4)
        if (movimiento == 0) {
            eboticsMIBO.freestyle(30, 30)
            eboticsMIBO.freestyle(30, 10)
        } else if (movimiento == 1) {
            eboticsMIBO.freestyle(10, 30)
        } else if (movimiento == 2) {
            eboticsMIBO.freestyle(30, 3)
            eboticsMIBO.freestyle(30, 30)
        } else if (movimiento == 3) {
            eboticsMIBO.turnright()
            eboticsMIBO.freestyle(40, 40)
        } else {
            eboticsMIBO.turnleft()
            eboticsMIBO.freestyle(40, 40)
        }
    } else {
        eboticsMIBO.brake()
    }
})
basic.forever(function () {
    neopixel2()
})
basic.forever(function () {
    parpadeo()
})
