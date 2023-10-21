import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teachers: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch teacher data
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get(
      "https://studentmanagemensystem.professssor.repl.co/teacher"
    );

    return response.data.data;
  }
);

// Async thunk to add teacher data
export const addTeacherDetails = createAsyncThunk(
  "teachers/addTeacher",
  async (teacherData) => {
    const response = await axios.post(
      "https://studentmanagemensystem.professssor.repl.co/teacher",
      teacherData
    );

    return response.data.data;
  }
);

// Async thunk to update teacher data
export const updateTeacherDetails = createAsyncThunk(
  "teachers/updateTeacher",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `https://studentmanagemensystem.professssor.repl.co/teacher/${id}`,
      updatedData
    );

    return response.data.data;
  }
);

// Async thunk to remove teacher data
export const removeTeacherData = createAsyncThunk(
  "teachers/removeTeacher",
  async (id) => {
    const response = await axios.delete(
      "https://studentmanagemensystem.professssor.repl.co/teacher",
      {
        data: { _id: id },
      }
    );

    return response.data.data;
  }
);

export const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    // Define synchronous reducer functions if needed
  },
  extraReducers: (builder) => {
    // Fetch teachers promise handling
    builder.addCase(fetchTeachers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.status = "failure";
      state.error = action.error.message;
    });

    // Add Teacher promise handling
    builder.addCase(addTeacherDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addTeacherDetails.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers.push(action.payload);
    });
    builder.addCase(addTeacherDetails.rejected, (state, action) => {
      state.status = "failure";
      state.error = action.error.message;
    });

    // Update Teacher promise handling
    builder.addCase(updateTeacherDetails.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.teachers.findIndex(
        (teacher) => teacher._id === action.payload._id
      );
      if (index !== -1) {
        state.teachers[index] = action.payload;
      }
    });

    builder.addCase(updateTeacherDetails.rejected, (state, action) => {
      state.status = "failure";
      state.message = action.error.message;
    });
    builder.addCase(updateTeacherDetails.pending, (state, action) => {
      state.status = "loading";
    });

    // Remove Teacher promise handling
    builder.addCase(removeTeacherData.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(removeTeacherData.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload._id
      );
    });

    builder.addCase(removeTeacherData.rejected, (state, action) => {
      state.status = "failure";
      state.error = action.error.message;
    });
  },
});

export default teacherSlice.reducer;
