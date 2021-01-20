import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Duration = memo((props) => {
  const filterObj = props.vehicles.filter((x) => x.name === props.selectvehicle)[0];
  const { max_distance: maxDistance, speed } = filterObj;
  const duration = maxDistance / speed;
  return (
    <div className="w-100">
      <h6 className="title is-6">
        Time Taken:
        {' '}
        {duration}
      </h6>
    </div>
  );
});

Duration.propTypes = {
  /* eslint-disable */
  vehicles: PropTypes.array.isRequired,
  selectvehicle: PropTypes.string.isRequired,
  /* eslint-enable */
};

export default Duration;
