import {useState} from 'react';
import {Cities} from '../../const';

function CitiesList(): JSX.Element {
  const cities = Object.values(Cities);
  const [activeCity, setActiveCity] = useState(Cities.Amsterdam);

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
                  setActiveCity(city);
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
