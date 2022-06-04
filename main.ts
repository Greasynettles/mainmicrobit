function runaway() {
    //  Scared function when it doesnt recognise a face.
    basic.showIcon(IconNames.Surprised)
    soundExpression.slide.playUntilDone()
    robotbit.MotorRunDual(robotbit.Motors.M1A, -160, robotbit.Motors.M1B, -160)
    robotbit.MotorRunDual(robotbit.Motors.M2A, -160, robotbit.Motors.M2B, -160)
    basic.pause(1000)
    robotbit.MotorRunDual(robotbit.Motors.M1A, 130, robotbit.Motors.M1B, 130)
    robotbit.MotorRunDual(robotbit.Motors.M2A, -130, robotbit.Motors.M2B, -130)
    basic.pause(1000)
    robotbit.MotorRunDual(robotbit.Motors.M1A, 160, robotbit.Motors.M1B, 160)
    robotbit.MotorRunDual(robotbit.Motors.M2A, 160, robotbit.Motors.M2B, 160)
    basic.pause(2000)
    robotbit.MotorStopAll()
}

function face_tracking() {
    
    huskylens.request()
    //  Start following target
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        pan_servo = huskylens.readeBox_index(1, 1, Content1.xCenter)
        tilt_servo = huskylens.readeBox_index(1, 1, Content1.yCenter)
        height = huskylens.readeBox_index(1, 1, Content1.height)
    }
    
    if (pan_servo < 130 && huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        pan_value = pan_value + 3
        robotbit.Servo(robotbit.Servos.S1, pan_value)
    } else if (pan_servo > 180 && huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        pan_value = pan_value - 3
        robotbit.Servo(robotbit.Servos.S1, pan_value)
    } else if (pan_value >= 175 && huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        robotbit.MotorRunDual(robotbit.Motors.M1A, 100, robotbit.Motors.M1B, 100)
        robotbit.MotorRunDual(robotbit.Motors.M2A, -100, robotbit.Motors.M2B, -100)
    } else if (pan_servo <= 5 && huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        robotbit.MotorRunDual(robotbit.Motors.M1A, -100, robotbit.Motors.M1B, -100)
        robotbit.MotorRunDual(robotbit.Motors.M2A, 100, robotbit.Motors.M2B, 100)
    } else if (height > 125 && huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        if (pan_value > 90) {
            robotbit.MotorRunDual(robotbit.Motors.M2A, -130, robotbit.Motors.M2B, 0)
            robotbit.MotorRunDual(robotbit.Motors.M1A, -130, robotbit.Motors.M1B, 0)
        } else if (pan_value < 50) {
            robotbit.MotorRunDual(robotbit.Motors.M2A, 0, robotbit.Motors.M2B, -130)
            robotbit.MotorRunDual(robotbit.Motors.M1A, 0, robotbit.Motors.M1B, -130)
        } else {
            robotbit.MotorRunDual(robotbit.Motors.M1A, -130, robotbit.Motors.M1B, -130)
            robotbit.MotorRunDual(robotbit.Motors.M2A, -130, robotbit.Motors.M2B, -130)
        }
        
    } else if (height < 75 && huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        if (pan_value > 90) {
            robotbit.MotorRunDual(robotbit.Motors.M2A, 130, robotbit.Motors.M2B, 0)
            robotbit.MotorRunDual(robotbit.Motors.M1A, 130, robotbit.Motors.M1B, 0)
        } else if (pan_value < 50) {
            robotbit.MotorRunDual(robotbit.Motors.M2A, 0, robotbit.Motors.M2B, 130)
            robotbit.MotorRunDual(robotbit.Motors.M1A, 0, robotbit.Motors.M1B, 130)
        } else if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) == false) {
            robotbit.MotorRunDual(robotbit.Motors.M2A, 130, robotbit.Motors.M2B, 130)
            robotbit.MotorRunDual(robotbit.Motors.M1A, 130, robotbit.Motors.M1B, 130)
            basic.pause(1000)
            robotbit.MotorStopAll()
        } else {
            robotbit.MotorRunDual(robotbit.Motors.M2A, 130, robotbit.Motors.M2B, 130)
            robotbit.MotorRunDual(robotbit.Motors.M1A, 130, robotbit.Motors.M1B, 130)
        }
        
    } else {
        robotbit.MotorStopAll()
    }
    
    if (tilt_servo < 90 && huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        tilt_value = tilt_value + 2
        robotbit.Servo(robotbit.Servos.S2, tilt_value)
    } else if (tilt_servo > 160 && huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        tilt_value = tilt_value - 2
        robotbit.Servo(robotbit.Servos.S2, tilt_value)
    }
    
}

radio.onReceivedValue(function on_received_value(name: string, value: number) {
    
    rxed = "" + name + "=" + ("" + ("" + value))
    rxed2 = "" + name + "=" + ("" + ("" + value))
    rxed3 = "" + name + "=" + ("" + ("" + value))
    rxed4 = "" + name + "=" + ("" + ("" + value))
    if (rxed.includes("behind")) {
        behind = parseFloat(rxed.substr(7, 3))
    } else if (rxed.includes("right")) {
        right = parseFloat(rxed.substr(6, 3))
    } else if (rxed.includes("left")) {
        left = parseFloat(rxed.substr(6, 3))
    } else if (rxed.includes("front")) {
        front = parseFloat(rxed.substr(6, 3))
    }
    
    if (rxed2.includes("behind")) {
        behind = parseFloat(rxed.substr(7, 3))
    } else if (rxed2.includes("right")) {
        right = parseFloat(rxed.substr(6, 3))
    } else if (rxed2.includes("left")) {
        left = parseFloat(rxed.substr(6, 3))
    } else if (rxed2.includes("front")) {
        front = parseFloat(rxed.substr(6, 3))
    }
    
    if (rxed3.includes("behind")) {
        behind = parseFloat(rxed.substr(7, 3))
    } else if (rxed3.includes("right")) {
        right = parseFloat(rxed.substr(6, 3))
    } else if (rxed3.includes("left")) {
        left = parseFloat(rxed.substr(6, 3))
    } else if (rxed3.includes("front")) {
        front = parseFloat(rxed.substr(6, 3))
    }
    
    if (rxed4.includes("behind")) {
        behind = parseFloat(rxed.substr(7, 3))
    } else if (rxed4.includes("right")) {
        right = parseFloat(rxed.substr(6, 3))
    } else if (rxed4.includes("left")) {
        left = parseFloat(rxed.substr(6, 3))
    } else if (rxed4.includes("front")) {
        front = parseFloat(rxed.substr(6, 3))
    }
    
    serial.writeValue("front", front)
    serial.writeValue("right", right)
    serial.writeValue("behind", behind)
    serial.writeValue("left", left)
    if (behind < right && front < right && left < right) {
        rxdnum = right
        right_yes = 1
        behind_yes = 0
        left_yes = 0
        front_yes = 0
    } else if (behind > right && behind > left && behind > front) {
        rxdnum = behind
        behind_yes = 1
        right_yes = 0
        left_yes = 0
        front_yes = 0
    } else if (left > front && left > behind && left > right) {
        rxdnum = left
        left_yes = 1
        behind_yes = 0
        right_yes = 0
        front_yes = 0
    } else if (front > right && front > left && front > behind) {
        rxdnum = front
        front_yes = 1
        behind_yes = 0
        right_yes = 0
        left_yes = 0
    }
    
    serial.writeValue("front", front_yes)
    serial.writeValue("right", right_yes)
    serial.writeValue("behind", behind_yes)
    serial.writeValue("left", left_yes)
})
function happy_move() {
    //  Happy when face recognised
    robotbit.MotorRunDual(robotbit.Motors.M1A, 160, robotbit.Motors.M1B, 160)
    robotbit.MotorRunDual(robotbit.Motors.M2A, -160, robotbit.Motors.M2B, -160)
    basic.pause(3200)
    robotbit.MotorStopAll()
}

let timeout2 = 0
let runaway_done2 = 0
let happy_done2 = 0
let behind_yes = 0
let current_state = ""
let right_yes = 0
let left_yes = 0
let front_yes = 0
let rxdnum = 0
let right = 0
let behind = 0
let left = 0
let front = 0
let rxed4 = ""
let rxed3 = ""
let rxed2 = ""
let rxed = ""
let height = 0
let tilt_servo = 0
let pan_servo = 0
let pan_value = 0
let tilt_value = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
radio.setGroup(99)
robotbit.Servo(robotbit.Servos.S1, 70)
robotbit.Servo(robotbit.Servos.S2, 120)
tilt_value = 120
pan_value = 70
basic.forever(function on_forever() {
    
    happy_done2 = 0
    runaway_done2 = 0
    if (timeout2 > 1) {
        basic.showIcon(IconNames.Asleep)
        robotbit.Servo(robotbit.Servos.S2, 0)
        robotbit.Servo(robotbit.Servos.S1, 70)
        soundExpression.sad.playUntilDone()
        right_yes = 0
        behind_yes = 0
        left_yes = 0
        front_yes = 0
        tilt_value = 70
        pan_value = 70
        robotbit.Servo(robotbit.Servos.S2, 70)
    }
    
    basic.showIcon(IconNames.Asleep)
    timeout2 = 0
    //  Sound Detected in front of BinBot
    if (front_yes == 1) {
        front_yes = 0
        soundExpression.giggle.playUntilDone()
        right = 0
        behind = 0
        left = 0
        behind = 0
        soundExpression.hello.playUntilDone()
        while (timeout2 <= 8) {
            huskylens.request()
            if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                if (happy_done2 == 0) {
                    soundExpression.hello.playUntilDone()
                    happy_move()
                    happy_done2 = 1
                }
                
                timeout2 = 0
                basic.showIcon(IconNames.Happy)
                while (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                    face_tracking()
                }
            } else {
                basic.pause(1000)
                timeout2 = timeout2 + 1
                if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) == false && huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock) && timeout2 > 7 && runaway_done2 == 0) {
                    runaway_done2 = 1
                    runaway()
                }
                
            }
            
        }
    }
    
    //  Sound Detected in behind of BinBot
    if (behind_yes == 1) {
        behind_yes = 0
        soundExpression.giggle.playUntilDone()
        right = 0
        behind = 0
        left = 0
        behind = 0
        robotbit.MotorRunDual(robotbit.Motors.M1A, 160, robotbit.Motors.M1B, 160)
        robotbit.MotorRunDual(robotbit.Motors.M2A, -160, robotbit.Motors.M2B, -160)
        basic.pause(1600)
        robotbit.MotorStopAll()
        while (timeout2 <= 8) {
            huskylens.request()
            if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                if (happy_done2 == 0) {
                    soundExpression.hello.playUntilDone()
                    happy_move()
                    happy_done2 = 1
                }
                
                timeout2 = 0
                basic.showIcon(IconNames.Happy)
                while (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                    face_tracking()
                }
            } else {
                basic.pause(500)
                timeout2 = timeout2 + 1
                if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) == false && huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock) && timeout2 > 7 && runaway_done2 == 0) {
                    runaway_done2 = 1
                    runaway()
                }
                
            }
            
        }
    } else if (right_yes == 1) {
        // Sound Right of Binbot
        right_yes = 0
        soundExpression.giggle.playUntilDone()
        right = 0
        behind = 0
        left = 0
        behind = 0
        robotbit.MotorRunDual(robotbit.Motors.M1A, 160, robotbit.Motors.M1B, 160)
        robotbit.MotorRunDual(robotbit.Motors.M2A, -160, robotbit.Motors.M2B, -160)
        basic.pause(700)
        robotbit.MotorStopAll()
        while (timeout2 <= 8) {
            huskylens.request()
            if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                if (happy_done2 == 0) {
                    soundExpression.hello.playUntilDone()
                    happy_move()
                    happy_done2 = 1
                }
                
                timeout2 = 0
                basic.showIcon(IconNames.Happy)
                while (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                    face_tracking()
                }
            } else {
                basic.pause(500)
                timeout2 = timeout2 + 1
                if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) == false && huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock) && timeout2 > 7 && runaway_done2 == 0) {
                    runaway_done2 = 1
                    runaway()
                }
                
            }
            
        }
    } else if (left_yes == 1) {
        // Sound Left of Binbot
        left_yes = 0
        soundExpression.giggle.playUntilDone()
        right = 0
        behind = 0
        left = 0
        behind = 0
        robotbit.MotorRunDual(robotbit.Motors.M1A, -160, robotbit.Motors.M1B, -160)
        robotbit.MotorRunDual(robotbit.Motors.M2A, 160, robotbit.Motors.M2B, 160)
        basic.pause(700)
        robotbit.MotorStopAll()
        while (timeout2 <= 8) {
            huskylens.request()
            if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                if (happy_done2 == 0) {
                    soundExpression.hello.playUntilDone()
                    happy_move()
                    happy_done2 = 1
                }
                
                timeout2 = 0
                basic.showIcon(IconNames.Happy)
                while (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                    face_tracking()
                }
            } else {
                basic.pause(500)
                timeout2 = timeout2 + 1
                if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) == false && huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock) && timeout2 > 7 && runaway_done2 == 0) {
                    runaway_done2 = 1
                    runaway()
                }
                
            }
            
        }
    }
    
})
