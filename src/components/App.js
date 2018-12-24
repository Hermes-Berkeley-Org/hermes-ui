import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Debug from './Debug.js';
import PublicHomePage from './PublicHomePage.js';
import HomePage from './HomePage.js';
import OkLogin from './Ok/OkLogin.js';
import OkAuthorized from './Ok/OkAuthorized.js';
import GoogleAuthorized from './Google/GoogleAuthorized.js';
import CoursePage from './CoursePage.js';
import Video from './Video.js';
import OkPrivate from './Ok/OkPrivate.js';
import InstructorAuthenticated from './InstructorAuthenticated.js';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={PublicHomePage} />
        <Route exact path="/home" render={({ location, match }) => (
          <OkPrivate nextUrl={location.pathname}>
            <HomePage />
          </OkPrivate>
        )} />
        <Route exact path="/login" component={OkLogin} />
        <Route exact path="/authorized" component={OkAuthorized} />
        <Route exact path="/googleAuthorized" component={GoogleAuthorized} />
        <Route exact path="/course/:courseId" render={({ location, match }) => (
          <OkPrivate nextUrl={location.pathname}>
            <InstructorAuthenticated nextUrl={location.pathname}>
              <CoursePage courseId={Number.parseInt(match.params.courseId, 10)} />
            </InstructorAuthenticated>
          </OkPrivate>
        )} />
        <Route exact path="/course/:courseId/lecture/:lectureIndex/video/:videoIndex" render={({ location, match }) => (
          <OkPrivate nextUrl={location.pathname}>
            <InstructorAuthenticated nextUrl={location.pathname}>
              <Video
                courseId={Number.parseInt(match.params.courseId, 10)}
                lectureIndex={Number.parseInt(match.params.lectureIndex, 10)}
                videoIndex={Number.parseInt(match.params.videoIndex, 10)}
              />
            </InstructorAuthenticated>
          </OkPrivate>
        )} />
        <Route exact path="/debug" component={Debug} />
      </Switch>
    );
  }

}

export default App;
