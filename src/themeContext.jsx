import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();
const { Provider } = Context;

function ThemeContextProvider(props) {
  const [status, setStatus] = useState({});

  const updateValue = (val) => {
    if (Object.keys(val).length > 0) {
      setStatus(val);
    }
  };
  const { children } = props;
  return (
    <Provider
      value={{ status, updateValue }}
    >
      {status && children}
    </Provider>
  );
}

ThemeContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export { ThemeContextProvider, Context };
