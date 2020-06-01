import config from 'react-global-configuration'

config.set({
    base: "https://findfalcone.herokuapp.com",
    planets: "/planets",
    vehicles: "/vehicles",
    token: "/token",
    find: "/find",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})


export default config