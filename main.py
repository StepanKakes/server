# hlasovani: List[string] = []
hlasovani: List[any] = []
key=False
def on_button_pressed_b():
    if key==True:
        key=False
    else:
        key=True
input.on_button_pressed(Button.B, on_button_pressed_b)
def on_button_pressed_a():
    radio.send_value("A", control.device_serial_number())
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_value(name, value):
    global key
    if key==True:
        values=[name,value]
        zapocteni(values)
        console.log_value("hlasovani", hlasovani[0])
radio.on_received_value(on_received_value)


def zapocteni(values):
    global hlasovani
    key=True
    for x in range(len(hlasovani)):
        if hlasovani[x][1]==values[1]:
            hlasovani[x][0]=values[0]
            key=False
            break
    print(x)
    if key==True:
        hlasovani.append(values)