let tnws = null
tnws = adonis.Ws().withJwtToken(JWToken).connect()
// nws = adonis.Ws().connect()

tnws.on('open', () => {
    console.log('WS Connected')
    subscribeToTradeNotifications()
})

tnws.on('error', (error) => {
    console.log('Error in WS : ' + error)
})

let baseAsset = $('#baseAsset').val();
let tradeAsset = $('#tradeAsset').val();
const symbol = baseAsset+''+tradeAsset;

function subscribeToTradeNotifications() {
    // console.log('Socket ID : '+SocketID)
    const tnotifications = tnws.subscribe('trade:' + symbol)

    tnotifications.on('error', (error) => {
        console.log('Error in Not : ')
        console.log(error)
    })

    tnotifications.on('message', (message) => {
        console.log(message)
    })
}