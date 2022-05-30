import React from 'react';
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from "@mui/material";
import { CssBaseline } from "@mui/material";

export const myContext = React.createContext();

const darkTheme = createTheme(adaptV4Theme({
    palette: {
      mode: "dark",
    }
  }))

const Provider = props => {

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
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