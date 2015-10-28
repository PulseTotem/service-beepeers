/*
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../../t6s-core/core-backend/scripts/server/SourceItf.ts" />
/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/PictureAlbum.ts" />
/// <reference path="../BeepeersNamespaceManager.ts" />

var request = require('request');

class Album extends SourceItf {

	constructor(params : any, beepeersNamespaceManager : BeepeersNamespaceManager) {
		super(params, beepeersNamespaceManager);
		Logger.debug("Retrieve albums with params:");
		Logger.debug(this.getParams());

		if (this.checkParams(["Limit", "InfoDuration", "ApiKey"])) {
			this.run();
		}
	}

	public run() {
		var self = this;

		var limit = parseInt(this.getParams().Limit);
		var infoDuration = parseInt(this.getParams().InfoDuration);
		var apiURL = "https://beepeers.com/api/v2/media/last";
		var apiKey = this.getParams().ApiKey;

		var callback = function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var pictureArray = JSON.parse(body);


				var album : PictureAlbum = new PictureAlbum(uuid.v1());

				for (var i = 0; i < limit && i < pictureArray.length; i++) {
					var picJSON = pictureArray[i];

					Logger.debug("Parse picture : "+picJSON);

					var pic : Picture = new Picture(picJSON.mediaId);
					pic.setTitle(picJSON.displayName);
					pic.setDurationToDisplay(infoDuration);

					var original : PictureURL = new PictureURL(picJSON.mediaId+"_original");
					original.setURL(picJSON.url);

					var large : PictureURL = new PictureURL(picJSON.mediaId+"_large");
					large.setURL(picJSON.url+"&width=1024&height=768");
					large.setWidth(1024);
					large.setHeight(768);

					var medium : PictureURL = new PictureURL(picJSON.mediaId+"_medium");
					medium.setURL(picJSON.url+"&width=800&height=600");
					medium.setWidth(800);
					medium.setHeight(600);

					var small : PictureURL = new PictureURL(picJSON.mediaId+"_small");
					small.setURL(picJSON.url+"&width=640&height=480");
					small.setWidth(640);
					small.setHeight(480);

					var thumb : PictureURL = new PictureURL(picJSON.mediaId+"_thumb");
					thumb.setURL(picJSON.url+"&format=thumbnail");

					pic.setOriginal(original);
					pic.setLarge(large);
					pic.setMedium(medium);
					pic.setSmall(small);
					pic.setThumb(thumb);

					album.addPicture(pic);
				}

				self.getSourceNamespaceManager().sendNewInfoToClient(album);
			} else {
				Logger.error("Beepeers Album - Obtained following status code : "+response.statusCode+" for URL "+apiURL);
				Logger.error("Beepeers Album - Obtained following error : "+error);
			}
		};

		request.get({
			url: apiURL,
			headers: {
				"Authorization": apiKey
			}
		}, callback);

	}
}