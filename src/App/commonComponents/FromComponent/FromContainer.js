import React, {memo} from 'react'
import Select from './../Select'
import Radio from './../Radio'
import Duration from './../timeDuration'
import ErrorBoundary from '../../../ErrorBoundary'
import './From.css'

function FormContainer(props) {
    const {
            planets,
            disabled,
            vehicles,
            handleChange,
            handleSubmit,
            selectplanets,
            selectvehicles
        } = props
        let planet = '',
            vehiclename = ''
        // as per the doc your need to select 4 planets to search. So, the array iteration is done 4 corresponding array items. This solution is more generic for this.

        const formitem = Array
            .apply(null, Array(4))
            .map(function (_, i) {
                planet = "planet" + i
                vehiclename = "vehicle" + i
                return (
                    <div className="column is-one-quarter" key={i}>
                        <Select
                            key={i}
                            planets={planets}
                            name={planet}
                            value={selectplanets && selectplanets.hasOwnProperty(planet)
                            ? selectplanets[planet]
                            : ''}
                            handleChange={handleChange(i)}
                            data-id={selectplanets && selectplanets.hasOwnProperty(planet)
                            ? selectplanets[planet]
                            : ''}/>
                        <br/> {selectplanets.hasOwnProperty(planet) && vehicles.map((vehicle, index) => <Radio
                            key={index}
                            radio={vehicle}
                            id={vehiclename + index}
                            name={vehiclename}
                            data={selectvehicles && selectvehicles.hasOwnProperty(vehiclename)
                            ? selectvehicles[vehiclename]
                            : ''}
                            handleChange={handleChange(i)}/>)}
                        <br/> {selectvehicles[vehiclename] && <Duration selectvehicle={selectvehicles[vehiclename]} vehicles={vehicles}/>}
                    </div>
                )
            })
        return (
            <ErrorBoundary>
                <form className="columns is-multiline" onSubmit={handleSubmit}>
                    {formitem}
                    <div className="column is-full">
                        <div className="control has-text-centered">
                            <button
                                className="button is-primary is-rounded"
                                type="submit"
                                disabled={disabled
                                ? true
                                : false}>
                                Find Falcone
                            </button>
                        </div>
                    </div>
                </form>
                
            </ErrorBoundary>
        )
    }

    export default memo(FormContainer)