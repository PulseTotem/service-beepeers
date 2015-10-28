/**
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/SourceServer.ts" />
/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />

/// <reference path="./BeepeersNamespaceManager.ts" />


/**
 * Represents the The 6th Screen Beepeers Service.
 *
 * @class Beepeers
 * @extends SourceServer
 */
class Beepeers extends SourceServer {

	/**
	 * Constructor.
	 *
	 * @param {number} listeningPort - Server's listening port..
	 * @param {Array<string>} arguments - Server's command line arguments.
	 */
	constructor(listeningPort : number, arguments : Array<string>) {
		super(listeningPort, arguments);
	}
}

/**
 * Server's Beepeers listening port.
 *
 * @property _BeepeersListeningPort
 * @type number
 * @private
 */
var _BeepeersListeningPort : number = process.env.PORT || 6016;

/**
 * Server's Beepeers command line arguments.
 *
 * @property _BeepeersArguments
 * @type Array<string>
 * @private
 */
var _BeepeersArguments : Array<string> = process.argv;

var serverInstance = new Beepeers(_BeepeersListeningPort, _BeepeersArguments);
serverInstance.run();