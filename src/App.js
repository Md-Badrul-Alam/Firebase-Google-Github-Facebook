import {
   FacebookLoginButton,
   GithubLoginButton,
   GoogleLoginButton,
} from "react-social-login-buttons";
import {
   FacebookAuthProvider,
   getAuth,
   GithubAuthProvider,
   GoogleAuthProvider,
   signInWithPopup,
   signOut,
} from "firebase/auth";
import app from "./Firebase/firebase.into";
import { useState } from "react";

const auth = getAuth(app);

function App() {
   const [user, setUser] = useState({});

   const provider = new FacebookAuthProvider();
   const providerGoogle = new GoogleAuthProvider();
   const providerGithub = new GithubAuthProvider();

  //  Facebook Login
   const handleFacebookLogin = () => {
      signInWithPopup(auth, provider)
         .then((result) => {
            const user = result.user;
            console.log(user);
            setUser(user);
         })
         .catch((error) => {
            console.log("badal", error);
         });
   };
     
    // Google Login

   const handleGoogleLogin = () => {
    signInWithPopup(auth, providerGoogle)
       .then((result) => {
          const user = result.user;
          setUser(user);
       })
       .catch((error) => {
          console.log("badal", error);
       });
    };

    //  Github Login

    const handleGithubLogin = () => {
        signInWithPopup(auth, providerGithub)
          .then((result) => {
              const user = result.user;
              setUser(user);
          })
          .catch((error) => {
              console.log("badal", error);
          });
    };

    // Sign Out

   const handleSignOut = () => {
      signOut(auth)
         .then(() => {
            setUser({});
         })
         .catch(() => {
            setUser({});
         });
   };

  

   return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
         <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
            <h1 className="text-4xl font-semibold text-center text-purple-700 uppercase">
               Sign in
            </h1>
            {user.uid ? (
               <button
                  onClick={handleSignOut}
                  className="flex mt-4 gap-x-2 p-2  border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600 mx-auto "
               >
                  Sing Out
               </button>
            ) : (
               <div>
                  <div className="flex mt-4 gap-x-2">
                     <FacebookLoginButton
                        onClick={handleFacebookLogin}
                     ></FacebookLoginButton>

                     <GoogleLoginButton
                        onClick={handleGoogleLogin}
                     ></GoogleLoginButton>
                  </div>
                  <GithubLoginButton
                     onClick={handleGithubLogin}
                  ></GithubLoginButton>
               </div>
            )}
            {user.uid && (
               <div>
                  <h1>Name: {user?.displayName}</h1>
                  <h4>Email: {user?.email}</h4>
                  <img src={user?.photoURL} alt="" />
               </div>
            )}
         </div>
      </div>
      
   );
}

export default App;
