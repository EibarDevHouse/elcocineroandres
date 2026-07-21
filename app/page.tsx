import { getReviews } from './lib/reviews';
import ElCocineroAndres from './components/ElCocineroAndres';

export default async function Home() {
  const initialReviews = await getReviews();
  return <ElCocineroAndres initialReviews={initialReviews} />;
}
