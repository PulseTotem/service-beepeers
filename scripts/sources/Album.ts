/*
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../../t6s-core/core-backend/scripts/server/SourceItf.ts" />
/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/PictureAlbum.ts" />

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
		var apiURL = "https://beepeers.com/api/v2/media/last";


	}
}