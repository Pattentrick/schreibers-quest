ig.module(
    'game.entities.item-dresser'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-egg'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Dresser.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemDresser = ig.global.EntityItemDresser = ig.EntityExtended.extend({

        name: 'Kommode',

        state: 'closed',

        looted: false,

        persistent: true,

        _wmScalable: true,

        matchingInventoryItem: ig.EntityInventoryItemEgg,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 1,

        interact: function( command ){

            if( command === 'Schau' ){

                if( this.state === 'closed' ){

                    ig.game.getPlayer().speak('Da ist bestimmt der Haustürschlüssel drin!');

                }
                else {

                    ig.game.getPlayer().speak('Jetzt ist es offen.');

                }

            }
            else if( command === 'Öffne' ){

                if( this.state === 'closed' ){

                    ig.game.getPlayer().speak('Es klemmt! Ein altes verrostetes Schloß verhindert das Öffnen.');

                }

                if( this.state === 'open' && !this.looted ){

                    ig.game.getPlayer().speak('Da war ein Dino-Ei drin?!');

                    // Add to inventory
                    ig.game.inventory.addItem( this.matchingInventoryItem );

                    this.looted = true;

                }
                else if( this.state === 'open' && this.looted  ){

                    ig.game.getPlayer().speak('Leer ...');

                }

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Soll ich drauf tanzen, oder wie?');

            }
            else if( command === 'Ziehe' || command === 'Drücke' ){

                ig.game.getPlayer().speak('Bewegt sich kein Stück.');

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

            if( entity.name === 'Monsterzitrone' ){

                ig.game.getPlayer().speak('Der Zitronensaft hat das Schloß verätzt. Ich kann die Kommode jetzt öffnen.');

                this.state = 'open';

                // remove lemon from iventory
                ig.game.inventory.removeInventoryItem( entity );

            }
            else if( entity.name === 'Schraubenschlüssel' ){

                ig.game.getPlayer().speak('Das würde zwar das Schloß kaputt machen,', 'aber ich möchte die Kommode nicht aus Versehen beschädigen.');

            }
            else if( entity.name === 'Stock' ){

                ig.game.getPlayer().speak('Das würde zwar das Schloß kaputt machen,', 'aber ich möchte die Kommode nicht aus Versehen beschädigen.');

            }
            else {

                ig.game.getPlayer().speak('Die Kombination, er macht keinen Sinn.');

            }

        }
		
	});

});