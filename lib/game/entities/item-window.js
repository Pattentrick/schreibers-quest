ig.module(
    'game.entities.item-window'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Mülleimer.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemWindow = ig.global.EntityItemWindow = ig.EntityExtended.extend({

        name: 'Fenster',

        _wmScalable: true,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 24,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Kacke. Die Sonne geht schon unter. Ich muss zum Sport.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Da komme ich nicht raus.');

            }
            else if( command === 'Öffne' ){

                ig.game.getPlayer().speak('Ich komme nicht ran.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Ähhh .. lieber nicht.');

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