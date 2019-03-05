import chai, { expect } from 'chai';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {

  describe('smoke tests', () => {
    // Generic Search
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });

  });

  describe('Generic Search', () => {

    it('should call fetch function', () => {
      const fetchedStub = sinon.stub(global, 'fetch');

      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
      
      fetchedStub.restore();
    });

    it('should receive the correct URL', () => {
      const fetchedStub = sinon.stub(global, 'fetch');

      const artists = search('eminem', 'artist');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/br/v1/search?q=eminem&type=artist');

      const albums = search('eminem', 'album');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/br/v1/search?q=eminem&type=album');

      fetchedStub.restore();
    });

  });

})
