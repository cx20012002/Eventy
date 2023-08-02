import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {RootState} from "../../redux/store";
import {ChatComment} from "../../app/models/comments";

interface Comment {
    comments: ChatComment[],
    hubConnection: HubConnection | null
}

const initialState: Comment = {
    comments: [],
    hubConnection: null
}

export const createHubConnection = createAsyncThunk<void, string, { state: RootState }>(
    'comment/createHubConnection',
    async (activityId:string, {getState, dispatch}) => {
        const hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5140/chat?activityId=' + activityId, {
                accessTokenFactory: () => getState().account.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));
        hubConnection.on('LoadComments', (comments: ChatComment[]) => {
            comments.forEach(comment => {
                comment.createdAt = new Date(comment.createdAt + 'Z');
            })
            dispatch(setChatComments(comments));
        });

        hubConnection.on('ReceiveComment', (comment: ChatComment) => {
            comment.createdAt = new Date(comment.createdAt);
            dispatch(addChatComment(comment));
        });

        dispatch(setHubConnection(hubConnection));
    }
)

export const sendComment = createAsyncThunk<void, any, { state: RootState }>(
    'comment/sendComment',
    async (values, {getState, rejectWithValue}) => {
        const {hubConnection} = getState().comment;
        if (hubConnection) {
            try {
                await hubConnection.invoke('SendComment', values);
            } catch (error) {
                console.log(error);
            }
        } else {
            return rejectWithValue('Hub connection not initialized');
        }
    }
)


export const stopHubConnect = createAsyncThunk<void, void, { state: RootState }>(
    'comment/sendComment',
    async (_, thunkAPI) => {
        const {hubConnection} = thunkAPI.getState().comment;
        if (hubConnection) {
            await hubConnection.stop().catch(error => console.log('Error stopping the connection: ', error));
            hubConnection.off('LoadComments');
            hubConnection.off('ReceiveComment');

            thunkAPI.dispatch(setHubConnection(null));
            thunkAPI.dispatch(clearComments());
        }
    }
);


export const commentSlice = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {
        setHubConnection: (state, action) => {
            state.hubConnection = action.payload;
        },
        addChatComment: (state, action) => {
            state.comments.unshift(action.payload);
        },
        setChatComments: (state, action) => {
            state.comments = action.payload;
        },
        clearComments: (state) => {
            state.comments = [];
        }
    }
})

export const {setHubConnection, addChatComment, setChatComments, clearComments} = commentSlice.actions;