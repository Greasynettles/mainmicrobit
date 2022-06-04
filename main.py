def runaway():
    # Scared function when it doesnt recognise a face.
    basic.show_icon(IconNames.SURPRISED)
    soundExpression.slide.play_until_done()
    robotbit.motor_run_dual(robotbit.Motors.M1A, -160, robotbit.Motors.M1B, -160)
    robotbit.motor_run_dual(robotbit.Motors.M2A, -160, robotbit.Motors.M2B, -160)
    basic.pause(1000)
    robotbit.motor_run_dual(robotbit.Motors.M1A, 130, robotbit.Motors.M1B, 130)
    robotbit.motor_run_dual(robotbit.Motors.M2A, -130, robotbit.Motors.M2B, -130)
    basic.pause(1000)
    robotbit.motor_run_dual(robotbit.Motors.M1A, 160, robotbit.Motors.M1B, 160)
    robotbit.motor_run_dual(robotbit.Motors.M2A, 160, robotbit.Motors.M2B, 160)
    basic.pause(2000)
    robotbit.motor_stop_all()
def face_tracking():
    global pan_servo, tilt_servo, height, pan_value, tilt_value
    huskylens.request()
    # Start following target
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        pan_servo = huskylens.readeBox_index(1, 1, Content1.X_CENTER)
        tilt_servo = huskylens.readeBox_index(1, 1, Content1.Y_CENTER)
        height = huskylens.readeBox_index(1, 1, Content1.HEIGHT)
    if pan_servo < 130 and huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        pan_value = pan_value + 3
        robotbit.servo(robotbit.Servos.S1, pan_value)
    elif pan_servo > 180 and huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        pan_value = pan_value - 3
        robotbit.servo(robotbit.Servos.S1, pan_value)
    elif pan_value >= 175 and huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        robotbit.motor_run_dual(robotbit.Motors.M1A, 100, robotbit.Motors.M1B, 100)
        robotbit.motor_run_dual(robotbit.Motors.M2A, -100, robotbit.Motors.M2B, -100)
    elif pan_servo <= 5 and huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        robotbit.motor_run_dual(robotbit.Motors.M1A, -100, robotbit.Motors.M1B, -100)
        robotbit.motor_run_dual(robotbit.Motors.M2A, 100, robotbit.Motors.M2B, 100)
    elif height > 125 and huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        if pan_value > 90:
            robotbit.motor_run_dual(robotbit.Motors.M2A, -130, robotbit.Motors.M2B, 0)
            robotbit.motor_run_dual(robotbit.Motors.M1A, -130, robotbit.Motors.M1B, 0)
        elif pan_value < 50:
            robotbit.motor_run_dual(robotbit.Motors.M2A, 0, robotbit.Motors.M2B, -130)
            robotbit.motor_run_dual(robotbit.Motors.M1A, 0, robotbit.Motors.M1B, -130)
        else:
            robotbit.motor_run_dual(robotbit.Motors.M1A, -130, robotbit.Motors.M1B, -130)
            robotbit.motor_run_dual(robotbit.Motors.M2A, -130, robotbit.Motors.M2B, -130)
    elif height < 75 and huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        if pan_value > 90:
            robotbit.motor_run_dual(robotbit.Motors.M2A, 130, robotbit.Motors.M2B, 0)
            robotbit.motor_run_dual(robotbit.Motors.M1A, 130, robotbit.Motors.M1B, 0)
        elif pan_value < 50:
            robotbit.motor_run_dual(robotbit.Motors.M2A, 0, robotbit.Motors.M2B,130)
            robotbit.motor_run_dual(robotbit.Motors.M1A, 0, robotbit.Motors.M1B, 130)
        elif huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) == False:
             robotbit.motor_run_dual(robotbit.Motors.M2A, 130, robotbit.Motors.M2B, 130)
             robotbit.motor_run_dual(robotbit.Motors.M1A, 130, robotbit.Motors.M1B, 130)
             basic.pause(1000)
             robotbit.motor_stop_all()
        else:
            robotbit.motor_run_dual(robotbit.Motors.M2A, 130, robotbit.Motors.M2B, 130)
            robotbit.motor_run_dual(robotbit.Motors.M1A, 130, robotbit.Motors.M1B, 130)
    else:
        robotbit.motor_stop_all()
    if tilt_servo < 90 and huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        tilt_value = tilt_value + 2
        robotbit.servo(robotbit.Servos.S2, tilt_value)
    elif tilt_servo > 160 and huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        tilt_value = tilt_value - 2
        robotbit.servo(robotbit.Servos.S2, tilt_value)

def on_received_value(name, value):
    global rxed, rxed2, rxed3, rxed4, behind, right, rxdnum, right_yes, current_state, behind_yes, front_yes, left_yes, front, left
    rxed = "" + name + "=" + ("" + str(value))
    rxed2 = "" + name + "=" + ("" + str(value))
    rxed3 = "" + name + "=" + ("" + str(value))
    rxed4 = "" + name + "=" + ("" + str(value))
    if rxed.includes("behind"):
        behind = parse_float(rxed.substr(7, 3))
    elif rxed.includes("right"):
        right = parse_float(rxed.substr(6, 3))
    elif rxed.includes("left"):
        left = parse_float(rxed.substr(6, 3))
    elif rxed.includes("front"):
        front = parse_float(rxed.substr(6, 3))
    if rxed2.includes("behind"):
        behind = parse_float(rxed.substr(7, 3))
    elif rxed2.includes("right"):
        right = parse_float(rxed.substr(6, 3))
    elif rxed2.includes("left"):
        left = parse_float(rxed.substr(6, 3))
    elif rxed2.includes("front"):
        front = parse_float(rxed.substr(6, 3))
    if rxed3.includes("behind"):
        behind = parse_float(rxed.substr(7, 3))
    elif rxed3.includes("right"):
        right = parse_float(rxed.substr(6, 3))
    elif rxed3.includes("left"):
        left = parse_float(rxed.substr(6, 3))
    elif rxed3.includes("front"):
        front = parse_float(rxed.substr(6, 3))
    if rxed4.includes("behind"):
        behind = parse_float(rxed.substr(7, 3))
    elif rxed4.includes("right"):
        right = parse_float(rxed.substr(6, 3))
    elif rxed4.includes("left"):
        left = parse_float(rxed.substr(6, 3))
    elif rxed4.includes("front"):
        front = parse_float(rxed.substr(6, 3))


    serial.write_value("front", front)
    serial.write_value("right", right)
    serial.write_value("behind", behind)
    serial.write_value("left", left)
    
    if behind < right and front < right and left < right :
        rxdnum = right
        right_yes = 1
        behind_yes = 0
        left_yes = 0
        front_yes = 0
    elif (behind > right) and (behind > left) and (behind > front):
        rxdnum = behind
        behind_yes = 1
        right_yes = 0
        left_yes = 0
        front_yes = 0
    elif left > front and left > behind and left > right:
        rxdnum = left
        left_yes = 1
        behind_yes = 0
        right_yes = 0
        front_yes = 0
    elif front > right and front > left and front > behind:
        rxdnum = front
        front_yes = 1
        behind_yes = 0
        right_yes = 0
        left_yes = 0
    serial.write_value("front", front_yes)
    serial.write_value("right", right_yes)
    serial.write_value("behind", behind_yes)
    serial.write_value("left", left_yes)
radio.on_received_value(on_received_value)

def happy_move():
    # Happy when face recognised
    robotbit.motor_run_dual(robotbit.Motors.M1A, 160, robotbit.Motors.M1B, 160)
    robotbit.motor_run_dual(robotbit.Motors.M2A, -160, robotbit.Motors.M2B, -160)
    basic.pause(3200)
    robotbit.motor_stop_all()
timeout2 = 0
runaway_done2 = 0
happy_done2 = 0
behind_yes = 0
current_state = ""
right_yes = 0
left_yes = 0
front_yes = 0
rxdnum = 0
right = 0
behind = 0
left = 0
front = 0
rxed4 = ""
rxed3 = ""
rxed2 = ""
rxed = ""
height = 0
tilt_servo = 0
pan_servo = 0
pan_value = 0
tilt_value = 0
huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
radio.set_group(99)
robotbit.servo(robotbit.Servos.S1, 70)
robotbit.servo(robotbit.Servos.S2, 120)
tilt_value = 120
pan_value = 70

def on_forever():
    global happy_done2, runaway_done2, right_yes, behind_yes, left_yes, front_yes, tilt_value, pan_value, timeout2, right, behind, left, front
    happy_done2 = 0
    runaway_done2 = 0
    if timeout2 > 1:
        basic.show_icon(IconNames.ASLEEP)
        robotbit.servo(robotbit.Servos.S2, 0)
        robotbit.servo(robotbit.Servos.S1, 70)
        soundExpression.sad.play_until_done()
        right_yes = 0
        behind_yes = 0
        left_yes = 0
        front_yes = 0
        tilt_value = 70
        pan_value = 70
        robotbit.servo(robotbit.Servos.S2, 70)
    basic.show_icon(IconNames.ASLEEP)
    timeout2 = 0
    # Sound Detected in front of BinBot
    if front_yes == 1:
        front_yes = 0
        soundExpression.giggle.play_until_done()
        right = 0
        behind = 0
        left = 0
        behind = 0
        soundExpression.hello.play_until_done()
        while timeout2 <= 8:
            huskylens.request()
            if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
                if happy_done2 == 0:
                    soundExpression.hello.play_until_done()
                    happy_move()
                    happy_done2 = 1
                timeout2 = 0
                basic.show_icon(IconNames.HAPPY)
                while huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
                    face_tracking()
            else:
                basic.pause(1000)
                timeout2 = timeout2 + 1
                if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) == False and huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) and timeout2 > 7 and runaway_done2 == 0:
                    runaway_done2 = 1
                    runaway()
    # Sound Detected in behind of BinBot
    if  behind_yes == 1:
        behind_yes = 0
        soundExpression.giggle.play_until_done()
        right = 0
        behind = 0
        left = 0
        behind = 0
        robotbit.motor_run_dual(robotbit.Motors.M1A, 160, robotbit.Motors.M1B, 160)
        robotbit.motor_run_dual(robotbit.Motors.M2A, -160, robotbit.Motors.M2B, -160)
        basic.pause(1600)
        robotbit.motor_stop_all()
        while timeout2 <= 8:
            huskylens.request()
            if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
                if happy_done2 == 0:
                    soundExpression.hello.play_until_done()
                    happy_move()
                    happy_done2 = 1
                timeout2 = 0
                basic.show_icon(IconNames.HAPPY)
                while huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
                    face_tracking()
            else:
                basic.pause(500)
                timeout2 = timeout2 + 1
                if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) == False and huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) and timeout2 > 7 and runaway_done2 == 0:
                    runaway_done2 = 1
                    runaway()
    #Sound Right of Binbot
    elif right_yes == 1:
        right_yes = 0
        soundExpression.giggle.play_until_done()
        right = 0
        behind = 0
        left = 0
        behind = 0
        robotbit.motor_run_dual(robotbit.Motors.M1A, 160, robotbit.Motors.M1B, 160)
        robotbit.motor_run_dual(robotbit.Motors.M2A, -160, robotbit.Motors.M2B, -160)
        basic.pause(700)
        robotbit.motor_stop_all()
        while timeout2 <= 8:
            huskylens.request()
            if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
                if happy_done2 == 0:
                    soundExpression.hello.play_until_done()
                    happy_move()
                    happy_done2 = 1
                timeout2 = 0
                basic.show_icon(IconNames.HAPPY)
                while huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
                    face_tracking()
            else:
                basic.pause(500)
                timeout2 = timeout2 + 1
                if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) == False and huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) and timeout2 > 7 and runaway_done2 == 0:
                    runaway_done2 = 1
                    runaway()
    #Sound Left of Binbot
    elif left_yes == 1:
        left_yes = 0
        soundExpression.giggle.play_until_done()
        right = 0
        behind = 0
        left = 0
        behind = 0
        robotbit.motor_run_dual(robotbit.Motors.M1A, -160, robotbit.Motors.M1B, -160)
        robotbit.motor_run_dual(robotbit.Motors.M2A, 160, robotbit.Motors.M2B, 160)
        basic.pause(700)
        robotbit.motor_stop_all()
        while timeout2 <= 8:
            huskylens.request()
            if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
                if happy_done2 == 0:
                    soundExpression.hello.play_until_done()
                    happy_move()
                    happy_done2 = 1
                timeout2 = 0
                basic.show_icon(IconNames.HAPPY)
                while huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
                    face_tracking()
            else:
                basic.pause(500)
                timeout2 = timeout2 + 1
                if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) == False and huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) and timeout2 > 7 and runaway_done2 == 0:
                    runaway_done2 = 1
                    runaway()
basic.forever(on_forever)
