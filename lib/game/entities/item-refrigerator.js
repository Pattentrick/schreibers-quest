ig.module(
    'game.entities.item-refrigerator'
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
    ig.EntityItemRefrigerator = ig.global.EntityItemRefrigerator = ig.EntityExtended.extend({

        name: 'Kühlschrank',

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

                ig.game.getPlayer().speak('Der Kühlschrank, er ist anwesend.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Nein, ich habe keinen Hunger.');

            }
            else if( command === 'Öffne' ){

                ig.game.getPlayer().speak('Nein, ich habe keinen Hunger.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Nein, der passt auch nicht in meine Tasche.');

            }
            else if( command === 'Drücke' || command === 'Ziehe' ){

                ig.game.getPlayer().speak('Bewegt sich kein Stück');

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