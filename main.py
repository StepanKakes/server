#server příjmá všchny hlasy se jménem "hlas"
#přijaté čísla čísla value převede na string a uloží
#po zapnutí je hlasování zablokované a po povolení server odesílá stále zprávu aby mohla hlasovat i později připojená zařízení

#---ovládání---
#tláčítko A vypíše hlasy do konzole
#tlačítko B mění mezi povolení a zablokování hlasování
#tlačítko logo vynuluje hlasy

radio.set_group(1)
radio.set_transmit_serial_number(True)
hlasovani=[{"sn":125638, "value": "D"}]
hlasovani.pop()
key=False
key2=True
serial_num=0
value=65
basic.show_icon(IconNames.NO)

def on_logo_event_pressed():
    hlasovani.pop()
    basic.clear_screen()
    basic.show_number(0)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_event_pressed)

def on_button_pressed_a():
    soucet()
input.on_button_pressed(Button.A, on_button_pressed_a)   

def on_button_pressed_b():
    global key,key2
    if key2!=False:
        key=True
        basic.show_icon(IconNames.YES)
    else:
        key2=True
        basic.show_icon(IconNames.NO)
    while key==True:
        print("sending")
        radio.send_number(1)
        if input.button_is_pressed(Button.B):
            key=False
            key2=False
            print(key)
            radio.send_number(0)
input.on_button_pressed(Button.B, on_button_pressed_b)


def on_received_value(name, value):
    global hlasovani,serial_num,key
    if name=="hlas" and key==True:
        serial_num=radio.received_packet(RadioPacketProperty.SERIAL_NUMBER)
        break_key=True
        radio.send_number(serial_num)
        #console.log_value("serial_num", serial_num)
        for x in hlasovani:
            if x["sn"]==serial_num:
                x["value"]=String.from_char_code(value)
                break_key=False
                break
        if break_key==True:
            hlasovani.push({"sn":serial_num, "value": String.from_char_code(value)})
radio.on_received_value(on_received_value)


def soucet():
    global hlasovani
    list=[]
    for x in hlasovani:
        list.append(x["value"])
    A=list.count("A")
    B=list.count("B")
    C=list.count("C")
    D=list.count("D")
    odpovedi= {"A":A,"B":B,"C":C,"D":D}
    print(odpovedi)
    