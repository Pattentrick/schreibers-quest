ig.module(
    'game.entities.item-bookshelf'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Bookshelf
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemBookshelf = ig.global.EntityItemBookshelf = ig.EntityExtended.extend({

        name: 'Bücherregal',

        collides: ig.Entity.COLLIDES.NEVER,

        _wmScalable: true,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 9,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Der Bücherregal, er hat viele Bücher.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Ich habe jetzt keine Lust zu lesen.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Drücke' || command === 'Ziehe' ){

                ig.game.getPlayer().speak('Bewegt sich kein Stück.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Festgeschraubt.');

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

            ig.game.getPlayer().speak('Die Kombination - er macht keinen Sinn.');

        }
		
	});

});