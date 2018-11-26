const {roundCoordinates} = require('../src/round-coord.js');
const {expect} = require('chai');
const turf = require('@turf/turf');

describe('round-ccord.js to round coordinates to given decimal digits', () => {
  it('Test when coordinates are Point and rounded with some to upper and lower bound.', () => {
    const input = turf.point([-0.1349098573, 51.5246098373]);
    const expected = [-0.1349099, 51.5246098];
    const output = roundCoordinates(input);
    expect(output.geometry.coordinates).to.eql(expected);
  });

  it('Test when coordinates are MultiPoint and rounded with some to upper and lower bound.', () => {
    const input = turf.multiPoint([[-0.13, 51.52], [-0.13596983326, 51.52333342]]);
    const expected = [[-0.13, 51.52], [-0.1359698, 51.5233334]];
    const output = roundCoordinates(input);
    expect(output.geometry.coordinates).to.eql(expected);
  });

  it('Test when coordinates are LineString and rounded with some to upper and lower bound.', () => {
    const input = turf.lineString([[-0.1349098573, 51.5246098373], [-0.13596983326, 51.52333342]]);
    const expected = [[-0.1349099, 51.5246098], [-0.1359698, 51.5233334]];
    const output = roundCoordinates(input);
    expect(output.geometry.coordinates).to.eql(expected);
  });

  it('Test when coordinates are LineString and rounded to 5 decimal digits.', () => {
    const input = turf.lineString([[-0.1349098573, 51.5246098373], [-0.13596983326, 51.52333342]]);
    const expected = [[-0.13491, 51.52461], [-0.13597, 51.52333]];
    const output = roundCoordinates(input, 5);
    expect(output.geometry.coordinates).to.eql(expected);
  });

  it('Test when coordinates are LineString and short and not rounded.', () => {
    const input = turf.lineString([[-0.1349, 51.52], [-0.1355678, 51]]);
    const expected = [[-0.1349, 51.52], [-0.1355678, 51]];
    const output = roundCoordinates(input);
    expect(output.geometry.coordinates).to.eql(expected);
  });

  it('Test when coordinates are MultiLineString and rounded with some to upper and lower bound.', () => {
    const input = turf.multiLineString([[[-0.1349098573, 51.5246098373], [1, 2]], [-0.135, 51]]);
    const expected = [[[-0.1349099, 51.5246098], [1, 2]], [-0.135, 51]];
    const output = roundCoordinates(input);
    expect(output.geometry.coordinates).to.eql(expected);
  });

  it('Test when coordinates are MultiLineString and rounded to 5 decimal digits.', () => {
    const input = turf.multiLineString([[[-0.1349098573, 51.5246098373], [1, 2]], [-0.135, 51]]);
    const expected = [[[-0.13491, 51.52461], [1, 2]], [-0.135, 51]];
    const output = roundCoordinates(input, 5);
    expect(output.geometry.coordinates).to.eql(expected);
  });

  it('Test when coordinates are Polygon and rounded to 5 decimal digits.', () => {
    const input = turf.polygon([[[-0.1, 51], [-0.134909857, 51.52460983], [-0.15, 52], [-0.1, 51]]]);
    const expected = [[[-0.1, 51], [-0.13491, 51.52461], [-0.15, 52], [-0.1, 51]]];
    const output = roundCoordinates(input, 5);
    expect(output.geometry.coordinates).to.eql(expected);
  });

  it('Test when coordinates are MultiPolygon and rounded to 5 decimal digits.', () => {
    const input = turf.multiPolygon([ [[[1, 1] ,[1, 2.034], [2.033, 2.1], [1, 1]]],
      [[[0, -3], [1, -2], [1, 0.1], [0,0], [0,-3]]] ]);
    const expected = [ [[[1, 1] ,[1, 2], [2, 2], [1, 1]]],
      [[[0, -3], [1, -2], [1, 0], [0,0], [0,-3]]] ];
    const output = roundCoordinates(input, 0);
    expect(output.geometry.coordinates).to.eql(expected);
  });

  it('Test when feature is not of the supported types.', () => {
    const input = turf.lineString([[1, 1] ,[1, 2.034]]);
    input.geometry.type = 'anything';
    const expected = 'SHOULD BE one of: Point,MultiPoint,LineString,MultiLineString,Polygon,MultiPolygon';
    expect( () => { roundCoordinates(input) } ).throw(expected);
  });
});
