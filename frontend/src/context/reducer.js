const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CATEGORY':
      console.log(action.payload);
      return {
        ...state,
        categoryName: action.payload.cateName,
        categoryId: action.payload.Category_id,
      };
    case 'ALL_ITEMS':
      return { ...state, allitems: action.payload };
    case 'EDIT_ITEMS':
      console.log(action.payload);
      return { ...state, editItem: action.payload };

    case 'Update_User':
      return { ...state, currentUser: action.payload };
    case 'Close_Login':
      return { ...state, openLogin: false };
    case 'Open_Login':
      return { ...state, openLogin: true };
    default:
      throw new Error('No action matched');
  }
};

export default reducer;
