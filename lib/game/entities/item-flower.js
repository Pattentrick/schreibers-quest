ig.module(
    'game.entities.item-flower'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Dresser.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemFlower = ig.global.EntityItemFlower = ig.EntityExtended.extend({

        name: 'Blume',

        _wmScalable: true,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 6,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Ein wunderschönes Veilchen.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Nein, ich glaube auf die reagiere ich allergisch.');

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

            ig.game.getPlayer().speak('Die Kombination, er macht keinen Sinn.');

        }
		
	});

});