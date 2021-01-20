import React, { useContext } from 'react';
import './Result.css';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../../ErrorBoundary';
import { Context } from '../../themeContext';

function Result() {
  const context = useContext(Context);
  const { status } = context;
  const { statusData, planetName } = status;
  const message = statusData === 'success'
    ? 'Success! Congratulations on Finding Falcone. King Shan is mightly pleased.'
    : 'Failed! You are unable to find the Queen.';
  const myPlanetName = planetName && (
  <h4 className="title is-4">
    Planet Name:
    { planetName }
  </h4>
  );
  return (
    <ErrorBoundary>
      <div className="column has-text-centered">
        <h3 className="title is-4">{message}</h3>
        <br />
        {myPlanetName}
        <br />
        <Link className="button is-rounded" role="button" to="/">
          Start Again
        </Link>
      </div>
    </ErrorBoundary>
  );
}

export default Result;
