import React from 'react'

const Duration = React.memo(props => {
    const filterObj = props.vehicles.filter(x => x.name === props.selectvehicle)[0]
    const {max_distance, speed } = filterObj
    const duration = max_distance / speed
        return (
            <div className="w-100">
               <h6 className="title is-6">Time Taken: {duration}</h6>
            </div>
        )
})

export default Duration