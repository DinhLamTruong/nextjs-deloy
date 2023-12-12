import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetPage() {
  const router = useRouter();
  async function addMeetupHandler(enterMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enterMeetupData),
    });

    const data = await response.json();
    console.log(data);

    router.push('/');
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}
export default NewMeetPage;
