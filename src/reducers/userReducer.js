const initialState = {
  userid: null,
  cardlist: [],
  nocards: "No Cards, Add Some",
  size: "medium",
  fontcolor: "white"
};


const user = (state = initialState, action) => {
  switch(action.type) {
    case "CREATE_USER": 
        return Object.assign({}, state, {
        userid: action.payload
      })
    case "SET_CARDS": 
        return Object.assign({}, state, {
        cardlist: action.payload,
        nocards: ""
      })
    case "CLEAR_CARDS": 
      return initialState
    case "SET_CARDS_FONTCOLOR": 
        return Object.assign({}, state, {
          fontcolor: action.payload.fontcolor
      })
    case "SET_SIZE": 
        return Object.assign({}, state, {
        size: action.payload,
        
      })
    default:
      return state;
  }
};

export default user
