import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title'

import Debug from './Debug'
import PublicHomePage from './PublicHomePage'
import HomePage from './HomePage'
import OkLogin from './Ok/OkLogin'
import OkAuthorized from './Ok/OkAuthorized'
import GoogleAuthorized from './Google/GoogleAuthorized'
import CoursePage from './CoursePage'
import Video from './VideoPage'
import EditVideo from './EditVideo'
import OkPrivate from './Ok/OkPrivate'
import InstructorAuthenticated from './InstructorAuthenticated'
import NotFound from './errors/NotFound'

class App extends Component {

  render() {
    return (
      <DocumentTitle title="Hermes">
        <Switch>
          <Route exact path="/" component={PublicHomePage}/>
          <Route exact path="/home" render={({ location, match }) => (
              <OkPrivate nextUrl={location.pathname}>
                <HomePage/>
              </OkPrivate>
          )}/>
          <Route exact path="/login" component={OkLogin}/>
          <Route exact path="/authorized" component={OkAuthorized}/>
          <Route exact path="/googleAuthorized" component={GoogleAuthorized}/>
          <Route exact path="/course/:courseId" render={({ location, match }) => (
            <OkPrivate nextUrl={location.pathname}>
              <InstructorAuthenticated nextUrl={location.pathname} allowNonInstructors={true}>
                <CoursePage courseId={Number.parseInt(match.params.courseId, 10)}/>
              </InstructorAuthenticated>
            </OkPrivate>
          )}/>
          <Route exact path="/course/:courseId/lecture/:lectureUrlName/video/:videoIndex" render={({ location, match, history }) => (
            <OkPrivate nextUrl={location.pathname}>
              <InstructorAuthenticated nextUrl={location.pathname} allowNonInstructors={true}>
                <Video
                  key={`${match.params.courseId}-${match.params.lectureUrlName}-${match.params.videoIndex}`}
                  courseId={Number.parseInt(match.params.courseId, 10)}
                  lectureUrlName={match.params.lectureUrlName}
                  videoIndex={Number.parseInt(match.params.videoIndex, 10)}
                  location={location}
                  history={history}
                />
              </InstructorAuthenticated>
            </OkPrivate>
          )}/>
          <Route exact path="/course/:courseId/lecture/:lectureUrlName/video/:videoIndex/edit" render={({ location, match }) => (
            <OkPrivate nextUrl={location.pathname}>
              <InstructorAuthenticated nextUrl={location.pathname} allowNonInstructors={false}>
                <EditVideo
                  key={`${match.params.courseId}-${match.params.lectureUrlName}-${match.params.videoIndex}`}
                  courseId={Number.parseInt(match.params.courseId, 10)}
                  lectureUrlName={match.params.lectureUrlName}
                  videoIndex={Number.parseInt(match.params.videoIndex, 10)}
                />
              </InstructorAuthenticated>
            </OkPrivate>
          )}/>
          <Route exact path="/debug" component={Debug}/>
          <Route component={NotFound} />
        </Switch>
      </DocumentTitle>
    );
  }

}

export default App;
