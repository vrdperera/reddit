import { useRecoilState } from 'recoil';
import { Community, CommunitySnippet, CommunityState, communityState } from '@/atoms/communitiesAtom';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, getDocs, writeBatch, doc, increment } from 'firebase/firestore';

function useCommunityData() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [communityStateValue, setCommunityStateValue] = useRecoilState<CommunityState>(communityState);
  const [user] = useAuthState(auth);

  const getMySnippets = async () => {
    try {
      setLoading(true);
      const snippetsDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));
      const snippets = snippetsDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({ ...prev, mySnippet: snippets as CommunitySnippet[] }));
      console.log(communityStateValue);
    } catch (error: any) {
      console.log('getMySnippets Error: ' + error);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const joinCommunity = async (communityData: Community) => {
    try {
      const newSnippet: CommunitySnippet = { communityID: communityData.id, imageUrl: communityData.imageUrl || '' };
      const bacth = writeBatch(firestore);

      bacth.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id), newSnippet);
      bacth.update(doc(firestore, `communities`, communityData.id), { numberOfMembers: increment(1) });
      await bacth.commit();

      setCommunityStateValue((prev) => ({ ...prev, mySnippet: [...prev.mySnippet, newSnippet] }));
    } catch (error: any) {
      console.log('joinCommunity' + error);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };
  const leaveCommunity = (communityId: string) => {};

  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return { loading, communityStateValue, onJoinOrLeaveCommunity };
}

export default useCommunityData;
