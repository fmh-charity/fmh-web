import getUnixTime from 'date-fns/getUnixTime';

export const smallestToBiggest = (a, b) => {
  return new Date(a.publishDate) - new Date(b.publishDate);
}

export const biggestToSmallest = (a, b) => {
  return new Date(b.publishDate) - new Date(a.publishDate);
}
  
export const filterNews = (list, filter) => list.filter((value) => {
  return Object.keys(filter).some(key => {
    if (key === 'createDate') {
      return getUnixTime(filter[key]) < getUnixTime(value[key]);
    }
    return value[key] === filter[key];
  });
});
