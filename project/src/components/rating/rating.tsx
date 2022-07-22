import {RatingProps} from './types';

const MAX_RATE = 5;
const MAX_RATE_PERCENT = 100;

function Rating({rate}: RatingProps): JSX.Element {
  const width = (Math.round(rate) / MAX_RATE) * MAX_RATE_PERCENT;

  return (
    <>
      <span style={{width: `${width}%`}}></span>
      <span className="visually-hidden">Rating</span>
    </>
  );
}

export default Rating;
