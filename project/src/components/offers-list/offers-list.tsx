import {OfferCard} from '../../components';
import {OffersListProps} from './types';

function OffersList({offers, mode, onActiveOfferChange}: OffersListProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          mode={mode}
          onSelected={onActiveOfferChange}
        />
      ))}
    </>
  );
}

export default OffersList;
