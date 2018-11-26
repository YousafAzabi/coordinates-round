 [![Coverage Status](https://coveralls.io/repos/github/YousafAzabi/coordinates-round/badge.svg)](https://coveralls.io/github/YousafAzabi/coordinates-round)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FYousafAzabi%2Fcoordinates-round.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FYousafAzabi%2Fcoordinates-round?ref=badge_shield)
 [![Build Status](https://travis-ci.com/YousafAzabi/coordinates-round.svg?branch=master)](https://travis-ci.com/YousafAzabi/coordinates-round)

# Round Coordinates

Script to round coordinates of input feature to the given digits.

```
roundCoordinates(feature, digits)
```

Takes a feature and rounds the coordinates of the feature to the specified digits.

| Argument | Type    | Description                                   |
|:---------|:--------|:----------------------------------------------|
| feature  | Feature | Feature to round its coordinates              |
| digits   | Integer | Optinal, number of digits after decimal point |

### supported features are:
1. Point
2. MultiPoint
3. LineString
4. MultiLineString
5. Polygon
6. MultiPolygon

* Default value for `digits` is 7.

### Example

```
let feature = {
  "type": "feature",
  "properties": {
    "id": 1,
    "name": "test"
  },
  "geometry": {
    "type": "LineString",
    "coordinates": [[1.123456789, 2.764], [2.3344556677889, 9.256378]]
  }
};
let roundedCoordinatesFeature = roundCoordinates(feature, 5);
```

The coordinates of `roundedCoordinatesFeature` will be `[[1.12345, 2.764], [2.33445, 9.25637]]`
