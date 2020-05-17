import React from 'react'
import PropTypes from 'prop-types'
const Radio = React.memo(props => {
    return (
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
            <label htmlFor={props.id}>{props.radio.name}
                ({props.radio.total_no})</label>
        </div>
    )
})

Radio.propTypes = {
    radio: PropTypes.object.isRequired
}

export default Radio