import {Cities} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCity} from '../../store/selectors';
import {setCity} from '../../store';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getCity);

  const cities = Object.values(Cities);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={`locations__item-link tabs__item
                  ${activeCity === city ? 'tabs__item--active' : ''}`}
                href="/"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(setCity(city));
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
