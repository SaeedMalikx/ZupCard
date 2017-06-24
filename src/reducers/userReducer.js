const initialState = {
  userid: null,
  cardlist: [],
  nocards: "No Cards, Add Some"
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
    default:
      return state;
  }
};

export default user
