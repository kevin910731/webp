import React, {useState,useEffect} from 'react';
import Post from './Post';
import Modal from '@mui/material/Modal';
import './App.css';
import {db,auth} from './firebase'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import ImageUpload from './ImageUpload';
// import InstagramEmbed from 'react-instagram-embed';

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {

        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }

      } else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error)=>alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error)=>alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="App">
      <Modal 
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={styles}>
        <form className='app_signup'>
          <center>
            <img
              className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""        
            />
          </center>
          <Input
            placeholder='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit' onClick={signUp}>sign up</Button>
        </form>
          
        </Box>
      </Modal >

      <Modal 
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={styles}>
        <form className='app_signup'>
          <center>
            <img
              className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""        
            />
          </center>
          <Input
            placeholder='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit' onClick={signIn}>sign in</Button>
        </form>
          
        </Box>
      </Modal >

      <div className='app_header'>
        <img
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""        
        />
        {user ? (
          <Button onClick={()=>auth.signOut()}>logout</Button>
        ): (
          <div className='app_loginContainer'>
            <Button onClick={()=>setOpenSignIn(true)}>sing in</Button>
            <Button onClick={()=>setOpen(true)}>sing up</Button>
          </div>
        )}
      </div> 

      <div className='app_posts'>
        {
          posts.map(({id, post}) => (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>want to upload picture need to login in</h3>
      )}
    </div>
  );
}

export default App;
