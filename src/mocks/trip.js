import moment from "moment";
import {getRandomInteger} from "../utils/common.js";
import {
  TYPES,
  CITIES,
  DESCRIPTION,
  OFFERS
} from "../consts.js";

const generateDestinations = () => {
  return CITIES.reduce((actual, next) => {
    actual.push({
      name: next,
      description: getDescription(getRandomInteger(1, 5)),
      pictures: getPicures(getRandomInteger(1, 5))
    });
    return actual;
  }, []);
};

const generateOffers = () => {
  return TYPES.map((type) => {
    return {
      type,
      offers: OFFERS
    };
  });
};

const getPicures = (count) => {
  return new Array(count).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const getDescription = (count) => {
  const sentences = DESCRIPTION.split(`.`);
  return new Array(count).fill().map(() => sentences[getRandomInteger(0, sentences.length - 1)]).join(`\n.`);
};

const getOffers = (offersList, type) => {
  const offer = offersList.find((item) => item.type === type);
  return {
    type,
    offers: offer.offers.slice(0, getRandomInteger(0, offer.offers.length - 1))
  };
};

const generateDateFrom = () => {
  return moment().add(getRandomInteger(0, 1), `day`).add(getRandomInteger(0, 1), `hour`).toISOString();
};

const generateDateTo = () => {
  return moment().add(getRandomInteger(0, 1), `day`).add(getRandomInteger(1, 23), `hour`).add(getRandomInteger(0, 59), `minute`).toISOString();
};

const destinations = generateDestinations();
const offersList = generateOffers();

export const generateTrip = () => {
  const type = TYPES[getRandomInteger(0, TYPES.length - 1)];

  return {
    type,
    offer: getOffers(offersList, type),
    destination: destinations[getRandomInteger(0, CITIES.length - 1)],
    isFavorite: Math.random() > 0.5,
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    basePrice: getRandomInteger(230, 1500),
  };
};
