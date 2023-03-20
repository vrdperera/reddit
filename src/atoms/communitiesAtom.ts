import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface Community {
  id: string;
  creatorID: string;
  numberOfMembers: number;
  privacyType: 'public' | 'private' | 'restricted';
  createdAt?: Timestamp;
  imageUrl?: string;
}

export interface CommunitySnippet {
  communityID: string;
  isModerator?: boolean;
  imageUrl?: string;
}

export interface CommunityState {
  mySnippet: CommunitySnippet[];
}

const defaultCommunityStates: CommunityState = {
  mySnippet: [],
};

export const communityState = atom<CommunityState>({
  key: 'CommunityStates',
  default: defaultCommunityStates,
});
