import { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Calendar } from './views/appointments/Calendar';
import { Home } from './views/home/Home';
import { AllStaff } from './views/staff/AllStaff';
import { Treatments } from './views/treatments/Treatments';
import { Signin } from './views/user/Signin';
import { UserProfile } from './views/user/UserProfile';

export function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/staff" component={AllStaff} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/treatments" component={Treatments} />
      <Route path="/sign-in" component={Signin} />
      <Route path="/user/:id" component={UserProfile} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
