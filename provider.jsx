import React from 'react';
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from "@mui/material";
import { CssBaseline } from "@mui/material";

export const myContext = React.createContext();

const lightTheme = createTheme(adaptV4Theme({
    palette: {
      mode: "light",
    }
  }))

const Provider = props => {

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
           <CssBaseline/>
        {props.children}
        </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ({element}) => 
(<Provider>
    {element}
</Provider>)