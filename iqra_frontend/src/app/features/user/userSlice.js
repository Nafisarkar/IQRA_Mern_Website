import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fix loginUser to better handle errors
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { username, password } = credentials;

      const loginResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include", // Include cookies
          mode: "cors",
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        return rejectWithValue(loginData.message || "Login failed");
      }

      const userResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/me`,
        {
          method: "GET",
          credentials: "include", // Include cookies
          mode: "cors", // Ensure CORS mode for this request
        }
      );

      if (!userResponse.ok) {
        if (userResponse.status === 403) {
          return rejectWithValue("Access denied: Unauthorized");
        }
        return rejectWithValue("Failed to fetch user details");
      }

      const userData = await userResponse.json();

      return userData.payload;
    } catch (error) {
      return rejectWithValue("Network error during login");
    }
  }
);

// Logout thunk
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/logout`,
        {
          method: "POST",
          credentials: "include",
          mode: "cors", // Ensure CORS mode for this request
        }
      );

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.message || "Logout failed");
      }

      return null;
    } catch (error) {
      return rejectWithValue("Network error during logout");
    }
  }
);

// Enhanced checkAuthStatus to handle 403 errors
export const checkAuthStatus = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().userR;

      if (user) {
        return user;
      }

      const userResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/me`,
        {
          credentials: "include", // Include cookies
          mode: "cors", // Ensure CORS mode for this request
        }
      );

      if (!userResponse.ok) {
        if (userResponse.status === 403) {
          return rejectWithValue("Access denied: Unauthorized");
        }
        return rejectWithValue("Not authenticated");
      }

      const userData = await userResponse.json();

      return userData.payload;
    } catch (error) {
      return rejectWithValue("Error checking authentication status");
    }
  }
);

const initialState = {
  user: null,
  isAdmin: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAdmin = Boolean(action.payload?.isAdmin);
    },
    clearUser: (state) => {
      state.user = null;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAdmin = action.payload.isAdmin || false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null; // User is removed from state
        state.isAdmin = false; // isAdmin is reset
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Auth check cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAdmin = action.payload?.isAdmin || false;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.status = "idle";
        state.user = null;
        state.isAdmin = false;
        state.error = action.payload;
      });
  },
});

// Create selectors for more efficient state access
export const selectIsAdmin = (state) => state.userR.isAdmin === true;
export const selectIsAuthenticated = (state) => Boolean(state.userR.user);
export const selectUser = (state) => state.userR.user;
export const selectLoginStatus = (state) => state.userR.status;

// New selector for getting current user details
export const selectCurrentUserDetails = (state) => {
  const user = state.userR.user;
  if (!user) return null;

  return {
    id: user._id,
    username: user.username,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin || false,
  };
};

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
