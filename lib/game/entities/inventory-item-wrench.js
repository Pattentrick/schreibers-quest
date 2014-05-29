ig.module(
    'game.entities.inventory-item-wrench'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Inventory item wrench.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityInventoryItemWrench = ig.global.EntityInventoryItemWrench = ig.EntityExtended.extend({

        name: 'Schraubenschlüssel',

		size: {
            x: 30,
            y: 16
        },
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'inventory-item-wrench.gif', 30, 16 ),

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

                ig.game.getPlayer().speak('Ein handelsüblicher Schraubenschlüssel.');

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

                ig.game.getPlayer().speak('Damit konnte ich die Flasche öffnen!', 'Den Schraubenschlüssel brauche ich wohl nicht mehr.');

                // change bottle state
                entity.state = 'open';

                // Remove lemon from inventory
                ig.game.inventory.removeInventoryItem( this );

            }
            else if( entity.name === 'Dino-Ei' ){

                ig.game.getPlayer().speak('Das Ei ist zu hart. Selbst der Schraubenschlüssel hilft mir da nicht weiter.');

            }
            else {

                ig.game.getPlayer().speak('Die Kombination - er macht keinen Sinn.');

            }

        }
		
	});

});