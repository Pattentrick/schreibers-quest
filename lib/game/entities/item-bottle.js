ig.module(
    'game.entities.item-bottle'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-bottle'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Bottle item
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemBottle = ig.global.EntityItemBottle = ig.EntityExtended.extend({

        name: 'Wasserflasche',

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 4,

        matchingInventoryItem: ig.EntityInventoryItemBottle,
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'item-bottle.gif', 8, 8 ),

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
                ig.game.roomState.bottle.isPickedUp = true;

                ig.game.getPlayer().speak('Zeig mal die Flasche - ist jetzt meine Flasche.');

            }
            else if( command === 'Schau' ){

                ig.game.getPlayer().speak('Eine ungeöffnete Flasche Sprudelwasser.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Öffne' ){

                ig.game.getPlayer().speak('Ich sollte sie erst einstecken.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Ich sollte sie erst einstecken.');

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