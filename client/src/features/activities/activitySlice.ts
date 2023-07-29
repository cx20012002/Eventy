import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Activity} from "../../app/models/Activity";
import agent from "../../app/api/agent";
import {RootState} from "../../redux/store";
import moment from "moment/moment";
import {User} from "../../app/models/user";
import {Profile} from "../../app/models/profile";

interface ActivityState {
    status: string;
    activitiesLoaded: boolean;
}

const initialState: ActivityState = {
    status: 'idle',
    activitiesLoaded: false,
};

const setActivity = (activity: Activity, user: User | undefined) => {
    if (user) {
        activity.isGoing = activity.attendees!.some(a => a.username === user.username);
        activity.isHost = activity.hostUsername === user.username;
        activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
    }
}

export const activityAdapter = createEntityAdapter<Activity>({
    selectId: (activity) => activity.id,
});

export const fetchActivitiesAsync = createAsyncThunk<Activity[], void, { state: RootState }>(
    'activity/fetchActivities',
    async (_, thunkAPI) => {
        try {
            const activities = await agent.Activities.list();
            const user = await thunkAPI.getState().account.user;
            activities.map(activity => setActivity(activity, user));
            return activities;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const fetchActivityAsync = createAsyncThunk<Activity, string, { state: RootState }>(
    'activity/fetchActivity',
    async (id, thunkAPI) => {
        try {
            const activity = await agent.Activities.details(id);
            const user = await thunkAPI.getState().account.user;
            setActivity(activity, user)
            return activity;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const createActivityAsync = createAsyncThunk<Activity, Activity, { state: RootState }>(
    'activity/createActivity',
    async (activity, thunkAPI) => {
        try {
            await agent.Activities.create(activity);
            const user = await thunkAPI.getState().account.user;
            return {
                ...activity, 
                isHost: true, 
                isGoing: true, 
                attendees: [new Profile(user!)], 
                host: new Profile(user!),
                hostUsername: user!.username
            } as Activity;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const updateActivityAsync = createAsyncThunk<Activity, Activity, { state: RootState }>(
    'activity/updateActivity',
    async (activity, thunkAPI) => {
        try {
            await agent.Activities.update(activity);
            return activity;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const deleteActivityAsync = createAsyncThunk<string, string, {state: RootState}>(
    'activity/deleteActivity',
    async (id, thunkAPI) => {
        try {
            await agent.Activities.delete(id);
            return id;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const updateAttendeeAsync = createAsyncThunk<Activity, string, { state: RootState }>(
    'activity/updateAttendee',
    async (id, thunkAPI) => {
        try {
            await agent.Activities.attend(id);
            const user = await thunkAPI.getState().account.user;
            const selectedActivity = activityAdapter.getSelectors().selectById(thunkAPI.getState().activity, id);
            const updatedActivity = {...selectedActivity, attendees: [...selectedActivity!.attendees!]};
            if (updatedActivity?.isGoing) {
                updatedActivity.attendees = updatedActivity.attendees?.filter(a => a.username !== user?.username);
                updatedActivity.isGoing = false;
            } else {
                const attendee = new Profile(user!);
                updatedActivity?.attendees?.push(attendee);
                updatedActivity.isGoing = true;
            }
            return updatedActivity as Activity;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const cancelActivityAsync = createAsyncThunk<Activity, string, { state: RootState }>(
    'activity/cancelActivity',
    async (id, thunkAPI) => {
        try {
            await agent.Activities.attend(id);
            const selectedActivity = activityAdapter.getSelectors().selectById(thunkAPI.getState().activity, id);
            const updatedActivity = {...selectedActivity, attendees: [...selectedActivity!.attendees!]};
            updatedActivity.isCancelled = !updatedActivity.isCancelled;
            return updatedActivity as Activity;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const activityInDateFormat = (activity: Activity) => {
    return {...activity, date: moment(activity.date).format('DD MMM, YYYY h:mm a')};
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState: activityAdapter.getInitialState<ActivityState>(initialState),
    reducers: {
        setActivityLoaded: (state, action) => {
            state.activitiesLoaded = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchActivitiesAsync.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchActivitiesAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.activitiesLoaded = true;
            const activities = action.payload.map(activity => {
                return activityInDateFormat(activity)
            });
            activityAdapter.setAll(state, activities);
        })
        builder.addCase(fetchActivityAsync.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchActivityAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            activityAdapter.upsertOne(state, activityInDateFormat(action.payload));
        })
        builder.addCase(createActivityAsync.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(createActivityAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            activityAdapter.addOne(state, activityInDateFormat(action.payload));
        })
        builder.addCase(updateActivityAsync.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(updateActivityAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            activityAdapter.upsertOne(state, activityInDateFormat(action.payload));
        })
        builder.addCase(deleteActivityAsync.pending, (state) => {
            state.status = 'deleting';
        })
        builder.addCase(deleteActivityAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            activityAdapter.removeOne(state, action.payload);
        })
        builder.addCase(updateAttendeeAsync.pending, (state) => {
            state.status = 'updating';
        })
        builder.addCase(updateAttendeeAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            activityAdapter.upsertOne(state, action.payload);
        })
        builder.addCase(cancelActivityAsync.pending, (state) => {
            state.status = 'updating';
        })
        builder.addCase(cancelActivityAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            activityAdapter.upsertOne(state, action.payload);
        })
    }
});

export const activitySelector = activityAdapter.getSelectors((state: RootState) => state.activity); 
export const {setActivityLoaded} = activitySlice.actions;

