import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';

// pages
import Dashboard from '../../pages/dashboard';

import Tables from '../../pages/tables';

// context
import { useLayoutState } from '../../context/LayoutContext';

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/admin/dashboard" component={Dashboard} />

            <Route path="/admin/restaurant" component={Tables} />

            <Route />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
