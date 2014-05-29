ig.module(
    'game.entities.item-mirror'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Mirror on the wall.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemMirror = ig.global.EntityItemMirror = ig.EntityExtended.extend({

        name: 'Spiegel',

        collides: ig.Entity.COLLIDES.FIXED,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 6,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Boah, die zweite Flasche Vodka hätte ich stecken lassen sollen.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Boah, die zweite Flasche Vodka hätte ich stecken lassen sollen.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else {

                ig.game.getPlayer().speak('Der Befehl, er macht keinen Sinn.');

            }

        },

        /**
         * Gets called when the player tries to
         * combine another item with this item
         *
         * @param {object} entity The item entity
         */
        combine: function( entity ){

            ig.game.getPlayer().speak('Scherben bringen zwar Glück, aber das ist keine gute Idee.');

        }
		
	});

});