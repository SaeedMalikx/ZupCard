const initialState = {
  userid: null,
  category: "",
};


const user = (state = initialState, action) => {
  switch(action.type) {
    case "CREATE_USER": 
        return Object.assign({}, state, {
        userid: action.payload
      })
    default:
      return state;
  }
};

export default user
