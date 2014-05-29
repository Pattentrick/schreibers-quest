ig.module(
    'game.entities.item-wrench'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-wrench'
)
.defines(function () {

	var _c = ig.CONFIG;

    /**
     * Lemon item
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemWrench = ig.global.EntityItemWrench = ig.EntityExtended.extend({

        name: 'Schraubenschlüssel',

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 3,
            y: 6
        },

        // At which distance interaction should be triggered
        interactionDistance: 14,

        matchingInventoryItem: ig.EntityInventoryItemWrench,
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'item-wrench.gif', 3, 6 ),

        animInit: 'idle',

		animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
		},

        interact: function( command ){

            if( command === 'Nimm' ){

                // Add to inventory
                ig.game.inventory.addItem( this.matchingInventoryItem, this );

                // Update room state
                ig.game.roomState.wrench.isPickedUp = true;

                ig.game.getPlayer().speak('Das brauche ich, oder?');

            }
            else if( command === 'Schau' ){

                ig.game.getPlayer().speak('Der Schraubenschlüssel, er ist grau.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Erst muss ich ihn einstecken.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo Herr Schraubenschlüssel.');

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