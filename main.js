const ws = new WebSocket('wss://ws-demo.cloudno.de')

ws.onmessage = (message) => {
    console.info(message)
    const j = Object.entries(JSON.parse(message.data))
    j.forEach(([ key, value ]) => {
        if ( key.startsWith('v') ) {
            const elem = document.querySelector(`*[${key}]`)
            console.log(elem, elem.attributes[key].value)
            elem.removeAttribute('empty')
            elem[elem.attributes[key].value] = value
        } else {
            const elem = document.querySelector(`res[${key}]`)
            elem.removeAttribute('empty')
            elem.innerHTML = value
        }
    });
}

window.ws = ws