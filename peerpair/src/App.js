import './design/App.scss';
import Main from '../src/components/main/main.jsx';
import LoginContext from '../src/context/authContext';



function App(props) {
 

  return (
    <LoginContext>
      <div>

      <Main/>
      </div>
    </LoginContext>
  );
}

export default App;
