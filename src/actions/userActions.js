import firebase from 'firebase';

const CREATE_USER = 'CREATE_USER'

export const signup = ({email, password}) => dispatch => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            alert(errorMessage);
            }})
      .then(user => {
          if(user!= null){
        dispatch({type: CREATE_USER, payload: user.uid})}
      });
};

export const signin = ({email, password}) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            alert(errorMessage);
            }})
    .then(user => {
          if(user!= null){
        dispatch({type: 'CREATE_USER', payload: user.uid})}
      });
};

export const addcard = ({front, back, userid}) => dispatch => {
    firebase.database().ref('users').child(userid).child('cards').push({
        'front': front,
        'back': back
    })
}