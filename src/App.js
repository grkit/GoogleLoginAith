import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';


function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credentials)
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signinDiv").hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signinDiv").hidden = false;
  }

  useEffect(()=>{
    /**Global google */
    google.accounts.id.initialize({
      client_id:"547872092368-4s3llb5csnfo07jlrlkvkkibdan49hk0.apps.googleusercontent.com",
      callback : handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size:'large'}
    );

    google.accounts.id.propmt();
  },[]);
  //if we have no user: sign in button
  //if we have a user: shoew the log out button
  return (
    <div className="App">
      <div id='signInDiv'></div>
      {
        Object.keys(user).length !=0 &&
        <button onClick={(e) => handleSignOut}></button>
      }
      
      {user && 
        <div>
          <img src={user.picture} alt=""/>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
