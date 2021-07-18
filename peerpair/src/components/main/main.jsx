import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../header/header.jsx';
import UserRequestPage from '../../pages/userRequest.jsx';
import Settings from '../settings/settings.jsx';
import Notification from '../notification/notification.jsx';
import Search from '../searchBar/searchBar.jsx';
import ExplorePage from '../../pages/explore.jsx';
import UserProfilePage from '../../pages/home.jsx';
import RequestForm from '../createRequestForm/createRequestForm.jsx';
import SearchResultsPage from '../../pages/searchResults.jsx';
import SignIn from '../signIn/signIn.jsx';
import SignUp from '../signUp/signUp.jsx';


const Main = (props) =>{
    return (
      <Router>
        <>
        <Header/>
        <Switch>
          <Route exact path="/" component={UserProfilePage}>
          </Route>
          <Route  exact path="/request/id" component={UserRequestPage} />
          <Route  exact path="/settings" component={Settings} />
          <Route  exact path="/notification" component={Notification} />
          <Route  exact path="/search" component={Search} />
          <Route  exact path="/searchResult" component={SearchResultsPage} />
          <Route  exact path="/explore" component={ExplorePage} />
          <Route  exact path="/request" component={RequestForm} />
          <Route  exact path="/signin" component={SignIn} />
          <Route  exact path="/signup" component={SignUp} />
        </Switch>
        </>
      </Router>
    )
}


export default Main;