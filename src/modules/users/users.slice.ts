import { createSelector, PayloadAction } from '@reduxjs/toolkit';
import { createSlice, ExtraArgument } from '../../shared/redux';

export type UserId = string;

export type User = {
    id: UserId;
    name: string;
    description: string;
};

type UsersState = {
    entities: Record<UserId, User | undefined>;
    ids: UserId[];
    fetchUsersStatus: 'idle' | 'pending' | 'success' | 'failed';
    fetchUserStatus: 'idle' | 'pending' | 'success' | 'failed';
    deleteUserStatus: 'idle' | 'pending' | 'success' | 'failed';
};
