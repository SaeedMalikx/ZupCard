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
        dispatch({type: "SET_ISLOGGEDIN", payload: true})
        dispatch({type: "SET_USERINFO", payload: user.email})}
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
        dispatch({type: "SET_ISLOGGEDIN", payload: true})
        dispatch({type: "SET_USERINFO", payload: user.email})}
      });
};

export const addcard = ({front, back, userid, frontcolor, backcolor}) => (dispatch, getState) => {
    const user = firebase.auth().currentUser;
    if (user != null) {
    firebase.database().ref('users').child(user.uid).child('category').child(getState().user.currentcat).child('cards').push({
        'front': front,
        'back': back,
        'frontcolor': frontcolor,
        'backcolor': backcolor,
        'border': "cardborder" 
    })}
}

export const cardrefresh = () => (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
            dispatch({type: "SET_ISLOGGEDIN", payload: true})
            dispatch({type: "SET_USERINFO", payload: user.email})
            
            firebase.database().ref('users').child(user.uid).child('category').child(getState().user.currentcat).child('cards').on('value', snap =>{
                
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
                      dispatch({type: "SET_CARDS", payload: cardlist})
                      dispatch({type: "SET_CARDLENGTH", payload: cardlist.length})
                    }
                } else {
                    dispatch({type: "CLEAR_CARDS", payload: []})
                } 
            });
            firebase.database().ref('users').child(user.uid).child('categories').on('value', snap =>{
                
                if (snap.val()) {
                    let cardcat = snap.val();
                    let cardcatlist = [];
                    for (let cat in cardcat) {
                      cardcatlist.push({
                        catid: cat,
                        category: cardcat[cat].category
                      })
                      dispatch({type: "SET_CARDSCAT", payload: cardcatlist})
                    }
                } else {
                    dispatch({type: "CLEAR_CARDSCAT", payload: []})
                } 
            });
        } else {
            dispatch({type: "CLEAR_CARDS", payload: []})
            dispatch({type: "SET_ISLOGGEDIN", payload: false})
        }
    })
}

export const deletecard = (id) => (dispatch, getState) => {
    const user = firebase.auth().currentUser;
    if (user != null) {
        firebase.database().ref('users').child(user.uid).child('category').child(getState().user.currentcat).child('cards').child(id).remove()
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


export const setborder = ({newborder, cardid}) => (dispatch, getState) => {
    const user = firebase.auth().currentUser;
    if (user != null) {
        firebase.database().ref('users').child(user.uid).child('category').child(getState().user.currentcat).child('cards').child(cardid).update({
            'border': newborder
        }).then()
    }
}

export const setedit = ({front, back, id}) => (dispatch, getState) => {
    const user = firebase.auth().currentUser;
    if (user != null) {
        firebase.database().ref('users').child(user.uid).child('category').child(getState().user.currentcat).child('cards').child(id).update({
            'front': front,
            'back': back,
        })
    }
}

export const addcategory = (cat) => dispatch =>{
    const user = firebase.auth().currentUser;
    firebase.database().ref('users').child(user.uid).child('categories').push({
                        'category': cat
                    })
}

export const deletecategory = ({catid, catname}) => dispatch =>{
    const user = firebase.auth().currentUser;
    if (user != null) {
    firebase.database().ref('users').child(user.uid).child('categories').child(catid).remove()
    firebase.database().ref('users').child(user.uid).child('category').child(catname).remove()
    }
}


export const changecat = (cat) => (dispatch, getState) =>{
    const user = firebase.auth().currentUser;
    dispatch({type: "SET_CAT", payload: cat})
    if (user != null) {
            firebase.database().ref('users').child(user.uid).child('category').child(getState().user.currentcat).child('cards').on('value', snap =>{
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
                      dispatch({type: "SET_CARDS", payload: cardlist})
                      dispatch({type: "SET_CARDLENGTH", payload: cardlist.length})
                    }
                } else {
                    dispatch({type: "CLEAR_CARDS", payload: []})
                } 
            });
        } else {
            dispatch({type: "CLEAR_CARDS", payload: []})
        }
}

