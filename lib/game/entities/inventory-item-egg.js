ig.module(
    'game.entities.inventory-item-egg'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Inventory item egg.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityInventoryItemEgg = ig.global.EntityInventoryItemEgg = ig.EntityExtended.extend({

        name: 'Dino-Ei',

		size: {
            x: 30,
            y: 16
        },
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'inventory-item-egg.gif', 30, 16 ),

        animInit: 'idle',

		animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
		},

        category: 'inventory',

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Das ist eines von diesen Spielzeug-Eiern, die sich im Wasser auflösen.');

            }
            else if( command === 'Öffne' ){

                ig.game.getPlayer().speak('Hmpf! Bekomme ich nicht auf ... das Ei ist steinhart!');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Das besitze ich doch schon.');

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

            if( entity.name === 'Wasserflasche' ){

                if( entity.state === 'open' ){

                    ig.game.getPlayer().speak('Das Ei passt nicht in die Flasche. Ich muss das Ei in einem Behälter einweichen damit es sich auflöst.');

                }
                else {

                    ig.game.getPlayer().speak('Die Flasche ist immer noch zu.');

                }

            }
            else if( entity.name === 'Schraubenschlüssel' ){

                ig.game.getPlayer().speak('Das Ei ist zu hart. Selbst der Schraubenschlüssel hilft mir da nicht weiter.');

            }
            else {

                ig.game.getPlayer().speak('Die Kombination - er macht keinen Sinn.');

            }

        }
		
	});

});