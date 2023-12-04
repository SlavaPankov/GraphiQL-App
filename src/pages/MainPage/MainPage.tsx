import { Link } from 'react-router-dom';
import { Heading } from '@components/Heading';

export function MainPage() {
  return (
    <div className="container">
      <Heading />
      <Link to="/about">About</Link>
    </div>
  );
}
