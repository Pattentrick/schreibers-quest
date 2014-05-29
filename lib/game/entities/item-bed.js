ig.module(
    'game.entities.item-bed'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-gumex'
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
    ig.EntityItemBed = ig.global.EntityItemBed = ig.EntityExtended.extend({

        name: 'Bett',

        _wmScalable: true,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        persistent: true,

        state: 'full',

        matchingInventoryItem: ig.EntityInventoryItemGumex,

        // At which distance interaction should be triggered
        interactionDistance: 12,

        interact: function( command ){

            if( command === 'Schau' ){

                if( this.state === 'full' ){

                    ig.game.getPlayer().speak('Unter dem Bett liegt etwas, aber ich komme nicht ran.');

                }
                else {

                    ig.game.getPlayer().speak('Ein Bett. Unglaublich!');

                }


            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Nein, ich habe selber eins zu Hause.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Ich bin nicht müde.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Ziehe' || command === 'Drücke' ){

                ig.game.getPlayer().speak('Hmpf ... zu schwer.');

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

            if( entity.name === 'Stock' ){

                ig.game.getPlayer().speak('Mit dem Stock konnte ich ein komisches Fläschen unter dem Bett rausholen.','Leider ist der Stock dabei zerbrochen.');

                this.state = 'empty';

                // remove lemon from iventory
                ig.game.inventory.removeInventoryItem( entity );

                // Add gumex to inventory
                ig.game.inventory.addItem( this.matchingInventoryItem );

            }
            else {

                ig.game.getPlayer().speak('Die Kombination, er macht keinen Sinn.');

            }

        }
		
	});

});