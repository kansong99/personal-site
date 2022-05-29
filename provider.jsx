import React from 'react';
import { createTheme, ThemeProvider} from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";

export const myContext = React.createContext();

const darkTheme = createTheme({
    palette: {
      type: "dark",
    }
  })

const Provider = props => {

  return (
    <ThemeProvider theme={darkTheme}>
         <CssBaseline/>
      {props.children}
      </ThemeProvider>
  )
};

export default ({element}) => 
(<Provider>
    {element}
</Provider>)