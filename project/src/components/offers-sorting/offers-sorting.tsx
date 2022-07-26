import {useState} from 'react';
import {OffersSortingType} from '../../const';

function OffersSorting() {
  const [activeSorting, setActiveSorting] = useState(OffersSortingType.Popular);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={() => setIsOpened((state) => !state)}
        className="places__sorting-type"
        tabIndex={0}
      >
        {activeSorting}
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
        {Object.values(OffersSortingType).map((sorting) => (
          <li
            key={sorting}
            onClick={() => {
              setActiveSorting(sorting);
              setIsOpened(false);
            }}
            className={
              `places__option ${sorting === activeSorting ?
                'places__option--active' : ''}`
            }
            tabIndex={0}
          >
            {sorting}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default OffersSorting;
