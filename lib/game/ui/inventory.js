ig.module(
    'game.ui.inventory'
)
.requires(
    'plusplus.core.config'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Inventory of the player. Part of the UI.
     *
     * @class
     * @extends ig.Class
     * @memeberof ig
     */
    ig.Inventory = ig.Class.extend({

        slots: [

            // first slot
            { x: 177, y: 153 },

            // second slot
            { x: 209, y: 153 },

            // third slot
            { x: 241, y: 153 },

            // fourth slot
            { x: 273, y: 153 }

        ],

        // List of all current item classes in the inventory
        inventoryItems: [],

        /**
         * Adds an item to the inventory.
         *
         * @param {object} inventoryItem Entity to add to the inventory
         * @param {object} worldItem Matching entity in the game world
         *
         */
        addItem: function( inventoryItem, worldItem ){

            if( worldItem ){

                this.removeWorldItem( worldItem );

            }

            var item = ig.game.spawnEntity( inventoryItem, this.slots[ this.inventoryItems.length ].x, this.slots[ this.inventoryItems.length ].y );

            this.inventoryItems.push( item );

        },

        /**
         * Removes an item from the game world.
         *
         * @param {object} worldItem Matching entity in the game world
         */
        removeWorldItem: function( worldItem ){

            ig.game.removeEntity( worldItem );

        },

        /**
         * Removes an item from the inventory
         *
         * @param {object} inventoryItem Entity to remove from inventory
         */
        removeInventoryItem: function( inventoryItem ){

            for( var i = 0, len = this.inventoryItems.length; i < len; i++ ){

                // Remove item from inventory items array, exit loop
                if( this.inventoryItems[i].name === inventoryItem.name ){

                    this.inventoryItems.erase( this.inventoryItems[i] );
                    break;

                }

            }

            // Remove item from game
            ig.game.removeEntity( inventoryItem );

            // Respawn items
            this.respawnInventoryItems();

        },

        /**
         * Respawns all inventory items on room switch.
         */
        respawnInventoryItems: function(){

            if( this.inventoryItems.length > 0 ){

                // Remove old items
                this.clearInventory();

                // Spawn new ones
                for( var i = 0, len = this.inventoryItems.length; i < len; i++ ){

                    ig.game.spawnEntity( this.inventoryItems[i], this.slots[i].x, this.slots[i].y );

                }

            }

        },

        /**
         * Clears the inventory and removes all exisiting items.
         */
        clearInventory: function(){

            // Remove old items
            for( var i = 0, len = this.inventoryItems.length; i < len; i++ ){

                ig.game.removeEntity( this.inventoryItems[i] );

            }

        }

    });

});