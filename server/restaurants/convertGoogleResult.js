function convertGoogleResult(jsonResults){
  return jsonResults.map(result => buildRestaurant(result))
}

function buildRestaurant(result){
  return {
    id: result.id,
    name: result.name,
    link: undefined,
    address: result.formatted_address,
    position: {lat: result.geometry.location.lat, lng: result.geometry.location.lng},
    googleRating: result.rating,
    averageRating: 8.6
  }
}

module.exports = convertGoogleResult
