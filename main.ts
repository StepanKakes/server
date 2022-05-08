//  hlasovani: List[string] = []
let A = 0
let B = 0
let C = 0
let D = 0
radio.setTransmitSerialNumber(true)
let hlasovani = [ {
    "sn" : 125638,
    "value" : "D",
}
]
// hlasovani.pop()
let key = true
let serial_num = 2
let value = 65
pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Capacitive)
function soucet() {
    
    let list = []
    for (let x of hlasovani) {
        list.push(x["value"])
    }
    A = _py.py_array_count(list, "A")
    B = _py.py_array_count(list, "B")
    C = _py.py_array_count(list, "C")
    D = _py.py_array_count(list, "D")
    let odpovedi = {
        "A" : A,
        "B" : B,
        "C" : C,
        "D" : D,
    }
    
    console.log(odpovedi)
}

input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_event_pressed() {
    radio.sendValue("hlas", value)
})
input.onPinPressed(TouchPin.P0, function on_pin_pressed_p0() {
    
    soucet()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (key == true) {
        key = false
        radio.sendNumber(0)
    } else {
        key = true
        radio.sendNumber(1)
    }
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    console.log(value)
    if (value == 68) {
        value = 65
    } else {
        value += 1
    }
    
    basic.clearScreen()
    basic.showString(String.fromCharCode(value))
})
radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    let key: boolean;
    
    if (receivedNumber == 1) {
        key == true
        basic.clearScreen()
        basic.showIcon(IconNames.Yes)
    } else if (receivedNumber == 0) {
        key = false
        basic.clearScreen()
        basic.showIcon(IconNames.No)
    }
    
    if (receivedNumber == control.deviceSerialNumber()) {
        console.log("nvm")
        basic.clearScreen()
        basic.showIcon(IconNames.Heart)
    }
    
    console.log(control.deviceSerialNumber())
})
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    let key: boolean;
    console.log(name)
    
    if (name == "hlas") {
        serial_num = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        key = true
        radio.sendNumber(serial_num)
        console.logValue("serial_num", serial_num)
        for (let x of hlasovani) {
            if (x["sn"] == serial_num) {
                x["value"] = String.fromCharCode(value)
                key = false
                break
            }
            
        }
        if (key == true) {
            hlasovani.push( {
                "sn" : serial_num,
                "value" : String.fromCharCode(value),
            }
            )
        }
        
    }
    
})
