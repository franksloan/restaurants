function convertGoogleResult(jsonResults){
  return jsonResults.map(result => buildRestaurant(result))
}

function buildRestaurant(result){
  console.log(result)
  return {
    id: result.id,
    name: result.name,
    address: result.formatted_address,
    position: {lat: result.geometry.location.lat, lng: result.geometry.location.lng},
    googleRating: result.rating,
    googleId: result.place_id
  }
}

module.exports = convertGoogleResult
