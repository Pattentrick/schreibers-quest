ig.module(
    'game.entities.item-trashcan'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.inventory-item-scissor'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Mülleimer.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityItemTrashcan = ig.global.EntityItemTrashcan = ig.EntityExtended.extend({

        name: 'Mülleimer',

        _wmScalable: true,

        collides: ig.Entity.COLLIDES.NEVER,

        matchingInventoryItem: ig.EntityInventoryItemScissor,

        persistent: true,

        looted: false,

		size: {
            x: 8,
            y: 8
        },

        // At which distance interaction should be triggered
        interactionDistance: 1,

        interact: function( command ){

            if( command === 'Schau' ){

                ig.game.getPlayer().speak('Der Mülleimer, er ist ekelig.');

            }
            else if( command === 'Benutze' ){

                ig.game.getPlayer().speak('Nein, ich habe gerade kein Müll.');

            }
            else if( command === 'Öffne' && !this.looted ){

                ig.game.getPlayer().speak('Im Mülleimer liegt eine Bastelschere, die könnte nützlich sein.');

                // Add to inventory
                ig.game.inventory.addItem( this.matchingInventoryItem );

                this.looted = true;

            }
            else if( command === 'Öffne' && this.looted ){

                ig.game.getPlayer().speak('Nix drin außer Müll.');

            }
            else if( command === 'Nimm' ){

                ig.game.getPlayer().speak('Ungern.');

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

            ig.game.getPlayer().speak('Die Kombination, er macht keinen Sinn.');

        }
		
	});

});