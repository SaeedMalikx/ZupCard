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
        dispatch({type: "SET_ISLOGGEDIN", payload: true})}
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
        dispatch({type: "SET_ISLOGGEDIN", payload: true})}
      });
};

export const addcard = ({front, back, userid, frontcolor, backcolor}) => dispatch => {
    const user = firebase.auth().currentUser;
    if (user != null) {
    firebase.database().ref('users').child(user.uid).child('cards').push({
        'front': front,
        'back': back,
        'frontcolor': frontcolor,
        'backcolor': backcolor,
        'border': "cardborder" 
    })}
}

export const cardrefresh = () => dispatch => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            dispatch({type: "SET_ISLOGGEDIN", payload: true})
            
            firebase.database().ref('users').child(user.uid).child('cards').on('value', snap =>{
                
                if (snap.val()) {
                    let fcards = snap.val();
                    let cardlist = [];
                    for (let card in fcards) {
                      cardlist.push({
                        id: card,
                        front: fcards[card].front,
                        back: fcards[card].back,
                        frontcolor: fcards[card].frontcolor,
                        backcolor: fcards[card].backcolor,
                        border: fcards[card].border
                      })
                      dispatch({type: "SET_CARDS", payload: cardlist}, { allowMore: true })
                    }
                } else {
                    dispatch({type: "CLEAR_CARDS", payload: []})
                } 
            });
        } else {
            dispatch({type: "CLEAR_CARDS", payload: []})
        }
    })
}

export const deletecard = (id) => dispatch => {
    const user = firebase.auth().currentUser;
    if (user != null) {
        firebase.database().ref('users').child(user.uid).child('cards').child(id).remove()
    }
}

export const setfontcolor = ({fontcolor}) => dispatch => {
    const user = firebase.auth().currentUser;
    if (user != null) {
        firebase.database().ref('users').child(user.uid).child('colors').set({
            'fontcolor': fontcolor
        }).then()
    }
}

export const getfontcolor = () => dispatch => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
        firebase.database().ref('users').child(user.uid).child('colors').on('value', snap =>{
                
                if (snap.val()) {
                    const color = {
                        
                        fontcolor: snap.val().fontcolor
                    }
                    dispatch({type: "SET_CARDS_FONTCOLOR", payload: color})
                } 
            });
            }
    })
    
}

export const changecardsize = (size) => dispatch =>{
    dispatch({type: "SET_SIZE", payload: size})
}


export const setborder = ({newborder, cardid}) => dispatch => {
    const user = firebase.auth().currentUser;
    if (user != null) {
        firebase.database().ref('users').child(user.uid).child('cards').child(cardid).update({
            'border': newborder
        }).then()
    }
}