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
import AllRequestPage from '../../pages/allRequest.jsx';
import SignIn from '../signIn/signIn.jsx';
import SignUp from '../signUp/signUp.jsx';
import LoginContext from '../../context/authContext';
import VideoContext from '../../context/video';
import Chat from '../../pages/chat.jsx';
// import Login from './components/todo/logIn';
import OthersProfile from '../othersProfile/othersProfile'
import video from '../../pages/video.jsx';


const Main = (props) =>{
  return (
      <>
      <LoginContext>
      <VideoContext>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/" component={UserProfilePage}>
          </Route>
          <Route  exact path="/request/:id" component={UserRequestPage} />
          <Route  exact path="/settings" component={Settings} />
          <Route  exact path="/notification" component={Notification} />
          <Route  exact path="/chat/:id" component={Chat} />
          <Route  exact path="/search" component={Search} />
          <Route  exact path="/searchResult" component={SearchResultsPage} />
          <Route  exact path="/explore" component={ExplorePage} />
          <Route  exact path="/request" component={RequestForm} />
          <Route  exact path="/allRequest" component={AllRequestPage} />
          <Route  exact path="/signin" component={SignIn} />
          <Route  exact path="/signup" component={SignUp} />
          <Route  exact path="/profile/:id" component={OthersProfile} />
          <Route  exact path="/video/:id" component={video} />


        </Switch>
      </Router>
      </VideoContext>
      </LoginContext>
        </>
    )
}


export default Main;