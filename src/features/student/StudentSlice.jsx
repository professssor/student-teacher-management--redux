import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  students: [],
  status: "idle",
  error: null,
};
//async call to fetch the student data
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://studentmanagemensystem.professssor.repl.co/student"
    );

    return response.data.data;
  }
);
//async call to post  the student data
export const AddStudentDetails = createAsyncThunk(
  "students/addStudents",
  async (studentData) => {
    console.log(studentData, "cheetah hi kehde");
    const response = await axios.post(
      "https://studentmanagemensystem.professssor.repl.co/student",
      studentData
    );

    return response.data;
  }
);

//async call to post  the student data
// async call to update the student data
export const updateStudentDetails = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `https://studentmanagemensystem.professssor.repl.co/students/${id}`,
      updatedData
    );

    return response.data.data;
  }
);

//async call to delete  the student data
export const removeStudentData = createAsyncThunk(
  "students/removeStudent",
  async (id) => {
    const response = await axios.delete(
      "https://studentmanagemensystem.professssor.repl.co/student",
      { data: { _id: id } }
    );

    return response.data.data;
  }
);

//SLICE IS GENERATED BELOW
export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // define the syncronous reducer function
  },

  extraReducers: (builder) => {
    // fetchstudent promise handling
    builder.addCase(fetchStudents.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "failure";
      state.error = action.error.message;
    });

    // addStudents promise handling
    builder.addCase(AddStudentDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(AddStudentDetails.fulfilled, (state, action) => {
      state.status = "success";
      state.students.push(action.payload);
    });
    builder.addCase(AddStudentDetails.rejected, (state, action) => {
      state.status = "failure";
      state.error = action.error.message;
    });

    builder.addCase(updateStudentDetails.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    });

    builder.addCase(updateStudentDetails.rejected, (state, action) => {
      state.status = "failure";
      state.message = action.error.message;
    });
    builder.addCase(updateStudentDetails.pending, (state, action) => {
      state.status = "loading";
    });

    // remove students
    builder.addCase(removeStudentData.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(removeStudentData.fulfilled, (state, action) => {
      state.status = "success";
      state.students = state.students.filter(
        (student) => student._id !== action.payload._id
      );
    });

    builder.addCase(removeStudentData.rejected, (state, action) => {
      state.status = "failure";
      state.error = action.error.message;
    });
  },
});
export default studentSlice.reducer;
