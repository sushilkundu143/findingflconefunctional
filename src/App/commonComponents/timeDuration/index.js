import React from 'react'

const Duration = React.memo(props => {
        return (
            <div className="w-100">
               <h5 className="title is-5">Time Taken: {props.duration}</h5>
            </div>
        )
})

export default Duration