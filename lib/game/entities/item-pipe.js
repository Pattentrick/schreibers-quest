ig.module(
    'game.entities.item-pipe'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Boxes.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemPipe = ig.global.EntityItemPipe = ig.EntityExtended.extend({

        name: 'Rohr',

        _wmScalable: true,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 1,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Ein Rohr, wo das wohl hinführt?');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Und wie?');

            }
            else if( command === 'Drücke' || command === 'Drücke' ){

                ig.game.getPlayer().speak('Bloß nicht, das geht sonst noch kaputt.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Das lasse ich lieber bleiben.');

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

            if( entity.name === 'Stock' ){

                ig.game.getPlayer().speak('Rohr + Stock? Dann hätte ich ja einen Rohrstock. Ha!','Bringt mich aber auch nicht weiter.');

            }
            else {

                ig.game.getPlayer().speak('Die Kombination - er macht keinen Sinn.');

            }

        }
		
	});

});