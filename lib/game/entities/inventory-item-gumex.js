ig.module(
    'game.entities.inventory-item-gumex'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Inventory item stick.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityInventoryItemGumex = ig.global.EntityInventoryItemGumex = ig.EntityExtended.extend({

        name: 'Kaugummi-Ex',

		size: {
            x: 30,
            y: 16
        },
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'inventory-item-gumex.gif', 30, 16 ),

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

                ig.game.getPlayer().speak('Damit kann man Kaugummis entfernen. Wie nützlich!');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Was ist grau und gestreift? Ein Klebra!');

            }
            else if( command === 'Öffne' ){

                ig.game.getPlayer().speak('Boah, das Zeug stinkt! Das mache ich schnell wieder zu.');

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

            ig.game.getPlayer().speak('Die Kombination - er macht keinen Sinn.');

        }
		
	});

});