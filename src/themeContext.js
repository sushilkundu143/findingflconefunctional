import React, {createContext, useState} from "react"
import PropTypes from 'prop-types'

const Context = createContext()
const {Provider} = Context;

function ThemeContextProvider(props) {
    const [status, setStatus] = useState({})

    const updateValue = (val) => {
        console.log('update state with new value:', val)
        if (Object.keys(val).length > 0) {
            setStatus(val);
        }
    }
    return (
        <Provider
            value={{ status, updateValue}}>
            {status && props.children}
        </Provider>
    );
}

ThemeContextProvider.propTypes = {
    status: PropTypes.object
}

export {ThemeContextProvider, Context}
