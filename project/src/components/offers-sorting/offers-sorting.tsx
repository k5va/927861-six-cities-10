import {useState} from 'react';
import {OffersSortingType} from '../../const';
import {OffersSortingProps} from './types';

function OffersSorting({sorting, onSortingChange}: OffersSortingProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={() => setIsOpened((state) => !state)}
        className="places__sorting-type"
        tabIndex={0}
      >
        {sorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={
          `places__options places__options--custom ${isOpened ?
            'places__options--opened' : ''}`
        }
      >
        {Object.values(OffersSortingType).map((item) => (
          <li
            key={item}
            onClick={() => {
              setIsOpened(false);
              onSortingChange(item);
            }}
            className={
              `places__option ${item === sorting ?
                'places__option--active' : ''}`
            }
            tabIndex={0}
          >
            {item}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default OffersSorting;
