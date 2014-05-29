ig.module(
    'game.entities.player-spawner'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Spawns the Player
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityPlayerSpawner = ig.global.EntityPlayerSpawner = ig.EntityExtended.extend({

        name: 'spawner',

        _wmBoxColor: 'rgba(0, 255, 0, 0.7)',

		size: {
            x: 8,
            y: 8
        }
		
	});

});