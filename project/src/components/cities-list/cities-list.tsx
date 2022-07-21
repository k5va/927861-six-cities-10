import {useState} from 'react';
import {CitiesListProps} from './types';

function CitiesList({cities}: CitiesListProps) {
  const [activeCity, setActiveCity] = useState(cities[0].name);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map(({name}) => (
            <li key={name} className="locations__item">
              <a
                className={`locations__item-link tabs__item
                  ${activeCity === name ? 'tabs__item--active' : ''}`}
                href="/"
                onClick={(evt) => {
                  evt.preventDefault();
                  setActiveCity(name);
                }}
              >
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
