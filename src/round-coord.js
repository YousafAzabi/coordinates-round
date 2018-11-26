//module to round coordinates to 7 decimal points


const types = ['Point', 'MultiPoint', 'LineString', 'MultiLineString','Polygon', 'MultiPolygon'];

//======== main function to round coordinates of given feature ===========
exports.roundCoordinates = (feature, digits = 7) => {
  let coordinates = []; //declare coordinates array as empty
  if ( !feature.geometry || !feature.geometry.type) {
    throw 'Input is NOT a feature!';
  }
  let geometry = feature.geometry; //
  if (geometry.type === 'Point') {
    geometry.coordinates[0] = round(geometry.coordinates[0], digits);
    geometry.coordinates[1] = round(geometry.coordinates[1], digits);
  } else if (geometry.type === types[1] || geometry.type === types[2]) {
    //check geometry type if LineString call loop fn once
     geometry.coordinates = loop(geometry.coordinates, digits);
  } else if (geometry.type === types[3] || geometry.type === types[4]) {
    //if type MultiLineString call loop fn for each element
    geometry.coordinates.forEach( array =>
      coordinates.push(loop(array, digits))
    );
  } else if (geometry.type === types[5]) {
    geometry.coordinates.forEach( parentArray =>
      parentArray.forEach( childArray => {
        coordinates.push(loop(childArray, digits))
      })
    );
  } else {
    throw 'Geometry type error! SHOULD BE one of: ' + types;
  }
  return feature; //return rounded coordinates
}

//====== function to loop through coordinates and call round function  ========
loop = (coordinates, digits) => {
  for(let i = 0; i < coordinates.length; i++) { //loop through coordinates of a link
    coordinates[i][0] = round(coordinates[i][0], digits); //round longitude of i point
    coordinates[i][1] = round(coordinates[i][1], digits); //round latitude of i point
  }
  return coordinates; //return rounded coordinates
}

//================== function to round numbers  ======================
round = (n, d) => {
  return Math.round( n * Math.pow(10, d) ) / Math.pow(10, d);  //round to d decimal points
}
