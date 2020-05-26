import React from 'react'
import './Result.css'
import {ThemeContextConsumer} from "./../../themeContext"
import {Link} from 'react-router-dom'
import ErrorBoundary from './../../ErrorBoundary'

function Result(props) {
    return (
        <ErrorBoundary>
            <ThemeContextConsumer>
                {context => {
                    const {status, planet_name} = context.status
                    const message = status === 'success'
                        ? 'Success! Congratulations on Finding Falcone. King Shan is mightly pleased.'
                        : 'Failed! You are unable to find the Queen.'
                    const planetName = planet_name && <h4 className="title is-4">Planet Name: {planet_name}</h4>
                    return (
                        <div className="column has-text-centered">
                            <h3 className="title is-4">{message}</h3>
                            <br/> {planetName}
                            <br/>
                            <Link className="button is-rounded" role="button" to="/">
                                Start Again
                            </Link>
                        </div>
                    )
                }}
            </ThemeContextConsumer>
        </ErrorBoundary>
    );
}

export default Result