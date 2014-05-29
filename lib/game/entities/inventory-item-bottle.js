ig.module(
    'game.entities.inventory-item-bottle'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Inventory item bottle
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityInventoryItemBottle = ig.global.EntityInventoryItemBottle = ig.EntityExtended.extend({

        name: 'Wasserflasche',

        state: 'closed',

		size: {
            x: 30,
            y: 16
        },
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'inventory-item-bottle.gif', 30, 16 ),

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

                if( this.state === 'closed' ){

                    ig.game.getPlayer().speak('Der Verschluß der Flasche ist eckig - wie seltsam.');

                }
                else {

                    ig.game.getPlayer().speak('Die Flasche ist offen.');

                }

            }
            else if( command === 'Rede' ){

                ig.game.getPlayer().speak('Hallo, ich verkaufe diese feinen Lederjacken.');

            }
            else if( command === 'Öffne' ){

                if( this.state === 'closed' ){

                    ig.game.getPlayer().speak('Mist. Ich bekomme den Verschluß nicht auf, er sitzt zu fest.');

                }
                else {

                    ig.game.getPlayer().speak('Die Flasche ist bereits offen.');

                }

            }
            else if( command === 'Ziehe' || command === 'Drücke' ){

                ig.game.getPlayer().speak('Nein, ich will die Flasche nicht kaputt machen.');

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

            if( entity.name === 'Schraubenschlüssel' ){

                ig.game.getPlayer().speak('Damit konnte ich die Flasche öffnen!', 'Den Schraubenschlüssel brauche ich wohl nicht mehr.');

                // change bottle state
                this.state = 'open';

                // Remove lemon from inventory
                ig.game.inventory.removeInventoryItem( entity );

            }
            else if( entity.name === 'Dino-Ei' ){

                if( this.state === 'open' ){

                    ig.game.getPlayer().speak('Das Ei passt nicht in die Flasche. Ich muss das Ei in einem Behälter einweichen damit es sich auflöst.');

                }
                else {

                    ig.game.getPlayer().speak('Die Flasche ist immer noch zu.');

                }

            }
            else {

                ig.game.getPlayer().speak('Die Kombination, er macht keinen Sinn.');

            }

        }
		
	});

});