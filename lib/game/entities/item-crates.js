ig.module(
    'game.entities.item-crates'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-stick'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Boxes.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemCrates = ig.global.EntityItemCrates = ig.EntityExtended.extend({

        name: 'Kisten',

        _wmScalable: true,

        persistent: true,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        sealed: true,

        state: 'untouched',

        matchingInventoryItem: ig.EntityInventoryItemStick,

        // At which distance interaction should be triggered
        interactionDistance: 1,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Da stehen zwei komische Kisten in der Ecke.');

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Öffne' ){

                if( this.state === 'untouched' && !this.sealed ){

                    ig.game.getPlayer().speak('WTF? Die Kisten sind voller Stöcker ... ich nehme mal einen mit.');

                    // Add stick to inventory
                    ig.game.inventory.addItem( this.matchingInventoryItem );

                    this.state = 'touched';

                }
                else if( this.state === 'touched' && !this.sealed ) {

                    ig.game.getPlayer().speak('Der Stock, ich will nicht noch einen.');

                }
                else if( this.state === 'untouched' && this.sealed ) {

                    ig.game.getPlayer().speak('Die Kisten sind zugeklebt.');

                }

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Und wie?');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Keine Lust die durch die Gegend zu schleppen.');

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

            if( entity.name === 'Bastelschere' ){

                ig.game.getPlayer().speak('Damit konnte ich die Kisten aufschneiden, dabei ist die Schere leider kaputt gegangen.','Kein Wunder das die im Müll lag.');

                this.sealed = false;

                // remove lemon from iventory
                ig.game.inventory.removeInventoryItem( entity );

            }
            else {

                ig.game.getPlayer().speak('Die Kombination, er macht keinen Sinn.');

            }

        }
		
	});

});