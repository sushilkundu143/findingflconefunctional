import React, {PureComponent} from 'react'
import {ThemeContextConsumer} from "./../../../themeContext"
import {withRouter} from "react-router-dom"
import config from './../../../config'
import FormContainer from './FromContainer'

class From extends PureComponent {
    constructor() {
        super()
        this.state = {
            planets: [],
            vehicles: [],
            selectplanets: {},
            selectvehicles: {},
            updatedRes: {},
            disabled: true
        }
    }

    componentDidMount() {
        const base = config.get('base')
        const planetsApi = base + config.get('planets')
        const vehiclesApi = base + config.get('vehicles')
        fetch(planetsApi)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    planets: result.map(x => {
                        x.disabled = false;
                        return x;
                    })
                })
            }, (error) => {
                console.log('error in fetch request', error)
            })
        fetch(vehiclesApi)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    vehicles: result.map(x => {
                        x.disabled = false;
                        return x;
                    })
                })
            }, (error) => {
                console.log('error in fetch request', error)
            })
    }

    handleChange = i => (event) => {
        const {name, value, type} = event.target
        if (type === "select-one") {
            this.setState(prevState => {
                if (prevState.selectplanets[name] !== undefined && prevState.selectplanets[name] !== value) {
                    alert('You cannot change your previous selection')
                }
                return {
                    selectplanets: {
                        ...prevState.selectplanets,
                        [name]: value
                    },
                    planets: [
                        ...prevState
                            .planets
                            .map(x => {
                                if (x.name === value) {
                                    x.disabled = true;
                                } else if (x.name === prevState.selectplanets[name]) {
                                    x.disabled = false;
                                }
                                return x
                            })
                    ]
                }
            }, () => {
                if (Object.keys(this.state.selectplanets).length === 4 && Object.keys(this.state.selectvehicles).length === 4) {
                    this.setState({disabled: false})
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    selectvehicles: {
                        ...prevState.selectvehicles,
                        [name]: value
                    },
                    vehicles: [
                        ...prevState
                            .vehicles
                            .map(x => {
                                if (x.name === value) {
                                    x.total_no = x.total_no > 0
                                        ? (x.total_no - 1)
                                        : x.total_no;
                                    x.disabled = x.total_no <= 0
                                        ? true
                                        : false;
                                } else if (x.name === prevState.selectvehicles[name]) {
                                    x.disabled = false;
                                    x.total_no += 1;
                                } else {
                                    x.disabled = x.disabled === true
                                        ? true
                                        : false;
                                }
                                return x
                            })
                    ]
                }
            }, () => {
                if (Object.keys(this.state.selectplanets).length === 4 && Object.keys(this.state.selectvehicles).length === 4) {
                    this.setState({disabled: false})
                }
            })
        }
    }

    handleSubmit = context => async(event) => {
        const base = config.get('base')
        const tokenApi = base + config.get('token')
        const findApi = base + config.get('find')
        event.preventDefault()
        console.log("submitting form")
        const response = await fetch(tokenApi, {
            method: 'POST',
            headers: config.get('headers')
        })
        const json = await response.json()
        if (json.token.length > 0) {
            const data = {
                token: json.token,
                planet_names: Object.values(this.state.selectplanets),
                vehicle_names: Object.values(this.state.selectvehicles)
            }
            console.log('request data:', data)
            const responsedata = await fetch(findApi, {
                method: 'POST',
                headers: config.get('headers'),
                body: JSON.stringify(data)
            })
            const responsejson = await responsedata.json()
            console.log('responsejson:', responsejson)
            if (Object.keys(responsejson).length > 0) {
                this.setState({
                    updatedRes: responsejson
                }, () => {
                    context.updateValue(this.state.updatedRes)
                    console.log('Redirect to the result URL')
                    this
                        .props
                        .history
                        .push("/result")
                })
            }
        }
    }
    render() {
        return (
            <ThemeContextConsumer>
                {context => (<FormContainer
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit(context)}
                    vehicles={this.state.vehicles}
                    planets={this.state.planets}
                    selectplanets={this.state.selectplanets}
                    selectvehicles={this.state.selectvehicles}
                    updatedRes={this.state.updatedRes}
                    disabled={this.state.disabled}
                    context={context} />)}
            </ThemeContextConsumer>
        );
    }
}

export default withRouter(From)