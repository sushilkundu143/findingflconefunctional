import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import Radio from '../Radio';
import Duration from '../timeDuration';
import ErrorBoundary from '../../../ErrorBoundary';
import './From.css';

function FormContainer(props) {
  const {
    planets,
    disabled,
    vehicles,
    handleChange,
    handleSubmit,
    selectplanets,
    selectvehicles,
    isLoading,
  } = props;
  let planet = '';
  let vehiclename = '';
  /*
  as per the doc your need to select 4 planets to search. So, the array iteration is done 4
  corresponding array items. This solution is more generic for this.
  */
  const formitem = [...Array(4)]
    .map((_, i) => {
      planet = `planet${i}`;
      vehiclename = `vehicle${i}`;
      return (
        <div className="column is-one-quarter" key={planet}>
          <Select
            planets={planets}
            name={planet}
            value={selectplanets
              && Object.prototype.hasOwnProperty.call(selectplanets, planet)
              ? selectplanets[planet]
              : ''}
            handleChange={handleChange(i)}
            data-id={selectplanets
              && Object.prototype.hasOwnProperty.call(selectplanets, planet)
              ? selectplanets[planet]
              : ''}
          />
          {Object.prototype.hasOwnProperty.call(selectplanets, planet)
          && vehicles.map((vehicle, index) => (
            <Radio
              key={vehicle.name}
              radio={vehicle}
              id={vehiclename + index}
              name={vehiclename}
              data={selectvehicles
                && Object.prototype.hasOwnProperty.call(selectvehicles, vehiclename)
                ? selectvehicles[vehiclename]
                : ''}
              handleChange={handleChange(i)}
            />
          ))}
          {selectvehicles[vehiclename]
          && <Duration selectvehicle={selectvehicles[vehiclename]} vehicles={vehicles} />}
        </div>
      );
    });
  return (
    <ErrorBoundary>
      <form className="columns is-multiline" onSubmit={handleSubmit}>
        {formitem}
        <div className="column is-full">
          <div className="control has-text-centered">
            <button
              className={`button is-primary is-rounded${isLoading ? ' is-loading disabled' : ''}`}
              type="submit"
              disabled={!!disabled}
            >
              Find Falcone
            </button>
          </div>
        </div>
      </form>
    </ErrorBoundary>
  );
}

FormContainer.defaultProps = {
  isLoading: false,
};

FormContainer.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  /* eslint-disable */
  vehicles: PropTypes.array.isRequired, 
  planets: PropTypes.array.isRequired, 
  selectplanets: PropTypes.object.isRequired,
  selectvehicles: PropTypes.object.isRequired,
  /* eslint-enable */
  isLoading: PropTypes.bool,
};

export default memo(FormContainer);
