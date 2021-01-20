import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '../../../themeContext';
import config from '../../../config';
import FormContainer from './FromContainer';

class FromComponent extends PureComponent {
  constructor() {
    super();
    this.state = {
      planets: [],
      vehicles: [],
      selectplanets: {},
      selectvehicles: {},
      updatedRes: {},
      disabled: true,
      isLoading: null,
    };
  }

  componentDidMount() {
    const base = config.get('base');
    const planetsApi = base + config.get('planets');
    const vehiclesApi = base + config.get('vehicles');
    fetch(planetsApi)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          planets: result.map((x) => {
            const data = x;
            data.disabled = false;
            return data;
          }),
        });
      }, (error) => {
        alert('error in fetch request', error); // eslint-disable-line no-alert
      });
    fetch(vehiclesApi)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          vehicles: result.map((x) => {
            const data = x;
            data.disabled = false;
            return data;
          }),
        });
      }, (error) => {
        alert('error in fetch request', error); // eslint-disable-line no-alert
      });
  }
/* eslint-disable */
   handleChange = i => (event) => {
      const { name, value, type } = event.target;
      if (type === 'select-one') {
        this.setState((prevState) => {
          if (prevState.selectplanets[name] !== undefined
            && prevState.selectplanets[name] !== value) {
            /*eslint no-alert: "error"*/
            alert('You cannot change your previous selection');
          }
          return {
            selectplanets: {
              ...prevState.selectplanets,
              [name]: value,
            },
                planets: [
                ...prevState
                    .planets
                    .map((x) => {
                        if (x.name === value) {
                            x.disabled = true;
                        }
                        else if (x.name === prevState.selectplanets[name]) {
                            x.disabled = false;
                        }
                        return x;
                    })
                ]
            }
            }, () => {
                if (Object.keys(this.state.selectplanets).length === 4 && Object.keys(this.state.selectvehicles).length === 4) {
                    this.setState({ disabled: false });
                }
            })
        }
        else {
            this.setState((prevState) => {
                return {
                    selectvehicles: {
                        ...prevState.selectvehicles,
                        [name]: value
                    },
                    vehicles: [
                        ...prevState
                            .vehicles
                            .map((x) => {
                                if (x.name === value) {
                                    x.total_no = x.total_no > 0
                                        ? (x.total_no - 1)
                                        : x.total_no
                                    x.disabled = x.total_no <= 0
                                        ? true
                                        : false;
                                }
                                else if (x.name === prevState.selectvehicles[name]) {
                                    x.disabled = false;
                                    x.total_no += 1;
                                }
                                else {
                                    x.disabled = x.disabled === true
                                        ? true
                                        : false;
                                }
                                return x;
                            })
                    ]
                }
            }, () => {
                if (Object.keys(this.state.selectplanets).length === 4 && Object.keys(this.state.selectvehicles).length === 4) {
                    this.setState({ disabled: false })
                }
            })
        }
    };

    handleSubmit = context => async (event) => {
        this.setState({ isLoading: true });
        const base = config.get('base');
        const tokenApi = base + config.get('token');
        const findApi = base + config.get('find');
        event.preventDefault();
        const response = await fetch(tokenApi, {
            method: 'POST',
            headers: config.get('headers')
        });
        const json = await response.json();
        if (json.token.length > 0) {
            const data = {
                token: json.token,
                planet_names: Object.values(this.state.selectplanets),
                vehicle_names: Object.values(this.state.selectvehicles)
            };
            const responsedata = await fetch(findApi, {
                method: 'POST',
                headers: config.get('headers'),
                body: JSON.stringify(data)
            });
            const responsejson = await responsedata.json();
            if (Object.keys(responsejson).length > 0) {
                this.setState({
                    updatedRes: responsejson
                }, () => {
                    context.updateValue(this.state.updatedRes);
                    this
                        .props
                        .history
                        .push("/result");
                });
            }
        }
        else {
            alert("Please try after sometime.");
        }
    }
/* eslint-disable */
    render() {
        return (
            <Context.Consumer>
                {context => {
                    const { vehicles, planets, selectplanets, selectvehicles, updatedRes, disabled, isLoading } = this.state;
                  return (<FormContainer
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit(context)}
                    vehicles={vehicles}
                    planets={planets}
                    selectplanets={selectplanets}
                    selectvehicles={selectvehicles}
                    updatedRes={updatedRes}
                    disabled={disabled}
                    isLoading={isLoading}
                    context={context} />);
                }
              }
            </Context.Consumer>
      );
    }
}

export default withRouter(FromComponent);
