import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Photo, Profile} from "../../app/models/profile";
import {RootState} from "../../redux/store";
import agent from "../../app/api/agent";
import {setUser} from "../users/accountSlice";
import {setActivityLoaded} from "../activities/activitySlice";

interface ProfileState {
    profile: Profile | null;
    followings: Profile[];
    isCurrentUser: boolean;
    status: string;
}

const initialState: ProfileState = {
    profile: null,
    followings: [],
    isCurrentUser: false,
    status: 'idle'
}

export const getProfileAsync = createAsyncThunk<Profile, string, { state: RootState }>(
    'profile/getProfileAsync',
    async (username: string, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setActivityLoaded(false));
            return await agent.Profiles.get(username);
        } catch (error: any) {
            return rejectWithValue({error: error.data});
        }
    }
);

export const updateProfileAsync = createAsyncThunk<Profile, Partial<Profile>, { state: RootState }>(
    'profile/updateProfileAsync',
    async (profile: Partial<Profile>, {getState, dispatch, rejectWithValue}) => {
        try {
            const user = getState().account.user;
            await agent.Profiles.updateProfile({displayName: profile.displayName, bio: profile.bio});
            dispatch(setUser({...user, displayName: profile.displayName}));
            return profile as Profile;
        } catch (error: any) {
            return rejectWithValue({error: error.data});
        }
    }
);

export const uploadPhotoAsync = createAsyncThunk<Photo, Blob, { state: RootState }>(
    'profile/uploadPhotoAsync',
    async (file: Blob, {getState, dispatch, rejectWithValue}) => {
        try {
            const user = getState().account.user;
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;

            if (photo.isMain) {
                dispatch(setUser({...user, image: photo.url}));
                dispatch(setActivityLoaded(false));
            }
            return photo;
        } catch (error: any) {
            return rejectWithValue({error: error.data});
        }
    }
);

export const setMainPhotoAsync = createAsyncThunk<Photo, Photo, { state: RootState }>(
    'profile/setMainPhotoAsync',
    async (photo: Photo, {getState, dispatch, rejectWithValue}) => {
        try {
            const user = getState().account.user;
            await agent.Profiles.setMainPhoto(photo.id);
            dispatch(setUser({...user, image: photo.url}));
            dispatch(setActivityLoaded(false));
            return photo;
        } catch (error: any) {
            return rejectWithValue({error: error.data});
        }
    }
);

export const deletePhotoAsync = createAsyncThunk<string, string, { state: RootState }>(
    'profile/deletePhotoAsync',
    async (photoId: string, {rejectWithValue}) => {
        try {
            await agent.Profiles.deletePhoto(photoId);
            return photoId;
        } catch (error: any) {
            return rejectWithValue({error: error.data});
        }
    }
);

export const getFollowingsAsync = createAsyncThunk<Profile[], string, { state: RootState }>(
    'profile/getFollowingsAsync',
    async (predicate, {getState, rejectWithValue}) => {
        try {
            const {profile} = getState().profile;
            return await agent.Profiles.listFollowings(profile!.username, predicate);
        } catch (error: any) {
            return rejectWithValue({error: error.data});
        }
    }
);

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getProfileAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getProfileAsync.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.status = 'idle';
        });
        builder.addCase(uploadPhotoAsync.pending, (state) => {
            state.status = 'image-uploading';
        });
        builder.addCase(uploadPhotoAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (state.profile) {
                if (action.payload.isMain) {
                    state.profile.image = action.payload.url;
                }
                state.profile.photos?.push(action.payload)
            }
        });
        builder.addCase(setMainPhotoAsync.pending, (state) => {
            state.status = 'setting-main-photo';
        });
        builder.addCase(setMainPhotoAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (state.profile && state.profile.photos) {
                state.profile.photos.find(p => p.isMain)!.isMain = false;
                state.profile.photos.find(p => p.id === action.payload.id)!.isMain = true;
                state.profile.image = action.payload.url;
            }
        });
        builder.addCase(deletePhotoAsync.pending, (state) => {
            state.status = 'deleting-photo';
        });
        builder.addCase(deletePhotoAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (state.profile && state.profile.photos) {
                state.profile.photos = state.profile.photos.filter(p => p.id !== action.payload);
            }
        });
        builder.addCase(updateProfileAsync.pending, (state) => {
            state.status = 'updating-profile';
        });
        builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (state.profile) {
                state.profile.displayName = action.payload.displayName;
                state.profile.bio = action.payload.bio;
            }
        });
        builder.addCase(getFollowingsAsync.pending, (state) => {
            state.status = 'loading-followings';
        });
        builder.addCase(getFollowingsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.followings = action.payload;
        });
    }
});

export const {setProfile} = profileSlice.actions;