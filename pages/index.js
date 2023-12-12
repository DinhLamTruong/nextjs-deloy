import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export default HomePage;

// getSeverSideProps
// luon chay tren may chu khi trien khai
// context

export async function getStaticProps() {
  const uri =
    'mongodb+srv://truongdlfx22577:xTIeffAM3olWtmm6@cluster0.nyndcmn.mongodb.net/meetups?retryWrites=true&w=majority';

  const client = await MongoClient.connect(uri);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    // 1s tai lai trang
    revalidate: 1,
  };
}
