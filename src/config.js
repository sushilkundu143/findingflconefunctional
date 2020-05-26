import config from 'react-global-configuration'

config.set({
    planets: "https://findfalcone.herokuapp.com/planets",
    vehicles: "https://findfalcone.herokuapp.com/vehicles",
    token: "https://findfalcone.herokuapp.com/token",
    find: "https://findfalcone.herokuapp.com/find",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default config