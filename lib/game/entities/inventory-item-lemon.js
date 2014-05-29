ig.module(
    'game.entities.inventory-item-lemon'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Inventory item lemon
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityInventoryItemLemon = ig.global.EntityInventoryItemLemon = ig.EntityExtended.extend({

        name: 'Monsterzitrone',

		size: {
            x: 30,
            y: 16
        },
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'inventory-item-lemon.gif', 30, 16 ),

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

                ig.game.getPlayer().speak('Eine riesige Zitrone ... unglaublich!');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Na Zitrone, bist du SAUER auf mich.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Das besitze ich doch schon.');

            }
            else {

                ig.game.getPlayer().speak('Der Befehl, er macht keinen Sinn.');

            }

        },

        combine: function(){

            ig.game.getPlayer().speak('Die Kombination - er macht keinen Sinn.');

        }
		
	});

});