import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User, UserFormValues} from "../../app/models/user";
import agent from "../../app/api/agent";
import {router} from "../../router/Routes";
import {store} from "../../redux/store";
import {setActivityLoaded} from "../activities/activitySlice";

interface AccountState {
    user: User | undefined;
}

const initialState: AccountState = {
    user: undefined
}

export const loginAsync = createAsyncThunk<User, User>(
    'account/loginAsync',
    async (user, thunkAPI) => {
        try {
            return await agent.Account.login(user);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.title});
        }
    }
)

export const registerAsync = createAsyncThunk<User, UserFormValues>(
    'account/registerAsync',
    async (user, thunkAPI) => {
        try {
            return await agent.Account.register(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const fetchUserAsync = createAsyncThunk<User>(
    'account/fetchUserAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Account.current();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const logout = () => {
    localStorage.removeItem('jwt');
    store.dispatch(setUser(undefined));
    store.dispatch(setActivityLoaded(false));
    router.navigate('/');
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem('jwt', action.payload.token);
            router.navigate('/activities');
        })
        builder.addCase(registerAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem('jwt', action.payload.token);
            router.navigate('/activities');
        })
        builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
})

export const {setUser} = accountSlice.actions;