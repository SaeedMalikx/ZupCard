import firebase from 'firebase';



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
        dispatch({type: "CREATE_USER", payload: user.uid})}
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
        dispatch({type: "CREATE_USER", payload: user.uid})}
      });
};

export const addcard = ({front, back, userid}) => dispatch => {
    const user = firebase.auth().currentUser;
    if (user != null) {
    firebase.database().ref('users').child(user.uid).child('cards').push({
        'front': front,
        'back': back
    })}
}

export const cardrefresh = () => dispatch => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.database().ref('users').child(user.uid).child('cards').on('value', snap =>{
                
                if (snap.val()) {
                    let fcards = snap.val();
                    let cardlist = [];
                    for (let card in fcards) {
                      cardlist.push({
                        id: card,
                        front: fcards[card].front,
                        back: fcards[card].back
                      })
                      dispatch({type: "SET_CARDS", payload: cardlist}, { allowMore: true })
                    }
                } else {
                    dispatch({type: "CLEAR_CARDS", payload: []})
                } 
            });
        }
    })
}

export const deletecard = (id) => dispatch => {
    const user = firebase.auth().currentUser;
    if (user != null) {
        firebase.database().ref('users').child(user.uid).child('cards').child(id).remove()
    }
}

export const setcardcolor = ({frontvalue, backvalue}) => dispatch => {
    const user = firebase.auth().currentUser;
    if (user != null) {
        firebase.database().ref('users').child(user.uid).child('colors').set({
            'frontcolor': frontvalue,
            'backcolor': backvalue
        }).then()
    }
}

export const getcardcolor = () => dispatch => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
        firebase.database().ref('users').child(user.uid).child('colors').on('value', snap =>{
                
                if (snap.val()) {
                    const color = {
                        backcolor: snap.val().backcolor,
                        frontcolor: snap.val().frontcolor
                    }
                    dispatch({type: "SET_CARDS_COLOR", payload: color})
                } 
            });
            }
    })
    
}