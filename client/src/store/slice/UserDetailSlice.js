import { createSlice } from "@reduxjs/toolkit";

const initialUserDetail = {
  _id:"",
  name: "",
  email: "",
  mobile:"",
  thirdPartyLogin: false,
  addresses: [],
  cart:[]
};

const UserDetailSlice = createSlice({
  name: "userDetail",
  initialState: initialUserDetail,
  reducers: {
    setUserDetail(state, action) {
      console.log("setUserDetail", action.payload);
      return { ...state, ...action.payload };
    },
    updateAddress(state, action) {
      console.log("updateAddress", action.payload);
      const { index, address } = action.payload;
      const updatedAddresses = [...state.addresses];
      updatedAddresses[0] = address;
      return { ...state, addresses: updatedAddresses };
    },
   
    deleteUserDetail() {
      console.log("deleteUserDetail");
      return initialUserDetail;
    },
  },
});

export const { setUserDetail, updateAddress, deleteUserDetail } = UserDetailSlice.actions;
export default UserDetailSlice.reducer;
