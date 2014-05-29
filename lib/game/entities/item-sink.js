ig.module(
    'game.entities.item-sink'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-key'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Sink.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemSink = ig.global.EntityItemSink = ig.EntityExtended.extend({

        name: 'Spüle',

        _wmScalable: false,

        collides: ig.Entity.COLLIDES.NEVER,

		size: {
            x: 18,
            y: 3
        },

        persistent: true,

        state: 'empty',

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'sink.gif', 18, 3 ),

        animInit: 'empty',

        matchingInventoryItem: ig.EntityInventoryItemKey,

        animSettings: {
            empty: {
                frameTime: 1,
                sequence: [1]
            },
            full: {
                frameTime: 1,
                sequence: [0]
            }
        },

        // At which distance interaction should be triggered
        interactionDistance: 7,

        interact: function( command ){

            if( command === 'Schau' ){

                if( this.state === 'full' ){

                    ig.game.getPlayer().speak('Eine Spüle voller Sprudelwasser.');

                }
                else {

                    ig.game.getPlayer().speak('Der Abfluß ist verstopft. Hier fließt nix ab.');

                }

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Der Abfluß ist verstopft. Hier fließt nix ab.');

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

            if( entity.name === 'Wasserflasche'){

                if( entity.state === 'open' ){

                    // change sink animation
                    this.state = 'full';

                    ig.game.getPlayer().speak('Die Spüle ist jetzt voller Sprudelwasser!');

                    // Remove bottle from inventory
                    ig.game.inventory.removeInventoryItem( entity );

                }
                else {

                    ig.game.getPlayer().speak('Ich kann die Flasche nicht auskippen, der Verschluß ist zu.');

                }


            }
            else if( entity.name === 'Dino-Ei' && this.state === 'full' ){

                // Remove lemon from inventory
                ig.game.inventory.removeInventoryItem( entity );

                // Add to inventory
                ig.game.inventory.addItem( this.matchingInventoryItem );

                ig.game.getPlayer().speak('Das Dino-Ei hat sich im Wasser aufgelöst.', 'Versteckt im Ei war kein Dino, sondern ein Schlüssel!');

            }
            else {

                ig.game.getPlayer().speak('Die Kombination, er macht keinen Sinn.');

            }

        },

        update: function(){

            this.parent();

            if( this.state === 'full'){

                this.animOverride('full');

            }

        }
		
	});

});