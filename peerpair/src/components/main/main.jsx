import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../header/header.jsx';
import UserRequestPage from '../../pages/userRequest.jsx';
import Settings from '../settings/settings.jsx';
import Notification from '../notification/notification.jsx';
import Search from '../searchForm-PLAN B/searchForm.jsx';
import ExplorePage from '../../pages/explore.jsx';
import UserProfilePage from '../../pages/home.jsx';
import RequestForm from '../createRequestForm/createRequestForm.jsx';
import SearchResultsPage from '../../pages/searchResults.jsx';
import AllRequestPage from '../../pages/allRequest.jsx';
import SignIn from '../signIn/signIn.jsx';
import SignUp from '../signUp/signUp.jsx';
// import LoginContext from '../../context/authContext';
import VideoContext from '../../context/video';
import Chat from '../../pages/chat.jsx';
// import Login from './components/todo/logIn';
import OthersProfile from '../othersProfile/othersProfile'
import video from '../../pages/video.jsx';
import {LoginContext} from '../../context/authContext';
import { useContext } from 'react';
import { If, Then, Else } from 'react-if';
import LandingPage from '../../pages/landing'
import Chatlist from '../../pages/chatlist.jsx';



const Main = (props) =>{
  const contextType = useContext(LoginContext);
  
  return (
      <>
      <Router>
        <Switch>
      <If condition={contextType.loggedIn === true}>
      <Then>
      {/* <LoginContext> */}
      <VideoContext>
        <Header/>
          <Route exact path="/" component={UserProfilePage}>
          {/* ()=> contextType.loggedIn == false ? <LandingPage/>  : <UserProfilePage/>  */}
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
          <Route  exact path="/profile/:id" component={OthersProfile} />
          <Route  exact path="/chat" component={Chatlist} />
          <Route  exact path="/video/:id" component={video} />
      </VideoContext>
      </Then>
      <Else>
      <Route  exact path="/signin" component={SignIn} />
      <Route  exact path="/signup" component={SignUp} />
        <LandingPage/>
      </Else>
      </If>
        </Switch>
      </Router>
      {/* </LoginContext> */}
        </>

    )

}


export default Main;