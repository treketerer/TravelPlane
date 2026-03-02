import GeoPoint from 'geopoint';

export function getGeoByPlace(place){
  // console.log(place, place.data)
  return new GeoPoint(place.data.coordinates[0], place.data.coordinates[1])
}

export function getDateByDay(plusDay){
    var date = new Date();
    date.setDate(date.getDate() + plusDay);
    console.log(date, date.getFullYear())
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
  }

export function getPlaceCoords(place){
  return [place.data.coordinates[1], place.data.coordinates[0]]
}

export function getDistanceByTwoPlaces(fPlace, sPlace){
  // console.log(fPlace, sPlace)
  return getGeoByPlace(fPlace).distanceTo(getGeoByPlace(sPlace), true)
}

export function filterGeoPoints(placesArr) {
  if (placesArr.length < 2) return placesArr;

  const result = [placesArr[0]];
  let currentPoint = placesArr[0];
  const remainingPoints = [...placesArr.slice(1)];

  while (remainingPoints.length > 0) {
      let minDistance = Infinity;
      let nearestIndex = 0;

      remainingPoints.forEach((point, index) => {
          const distance = getGeoByPlace(currentPoint).distanceTo(getGeoByPlace(point), true); // true = в км
          if (distance < minDistance) {
              minDistance = distance;
              nearestIndex = index;
          }
      });

      currentPoint = remainingPoints[nearestIndex];
      result.push(currentPoint);
      remainingPoints.splice(nearestIndex, 1);
  }

  return result;
}
