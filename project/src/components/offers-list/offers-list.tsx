import {PlaceCard} from '../../components';
import {OffersListProps} from './types';

function OffersList({offers}: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default OffersList;
