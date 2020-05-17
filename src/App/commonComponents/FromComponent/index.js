import React, {Component} from 'react'
import Select from './../Select'
import Radio from './../Radio'
import Duration from './../timeDuration'
import {ThemeContextConsumer} from "./../../../themeContext"
import {withRouter} from "react-router-dom"
import './From.css'

class From extends Component {
    constructor() {
        super()
        this.state = {
            planetsrow: [],
            vehiclesrow: [],
            planets: [],
            vehicles: [],
            choise1: "",
            choise2: "",
            choise3: "",
            choise4: "",
            vehicles1: "",
            vehicles2: "",
            vehicles3: "",
            vehicles4: "",
            updatedRes: [],
            disabled: true
        }
    }

    componentDidMount() {
        fetch("https://findfalcone.herokuapp.com/planets")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    planets: result.map(x => {
                        x.disabled = false;
                        return x;
                    }),
                    planetsrow: [...result]
                })
            }, (error) => {
                console.log('error in fetch request', error)
            })
        fetch("https://findfalcone.herokuapp.com/vehicles")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    vehicles: result.map(x => {
                        x.disabled = false;
                        return x;
                    }),
                    vehiclesrow: [...result]
                })
            }, (error) => {
                console.log('error in fetch request', error)
            })
    }

    handleChange = (event) => {
        const {name, value, type, checked} = event.target
        console.log('data:', name, value, type);
        type === "checkbox"
            ? this.setState({[name]: checked})
            : type === "select-one"
                ? this.setState(prevState => {
                    console.log('checking planets', prevState)
                    return {
                        [name]: value,
                        planets: [
                            ...prevState
                                .planets
                                .map(x => {
                                    if (x.name === value) {
                                        x.disabled = true;
                                    } else if (x.name === prevState[name]) {
                                        x.disabled = false;
                                    }
                                    return x
                                })
                        ]
                    }
                }, () => {
                    this.setState(prevState => {
                        const arr = [prevState.choise1, prevState.choise2, prevState.choise3, prevState.choise4, prevState.vehicles1, prevState.vehicles2, prevState.vehicles3, prevState.vehicles4]
                        const bol = arr.filter(x => x === "")
                        console.log('bol value:', bol)
                        return {
                            disabled: bol.length === 0 ? false : true
                        }
                    })
                })
                : this.setState(prevState => {
                    console.log('checking vehicles', prevState)
                    return {
                        [name]: value,
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
                                    } else if (x.name === prevState[name]) {
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
                    this.setState(prevState => {
                        const arr = [prevState.choise1, prevState.choise2, prevState.choise3, prevState.choise4, prevState.vehicles1, prevState.vehicles2, prevState.vehicles3, prevState.vehicles4]
                        const bol = arr.filter(x => x === "")
                        console.log('bol value:', bol)
                        return {
                            disabled: bol.length === 0 ? false : true
                        }
                    })
                })
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        const {
            choise1,
            choise2,
            choise3,
            choise4,
            vehicles1,
            vehicles2,
            vehicles3,
            vehicles4
        } = this.state;
        console.log("submitting form");
        const tokenapi = "https://findfalcone.herokuapp.com/token";
        const findapi = "https://findfalcone.herokuapp.com/find";
        const response = await fetch(tokenapi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();
        //console.log('token:', json.token);
        if (json.token.length > 0) {
            const data = {
                token: json.token,
                planet_names: [
                    choise1, choise2, choise3, choise4
                ],
                vehicle_names: [vehicles1, vehicles2, vehicles3, vehicles4]
            }
            console.log('request data:', data)
            const responsedata = await fetch(findapi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responsejson = await responsedata.json();
            console.log('responsejson:', responsejson);
            if (Object.keys(responsejson).length > 0) {
                this.setState({
                    updatedRes: responsejson
                }, () => this.props.history.push("/result"))
            }
        }
    }
    render() {
        // console.log('props of Home:', this.props)
        const {
            choise1,
            choise2,
            choise3,
            choise4,
            vehicles,
            vehicles1,
            vehicles2,
            vehicles3,
            vehicles4,
            planets
        } = this.state;
        const selectedvehicles = [vehicles1, vehicles2, vehicles3, vehicles4].filter(x => x !== "");
        const timeDuration = selectedvehicles.map((vehicle, i) => {
            let filterObj = vehicles.filter(x => x.name === vehicle)[0];
            let time = filterObj.max_distance / filterObj.speed;
            return (
                <div className="field column is-one-quarter" key={i}>
                    <Duration duration={time}/>
                </div>
            )
        })

        const result1 = (choise1 && <div className="column is-one-quarter">
            {vehicles.map((radio, i) => <Radio
                key={i}
                radio={radio}
                id={"vehicles1" + i}
                name="vehicles1"
                data={vehicles1}
                handleChange={this.handleChange}/>)}
        </div>);
        const result2 = (choise2 && <div className="column is-one-quarter">
            {vehicles.map((radio, i) => <Radio
                key={i}
                radio={radio}
                id={"vehicles2" + i}
                name="vehicles2"
                data={vehicles2}
                handleChange={this.handleChange}/>)}
        </div>);
        const result3 = (choise3 && <div className="column is-one-quarter">
            {vehicles.map((radio, i) => <Radio
                key={i}
                radio={radio}
                id={"vehicles3" + i}
                name="vehicles3"
                data={vehicles3}
                handleChange={this.handleChange}/>)}
        </div>);
        const result4 = (choise4 && <div className="column is-one-quarter">
            {vehicles.map((radio, i) => <Radio
                key={i}
                radio={radio}
                id={"vehicles4" + i}
                name="vehicles4"
                data={vehicles4}
                handleChange={this.handleChange}/>)}
        </div>);
        return (
            <ThemeContextConsumer>
                {context => (
                    <form className="columns is-multiline" onSubmit={this.handleSubmit}>
                        <div className="column is-one-quarter">
                            <Select
                                planets={planets}
                                name="choise1"
                                value={choise1}
                                handleChange={this.handleChange}/>
                        </div>
                        <div className="field column is-one-quarter">
                            <Select
                                planets={planets}
                                name="choise2"
                                value={choise2}
                                handleChange={this.handleChange}/>
                        </div>
                        <div className="field column is-one-quarter">
                            <Select
                                planets={planets}
                                name="choise3"
                                value={choise3}
                                handleChange={this.handleChange}/>
                        </div>
                        <div className="field column is-one-quarter">
                            <Select
                                planets={planets}
                                name="choise4"
                                value={choise4}
                                handleChange={this.handleChange}/>
                        </div>
                        {result1}
                        {result2}
                        {result3}
                        {result4}
                        <div className="column is-full">
                            <div className="columns">
                                {timeDuration}
                            </div>
                        </div>
                        <div className="column is-full">
                            <div className="control has-text-centered">
                                <button
                                    className="button is-primary is-rounded"
                                    type="submit"
                                    disabled={this.state.disabled === true
                                    ? true
                                    : false}
                                    onClick={context.updateValue(this.state.updatedRes)}>
                                    Find Falcone
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </ThemeContextConsumer>
        );
    }
}

export default withRouter(From)