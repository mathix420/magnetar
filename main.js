const ws = new WebSocket('ws://localhost:8080')

ws.onmessage = (message) => {
    console.info(message)
    const j = Object.entries(JSON.parse(message.data))
    j.forEach(([ key, { value, tokens } ]) => {
        if ( key.startsWith('v') ) {
            const elem = document.querySelector(`*[${key}]`)
            elem.removeAttribute('empty')
            elem[elem.attributes[key].value] = value
        } else {
            const elem = document.querySelector(`res[${key}]`)

            if (tokens && tokens.length) {
                window[tokens[0]] = () => {
                    elem.removeAttribute('empty')
                }
            } else {
                elem.removeAttribute('empty')
            }

            elem.innerHTML = value
        }
    });
}

window.ws = ws