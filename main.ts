// server příjmá všchny hlasy se jménem "hlas"
// přijaté čísla čísla value převede na string a uloží
// po zapnutí je hlasování zablokované a po povolení server odesílá stále zprávu aby mohla hlasovat i později připojená zařízení
// ---ovládání---
// tláčítko A vypíše hlasy do konzole
// tlačítko B mění mezi povolení a zablokování hlasování
// tlačítko logo vynuluje hlasy
radio.setGroup(1)
radio.setTransmitSerialNumber(true)
let hlasovani = [ {
    "sn" : 125638,
    "value" : "D",
}
]
_py.py_array_pop(hlasovani)
let key = false
let key2 = true
let serial_num = 0
let value = 65
basic.showIcon(IconNames.No)
input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_event_pressed() {
    _py.py_array_pop(hlasovani)
    basic.clearScreen()
    basic.showNumber(0)
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    soucet()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (key2 != false) {
        key = true
        basic.showIcon(IconNames.Yes)
    } else {
        key2 = true
        basic.showIcon(IconNames.No)
    }
    
    while (key == true) {
        console.log("sending")
        radio.sendNumber(1)
        if (input.buttonIsPressed(Button.B)) {
            key = false
            key2 = false
            console.log(key)
            radio.sendNumber(0)
        }
        
    }
})
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    let break_key: boolean;
    
    if (name == "hlas" && key == true) {
        serial_num = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        break_key = true
        radio.sendNumber(serial_num)
        // console.log_value("serial_num", serial_num)
        for (let x of hlasovani) {
            if (x["sn"] == serial_num) {
                x["value"] = String.fromCharCode(value)
                break_key = false
                break
            }
            
        }
        if (break_key == true) {
            hlasovani.push( {
                "sn" : serial_num,
                "value" : String.fromCharCode(value),
            }
            )
        }
        
    }
    
})
function soucet() {
    
    let list = []
    for (let x of hlasovani) {
        list.push(x["value"])
    }
    let A = _py.py_array_count(list, "A")
    let B = _py.py_array_count(list, "B")
    let C = _py.py_array_count(list, "C")
    let D = _py.py_array_count(list, "D")
    let odpovedi = {
        "A" : A,
        "B" : B,
        "C" : C,
        "D" : D,
    }
    
    console.log(odpovedi)
}

