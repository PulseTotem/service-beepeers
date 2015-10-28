/**
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../../libsdef/mocha.d.ts" />
/// <reference path="../../libsdef/sinon.d.ts" />

/// <reference path="../../scripts/sources/Album.ts" />

var assert = require("assert");
var sinon : SinonStatic = require("sinon");

describe('Album', function() {
	var sandbox;
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
		sandbox.restore();
	});
	
	describe('#constructor', function () {
		it('should launch the createTag with the proper parameters', function () {
			var mockAlbum = sandbox.mock(Album.prototype);
			mockAlbum.expects('run').once();

			var params = { Limit: '10', ApiKey: 'Toto', InfoDuration: '10'};

			var stubNSManager2 : any = sinon.createStubInstance(BeepeersNamespaceManager);
			var album = new Album(params, stubNSManager2);

			mockAlbum.verify();
		});

		it('should not launch run if the parameter Limit is missing', function () {
			var mockAlbum = sandbox.mock(Album.prototype);
			mockAlbum.expects('run').never();

			var params = { ApiKey: 'Toto', InfoDuration: '10'};

			var stubNSManager : any = sinon.createStubInstance(BeepeersNamespaceManager);
			new Album(params, stubNSManager);
			mockAlbum.verify();
		});

		it('should not launch run if the parameter InfoDuration is missing', function () {
			var mockAlbum = sandbox.mock(Album.prototype);
			mockAlbum.expects('run').never();

			var params = { Limit: '10', ApiKey: 'toto'};

			var stubNSManager : any = sinon.createStubInstance(BeepeersNamespaceManager);
			new Album(params, stubNSManager);
			mockAlbum.verify();
		});

		it('should not launch run if the parameter ApiKey is missing', function () {
			var mockAlbum = sandbox.mock(Album.prototype);
			mockAlbum.expects('run').never();

			var params = { Limit: '10', InfoDuration: '10'};

			var stubNSManager : any = sinon.createStubInstance(BeepeersNamespaceManager);
			new Album(params, stubNSManager);
			mockAlbum.verify();
		});
	});
});