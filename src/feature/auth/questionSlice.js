import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { generateInterviewQuestions } from "../../pages/QuestionService";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: " "
  },
  reducers: {
    clearQuestions(state) {
      state.questions = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(questionGenerate.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })

      .addCase(questionGenerate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.questions = action.payload;
        state.message = "";
      })

      .addCase(questionGenerate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.questions = [];
        state.message = action.payload || "Something went wrong";
      });

  }
})

export default questionSlice.reducer
export const {clearQuestions} = questionSlice.actions

// questions generate
export const questionGenerate = createAsyncThunk(
  "question/generate",
  async (formData) => {

    // 2. Call the API helper function with the built prompt
    const response = await generateInterviewQuestions(formData);

    console.log("response", response);

    // 3. Return the response text, which will be the fulfilled payload
    return response;
  }
);
