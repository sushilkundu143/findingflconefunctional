import React from 'react'
import PropTypes from 'prop-types'
const Select = React.memo(props => {
   //console.log('select props:', props)
        const options = props.planets.map((planet, i) => <option key={i} value={planet.name} disabled={planet.disabled}>{planet.name}</option>)
        return (
            <div className="field">
                <div className="control w-100">
                    <div className="select w-100">
                        <select className="w-100" name={props.name} value={props.value} onChange={props.handleChange}>
                            <option>--Select Option---</option>
                            {options}
                        </select>
                    </div>
                </div>
            </div>
        )
})

Select.propTypes = {
    planets: PropTypes.array.isRequired
}

export default Select