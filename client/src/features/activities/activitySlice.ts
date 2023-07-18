import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Activity} from "../../app/models/Activity";
import agent from "../../app/api/agent";
import {RootState} from "../../redux/store";
import moment from "moment/moment";

interface ActivityState {
    status: string;
    activitiesLoaded: boolean;
}

const initialState: ActivityState = {
    status: 'idle',
    activitiesLoaded: false,
};

export const activityAdapter = createEntityAdapter<Activity>({
    selectId: (activity) => activity.id,
});

export const fetchActivitiesAsync = createAsyncThunk<Activity[], void>(
    'activity/fetchActivities',
    async () => {
        return await agent.Activities.list();
    }
);

export const fetchActivityAsync = createAsyncThunk<Activity, string>(
    'activity/fetchActivity',
    async (id) => {
        return await agent.Activities.details(id);
    }
);

export const createActivityAsync = createAsyncThunk<Activity, Activity>(
    'activity/createActivity',
    async (activity) => {
        await agent.Activities.create(activity);
        return activity;
    }
);

export const updateActivityAsync = createAsyncThunk<Activity, Activity>(
    'activity/updateActivity',
    async (activity) => {
        await agent.Activities.update(activity);
        return activity;
    }
);

export const deleteActivityAsync = createAsyncThunk<string, string>(
    'activity/deleteActivity',
    async (id) => {
        await agent.Activities.delete(id);
        return id;
    }
);

const activityInDateFormat = (activity: Activity) => {
    return {...activity, date: moment(activity.date).format('DD MMM, YYYY h:mm a')};
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState: activityAdapter.getInitialState<ActivityState>(initialState),
    reducers: {},
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
    }
});


export const activitySelector = activityAdapter.getSelectors((state: RootState) => state.activity); 