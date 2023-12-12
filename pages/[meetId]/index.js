import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetails';

function MeetDetailPage(props) {
  return (
    <>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}
export default MeetDetailPage;

export async function getStaticPaths() {
  const uri =
    'mongodb+srv://truongdlfx22577:xTIeffAM3olWtmm6@cluster0.nyndcmn.mongodb.net/meetups?retryWrites=true&w=majority';

  const client = await MongoClient.connect(uri);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  // {}:tieu chi tim -> tim all
  // {}: key duoc trich xuat, value =1 : trich xuat 1 key ko co key khac
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: {
        meetId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetId;

  const uri =
    'mongodb+srv://truongdlfx22577:xTIeffAM3olWtmm6@cluster0.nyndcmn.mongodb.net/meetups?retryWrites=true&w=majority';

  const client = await MongoClient.connect(uri);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const selectMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();
  console.log('obj', selectMeetup);
  return {
    props: {
      meetupData: {
        id: selectMeetup._id.toString(),
        title: selectMeetup.title,
        image: selectMeetup.image,
        address: selectMeetup.address,
        description: selectMeetup.description,
      },
    },
  };
}
