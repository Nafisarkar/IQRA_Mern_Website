import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

// Fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:3000/api/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  return await response.json();
});

// Fetch a single post
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/postbyid/${id}`, {
        credentials: "include",
      });

      if (!response.ok) return rejectWithValue("Post not found");

      const data = await response.json();
      return data.payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, post }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/updatepost/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update post");
      }

      const data = await response.json();
      return data.payload; // Return the updated post
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  posts: [],
  currentPost: null,
  status: "idle",
  error: null,
  lastFetched: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    filterByCategory: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.payload.posts;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch single post
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
        state.currentPost = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.currentPost = null;
      })

      // Update post
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the post in the posts array
        const updatedPost = action.payload;
        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
        state.currentPost = updatedPost; // Update the current post
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectPostsByCategory = createSelector(
  [(state) => state.postR.posts, (_, category) => category],
  (posts, category) => posts.filter((post) => post.category === category)
);

export const selectPostById = createSelector(
  [(state) => state.postR.posts, (_, id) => id],
  (posts, id) => posts.find((post) => post._id === id)
);

export const selectCurrentPost = (state) => state.postR.currentPost;
export const selectAllPosts = (state) => state.postR.posts;
export const selectPostsStatus = (state) => state.postR.status;
export const selectLastFetched = (state) => state.postR.lastFetched;

export const { filterByCategory } = postSlice.actions;
export default postSlice.reducer;
