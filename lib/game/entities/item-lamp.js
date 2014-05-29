ig.module(
    'game.entities.item-lamp'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Bed.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemLamp = ig.global.EntityItemLamp = ig.EntityExtended.extend({

        name: 'Lampe',

        _wmScalable: true,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 16,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Der Lampe, er ist von IKEA.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Nein, noch ist es hell genug.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Die lasse ich besser wo sie ist.');

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

            ig.game.getPlayer().speak('Die Kombination, er macht keinen Sinn.');

        }
		
	});

});