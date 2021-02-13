import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const App = () => (
  <div className="App">
    <AppBar position={'static'}>
      <Toolbar>
        <IconButton edge={'start'}>
          <FontAwesomeIcon icon={faBars} color={'white'} />
        </IconButton>
        <Typography variant={"h6"}>Chatlake</Typography>
      </Toolbar>
    </AppBar>
    <Switch>
      <Route exact path="/">
        <p>Home</p>
      </Route>
      <Route path="/login">
        <p>Login</p>
      </Route>
      <Route path="/about">
        <p>About</p>
      </Route>
    </Switch>
  </div>
);

export default App;
