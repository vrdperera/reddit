import { GetServerSidePropsContext } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import safeJsonStringify from 'safe-json-stringify';

import { Community } from '@/atoms/communitiesAtom';
import { firestore } from '@/firebase/clientApp';
import CommunityNotFound from '@/components/community/communityNotFound';

interface ICommunityPageProps {
  communityData: Community;
}

function CommunityPage({ communityData }: ICommunityPageProps) {
  if (!communityData) {
    return <CommunityNotFound />;
  }
  return <div>{communityData.id}</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocReference = doc(
      firestore,
      'communities',
      context.query.communityId as string
    );

    const communityDoc = await getDoc(communityDocReference);

    const CommunityData = JSON.parse(
      safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
    );

    return {
      props: {
        communityData: communityDoc.exists() && CommunityData,
      },
    };
  } catch (error: any) {
    console.log('getServerSideProps', error);
  }
}

export default CommunityPage;
