ig.module(
    'game.entities.item-pictures'
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
    ig.EntityItemPictures = ig.global.EntityItemPictures = ig.EntityExtended.extend({

        name: 'Bilder',

        _wmScalable: true,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 4,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Eine Frau, eine Wiese und ein Berg.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Und wie?');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Nein, die finde ich gruselig.');

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