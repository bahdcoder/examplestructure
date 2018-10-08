let nws = null
nws = adonis.Ws().withJwtToken(JWToken).connect()
// nws = adonis.Ws().connect()

nws.on('open', () => {
    console.log('WS Connected')
    subscribeToNotifications()
})

nws.on('error', (error) => {
    console.log('Error in WS : '+error)
})

function subscribeToNotifications() {
    // console.log('Socket ID : '+SocketID)
    const notifications = nws.subscribe('notifications:'+SocketID)

    notifications.on('error', (error) => {
        console.log('Error in Not : ')
        console.log(error)
    })

    notifications.on('message', (message) => {
        console.log(message)
    })
}