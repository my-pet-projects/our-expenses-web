import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';

import { Category, SerializedAppError, serializeError } from 'src/models';
import { IHttpRequestOptions, sendRequest } from 'src/services/http';
import { RootState } from 'src/store';

export interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error?: SerializedAppError | null;
  latestRequestId?: string;
}

const authSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
    latestRequestId: ''
  } as CategoriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, { meta }) => {
      state.categories = [];
      state.isLoading = true;
      state.error = null;
      state.latestRequestId = meta.requestId;
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload, meta }) => {
      if (isMostRecent(meta.requestId, state)) {
        return;
      }
      state.categories = payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(
      fetchCategories.rejected,
      (state, { payload, error, meta }) => {
        if (isMostRecent(meta.requestId, state)) {
          return;
        }
        state.isLoading = false;
        state.error = payload ? payload : error;
      }
    );
  }
});

// This will help to handle race conditions only when component rerenders during React strict mode checks.
// Will not handle other race condition cases!
const isMostRecent = (
  currentRequestId: string,
  state: CategoriesState
): boolean => currentRequestId !== state.latestRequestId;

interface FetchCategoriesArgs {
  categoryId?: string;
}

export const fetchCategories = createAsyncThunk<
  Category[],
  FetchCategoriesArgs,
  {
    signal: AbortSignal;
    rejectValue: SerializedAppError;
    state: {
      categories: CategoriesState;
    };
  }
>('categories/fetch', async ({ categoryId }, { signal, rejectWithValue }) => {
  const options = {
    path: categoryId ? `categories?parentId=${categoryId}` : 'categories',
    method: 'GET',
    abortSignal: signal
  } as IHttpRequestOptions;
  try {
    return await sendRequest<Category[]>(options);
  } catch (err) {
    return rejectWithValue(serializeError(err));
  }
});

export const categoriesReducer = authSlice.reducer;

export const getCategories = createSelector(
  (state: RootState) => state.categories,
  (store) => store.categories
);
export const getError = createSelector(
  (state: RootState) => state.categories,
  (store) => store.error
);
export const getIsLoading = createSelector(
  (state: RootState) => state.categories,
  (store) => store.isLoading
);
