//  hlasovani: List[string] = []
let hlasovani : any[] = []
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    radio.sendValue("A", control.deviceSerialNumber())
})
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    let values = [name, value]
    zapocteni(values)
    console.logValue("hlasovani", hlasovani[0])
})
function zapocteni(values: any) {
    let x: number;
    
    let key = true
    for (x = 0; x < hlasovani.length; x++) {
        if (hlasovani[x][1] == values[1]) {
            hlasovani[x][0] = values[0]
            key = false
            break
        }
        
    }
    console.log(x)
    if (key == true) {
        hlasovani.push(values)
    }
    
}

