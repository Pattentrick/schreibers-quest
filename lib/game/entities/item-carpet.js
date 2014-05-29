ig.module(
    'game.entities.item-carpet'
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
    ig.EntityItemCarpet = ig.global.EntityItemCarpet = ig.EntityExtended.extend({

        name: 'Teppich',

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

                ig.game.getPlayer().speak('Hier liegt ein hässlicher Teppich.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Ich wüsste nicht wie.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Ich hab habe gerade keinen Teppichbedarf.');

            }
            else if( command === 'Ziehe' || command === 'Drücke' ){

                ig.game.getPlayer().speak('Geht nicht. Ist am Boden festgeklebt.');

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