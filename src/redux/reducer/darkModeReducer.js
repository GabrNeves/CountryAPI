const initialState = {
  palette: { 
    mode: 'light', 
  },
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "LIGHT_THEME_SELECTED":
      return {
        palette: {
          mode: 'light',
        }
      }
    case "DARK_THEME_SELECTED":
      return {
        palette: {
          mode: 'dark',
        }
      }
    default:
      return state
  }
}

export default reducer