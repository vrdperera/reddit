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
