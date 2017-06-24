const initialState = {
  userid: null,
  cardlist: [],
  nocards: "No Cards, Add Some",
  frontcardcolor: "front yellow",
  backcardcolor: "back yellow",
  size: "medium"
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
    case "SET_CARDS_COLOR": 
        return Object.assign({}, state, {
          frontcardcolor: action.payload.frontcolor,
          backcardcolor: action.payload.backcolor
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
