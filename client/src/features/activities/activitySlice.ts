import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Activity} from "../../app/models/Activity";
import agent from "../../app/api/agent";
import {RootState, store} from "../../redux/store";
import moment from "moment/moment";
import {User} from "../../app/models/user";
import {Profile} from "../../app/models/profile";
import {setProfile} from "../profiles/profileSlice";
import {produce, enableMapSet} from "immer";
import {Pagination, PagingParams} from "../../app/models/Pagination";

enableMapSet();

interface ActivityState {
    status: string;
    activitiesLoaded: boolean;
    pagination: Pagination | null;
    pagingParams: PagingParams;
    predicate: Map<string, boolean | Date>;
}

const initialState: ActivityState = {
    status: 'idle',
    activitiesLoaded: false,
    pagination: null,
    pagingParams: new PagingParams(),
    predicate: new Map().set('all', true),
};

const axiosParams = () =>{
    const {pagingParams, predicate} = store.getState().activity
    const params = new URLSearchParams();
    params.append('pageNumber', pagingParams.pageNumber.toString());
    params.append('pageSize', pagingParams.pageSize.toString());
    predicate.forEach((value, key) => {
        if (key === 'startDate'){
            params.append(key, (value as Date).toISOString());
        } else {
            params.append(key, value.toString());
        }
    })
    return params;
}

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
    async (_, {getState, dispatch, rejectWithValue}) => {
        try {
            const user = await getState().account.user;
            const {data, pagination} = await agent.Activities.list(axiosParams());
            data.map(activity => setActivity(activity, user));
            dispatch(setPagination(pagination));
            return data;
        } catch (error: any) {
            return rejectWithValue({error: error.data});
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
        } catch (error: any) {
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
        } catch (error: any) {
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
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const deleteActivityAsync = createAsyncThunk<string, string, { state: RootState }>(
    'activity/deleteActivity',
    async (id, thunkAPI) => {
        try {
            await agent.Activities.delete(id);
            return id;
        } catch (error: any) {
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

export const updateAttendeeFollowingAsync = createAsyncThunk<Activity[] | void, string, { state: RootState }>(
    'activity/updateAttendeeFollowing',
    async (username, {dispatch, getState, rejectWithValue}) => {
        try {
            await agent.Profiles.updateFollowing(username);
            const activities = activityAdapter.getSelectors().selectAll(getState().activity);
            const {activitiesLoaded} = getState().activity;
            const {profile} = getState().profile;
            const {user} = getState().account;

            if (activities.length > 0 && activitiesLoaded) {
                return produce(activities, draft => {
                    draft.forEach((activity) => {
                        activity.attendees?.forEach((attendee) => {
                            if (attendee.username === username) {
                                attendee.following = !attendee.following;
                                attendee.followersCount += attendee.following ? 1 : -1;
                            }
                        });
                    });
                })
            }

            if (profile && !activitiesLoaded) {
                const {profile, followings} = getState().profile;
                const updatedProfile = produce(profile, draft => {
                    draft!.following = !draft!.following;
                    draft!.followersCount += draft!.following ? 1 : -1;
                });
                dispatch(setProfile(updatedProfile));
            }
        } catch
            (error) {
            return rejectWithValue(error);
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
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
        setPagingParams: (state, action) => {
            state.pagingParams = action.payload;
        },
        setPredicate: (state, action) => {
            const {key, value} = action.payload;
            const resetPredicate = () => {
                state.predicate.forEach((value, key) => {
                    if (key !== 'startDate') state.predicate.delete(key);
                });
            }
            state.activitiesLoaded = false;
            state.pagingParams = initialState.pagingParams;
            activityAdapter.removeAll(state);
            
            switch (key) {
                case 'all':
                    resetPredicate();
                    state.predicate.set('all', true);
                    break;
                case 'isGoing':
                    resetPredicate();
                    state.predicate.set('isGoing', true);
                    break;
                case 'isHost':
                    resetPredicate();
                    state.predicate.set('isHost', true);
                    break;
                case 'startDate':
                    state.predicate.delete('startDate');
                    state.predicate.set('startDate', value);
                    break;
                default:
                    break;
            }
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
            activityAdapter.addMany(state, activities);
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
        builder.addCase(updateAttendeeFollowingAsync.pending, (state) => {
            state.status = 'updating';
        })
        builder.addCase(updateAttendeeFollowingAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload) {
                activityAdapter.setAll(state, action.payload);
            }
        })
    }
});

export const activitySelector = activityAdapter.getSelectors((state: RootState) => state.activity);
export const {setActivityLoaded, setPagination, setPagingParams, setPredicate} = activitySlice.actions;

