const initialState = {
  userid: null,
  cardlist: [],
  nocards: "No Cards, Add Some",
  size: "medium",
  fontcolor: "white",
  isloggedin: false
};


const user = (state = initialState, action) => {
  switch(action.type) {
    case "SET_USERINFO": 
        return Object.assign({}, state, {
        userid: action.payload
      })
    case "SET_CARDS": 
        return Object.assign({}, state, {
        cardlist: action.payload,
        nocards: ""
      })
    case "CLEAR_CARDS": 
      return Object.assign({}, state, {
        cardlist: [],
        nocards: " No Cards, Add Some"
      })
    case "SET_CARDS_FONTCOLOR": 
        return Object.assign({}, state, {
          fontcolor: action.payload.fontcolor
      })
    case "SET_SIZE": 
        return Object.assign({}, state, {
        size: action.payload,
        
      })
    case "SET_ISLOGGEDIN":
      return Object.assign({}, state, {
        isloggedin: action.payload,
        
      })
    default:
      return state;
  }
};

export default user
