# hlasovani: List[string] = []
A=0
B=0
C=0
D=0
radio.set_transmit_serial_number(True)
hlasovani=[{"sn":125638, "value": "D"}]

#hlasovani.pop()
key=True
serial_num=2
value=65
pins.touch_set_mode(TouchTarget.P0, TouchTargetMode.CAPACITIVE)

def soucet():
    global hlasovani,A,B,C,D
    list=[]
    for x in hlasovani:
        list.append(x["value"])
    A=list.count("A")
    B=list.count("B")
    C=list.count("C")
    D=list.count("D")
    odpovedi= {"A":A,"B":B,"C":C,"D":D}

    print(odpovedi)
def on_logo_event_pressed():
    radio.send_value("hlas", value)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_event_pressed)

def on_pin_pressed_p0():
    global hlasovani
    soucet()
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)

def on_button_pressed_b():
    global key
    if key==True:
        key=False
        radio.send_number(0)
    else:
        key=True
        radio.send_number(1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_a():
    global value
    print(value)
    if value==68:
        value=65
    else:
        value += 1
    basic.clear_screen()
    basic.show_string(String.from_char_code(value))
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_number(receivedNumber):
    global serial_num
    if receivedNumber==1:
        key==True
        basic.clear_screen()
        basic.show_icon(IconNames.YES)
    elif receivedNumber==0:
        key=False
        basic.clear_screen()
        basic.show_icon(IconNames.NO)
    if receivedNumber==control.device_serial_number():
        print("nvm")
        basic.clear_screen()
        basic.show_icon(IconNames.HEART)
    print(control.device_serial_number())
radio.on_received_number(on_received_number)


def on_received_value(name, value):
    print(name)
    global hlasovani,serial_num
    if name=="hlas":
        serial_num=radio.received_packet(RadioPacketProperty.SERIAL_NUMBER)
        key=True
        radio.send_number(serial_num)
        console.log_value("serial_num", serial_num)
        for x in hlasovani:
            if x["sn"]==serial_num:
                x["value"]=String.from_char_code(value)
                key=False
                break
        if key==True:
            hlasovani.push({"sn":serial_num, "value": String.from_char_code(value)})
radio.on_received_value(on_received_value)



    