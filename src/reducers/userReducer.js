const initialState = {
  userid: null,
  category: "",
  cardlist: []
};


const user = (state = initialState, action) => {
  switch(action.type) {
    case "CREATE_USER": 
        return Object.assign({}, state, {
        userid: action.payload
      })
    case "SET_CARDS": 
        return Object.assign({}, state, {
        cardlist: action.payload
      })
    default:
      return state;
  }
};

export default user
