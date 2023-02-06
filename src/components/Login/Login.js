import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { 
        getAuth, 
        signInWithPopup, 
        signOut, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        updateProfile,
        FacebookAuthProvider  } from "firebase/auth";
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { Navigate, Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';

const app = initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [singleUser, setSingleUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false,
  });

  // using context api
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const auth = getAuth();

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const {displayName, photoURL, email} = user;

        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        }
        
        setSingleUser(signedInUser);

        console.log(displayName, photoURL, email);
        console.log(signedInUser);

        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const handleFbSignIn = () => {
    signInWithPopup(auth, fbProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log('logging in');
      console.log(user.displayName);

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
    // signInWithPopup(auth, fbProvider)
    // .then((result) => {
    //   // The signed-in user info.
    //   const user = result.user;
    //   console.log('fb user', user);

    //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //   const credential = FacebookAuthProvider.credentialFromResult(result);
    //   const accessToken = credential.accessToken;

    //   const {displayName} = user;

    //   const signedInUser = {
    //     isSignedIn: true,
    //     name: displayName,
    //   }
      
    //   setSingleUser(signedInUser);

    //   // ...
    // })
    // .catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = FacebookAuthProvider.credentialFromError(error);

    //   // ...
    // });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      const signedInUser = {
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
      }
      
      setSingleUser(signedInUser);
      console.log('Sign-out successful');

    }).catch((error) => {
      // An error happened.
    });
  }

  const handleBlur = (event) => {
    let isFormValid = true;
    console.log(event.target.name, event.target.value);
    if(event.target.name === 'email') {
      const email = event.target.value;
      isFormValid = /\S+@\S+\.\S+/.test(email);
      console.log(isFormValid)
    }
    if(event.target.name === 'password') {
      const password = event.target.value;
      const passwordLengthValidation = password.length > 7;
      const passwordHasNumberValidation = /\d{1}/.test(password);
      isFormValid = passwordLengthValidation && passwordHasNumberValidation
      console.log(isFormValid);
    }
    if(isFormValid) {
      const newUserInfo = {...singleUser};
      newUserInfo[event.target.name] = event.target.value;
      setSingleUser(newUserInfo);
    }
  }

  const handleSubmit = (event) => {
    if( newUser && singleUser.email && singleUser.password){
      console.log(singleUser.email, singleUser.password);
      createUserWithEmailAndPassword(auth, singleUser.email, singleUser.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const newUser =  {...singleUser};
        newUser.error = '';
        newUser.success = true;
        setSingleUser(newUser);
        updateUserProfile(singleUser.name);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const newInfo = {...singleUser};
        newInfo.error = "Error 400 Email already in use";
        newInfo.success = false;
        setSingleUser(newInfo);
        // ..
      });
    }

    if(!newUser && singleUser.email && singleUser.password){
      signInWithEmailAndPassword(auth, singleUser.email, singleUser.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const newUser = {...singleUser};
        newUser.error = '';
        newUser.success = true;
        setSingleUser(newUser);
        setLoggedInUser(newUser);
        
        // logged in user will redirect to the desired location
        if(location.state?.from){
          navigate(location.state.from);
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const newInfo = {...singleUser};
        newInfo.error = errorMessage;
        newInfo.success = false;
        setSingleUser(newInfo);
      });
    }

    event.preventDefault();
  }

  const updateUserProfile = name => {
    updateProfile(auth.currentUser, {
      displayName: name, 
    }).then(() => {
      // Profile updated!
      console.log('user name updated');
      // ...
    }).catch((error) => {
      // An error occurred
      console.log(error);
      // ...
    });
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Authentication System using Google</h1>
      {
        // if the user is signed in then he will be able to see sign out button otherwise Sign in
        singleUser.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
        <button onClick={handleGoogleSignIn}>Sign in</button>
      }
      <br />
      <br />
      {
        singleUser.isSignedIn &&
        <div>
          <img src={singleUser.photo} alt="" />
          <p>Welcome, {singleUser.name}</p>
          <p>Your email: {singleUser.email}</p>
        </div>
      }
      <br />
      <hr />

      <h1>Authentication System using Facebook</h1>
      <button onClick={handleFbSignIn}>Sign In</button>
      {
        singleUser.signedInUser && <p>Name: {singleUser.name}</p>
      }

      <br />
      <hr />

      <h1>Authentication System Using Manual Email & Password</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User SignUp</label>
      <form onSubmit={handleSubmit}>
        {
          newUser && <input type="text" name='name' onBlur={handleBlur} placeholder='name'/>
        }
        <br />
        <input type="text" name='email' onBlur={handleBlur} placeholder='email' required/>
        <br />
        <input type="password" name='password' onBlur={handleBlur} placeholder='password' required/>
        <br />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      {/* for the new user */}
      {
        newUser && singleUser.success && <p style={{color: 'green'}}>Successfully Signed up</p>
      }
      {/* for the existing user while trying to create account */}
      <p style={{color: 'red'}}>{singleUser.error}</p>
      {/* existing user during logging time */}
      {
        !newUser && singleUser.success && <p>Signed in Successfully</p>
      }
    </div>
  );
}

export default Login;
