import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "Button",
  className:"bg-black rounded-md px-3 py-2"
}

const buttonSlice = createSlice({
  name:"button",
  initialState,
  reducers:{
    setButtonPros:(state,action)=>{
      return{...state,...action.payload}
    }
  }
})

export const {setButtonPros} = buttonSlice.actions

export default buttonSlice.reducer