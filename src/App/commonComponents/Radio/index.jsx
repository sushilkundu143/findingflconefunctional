import React from 'react';
import PropTypes from 'prop-types';

const Radio = React.memo((props) => (
  <div className="field">
    <input
      className="is-checkradio"
      type="radio"
      name={props.name}
      id={props.id}
      value={props.radio.name}
      checked={props.data === props.radio.name}
      onChange={props.handleChange}
      disabled={props.radio.disabled}
    />
    <label htmlFor={props.id}>
      {props.radio.name}
      (
      {props.radio.total_no}
      )
    </label>
  </div>
));

Radio.propTypes = {
  radio: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    total_no: PropTypes.number,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default Radio;
