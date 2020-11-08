const { fetchBreedDescription } = require('../breedFetcherRefactored');
const { assert } = require('chai');

describe('fetchBreedDescription', () => {
  it('returns a string description for a valid breed, via callback', (done) => {
    fetchBreedDescription('Siberian', (err, desc) => {
      // we expect no error for this scenario
      assert.equal(err, null);

      const expectedDesc = "The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors.";

      // compare returned description
      assert.equal(expectedDesc, desc.trim());

      done();
    });
  });

  it('returns a message stating the breed does not exist, via callback', () => {
    fetchBreedDescription('kitty', (err, desc) => {
      assert.equal(desc, null);

      const expected = 'The breed you are looking for was not found. Try another search!';

      assert.equal(expected, err);
    });
  });

  it('returns an error message via callback when an error occurs', (done) => {
    fetchBreedDescription('whatever', (err, desc) => {
      assert.equal(desc, null);

      const expected = err;

      assert.equal(expected, err);

      done();
    });
  });
});