import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core';
import FlexContainer from 'components/FlexContainer';
import Header from 'components/Header';
import Configuration from 'pages/Configuration';
import Home from 'pages/Home';
import PomodoroHistory from 'pages/PomodoroHistory';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';
import GlobalStyles from 'styles/GlobalStyles';
import { lightTheme } from 'styles/themes/lightTheme';

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={lightTheme}>
        <FlexContainer>
          <GlobalStyles />
          <Header />
          <FlexContainer padding={3}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/config" component={Configuration} />
              <Route exact path="/pomodoroHistory" component={PomodoroHistory} />
            </Switch>
          </FlexContainer>
        </FlexContainer>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
