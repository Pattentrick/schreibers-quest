ig.module(
    'game.entities.start'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-lemon'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Start entity displays an blinking text on the titlescreen.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityStart = ig.global.EntityStart = ig.EntityExtended.extend({

		size: {
            x: 81,
            y: 9
        },

        matchingInventoryItem: ig.EntityInventoryItemLemon,
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'start.gif', 81, 9 ),

        animInit: 'blink',

		animSettings: {
            blink: {
                frameTime: 0.9,
                sequence: [0,1]
            }
		}
		
	});

});