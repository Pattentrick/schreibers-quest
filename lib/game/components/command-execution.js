ig.module(
    'game.components.command-execution'
)
.requires(
    'plusplus.core.config'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Executes commands which are based of the interaction with the UI.
     *
     * If the Player selects a command, this command will be visible in
     * the command preview. The data from the command preview on the
     * other hand is needed for the final command execution.
     *
     * @class
     * @extends ig.Class
     * @memeberof ig
     */
    ig.CommandExecution = ig.Class.extend({

        // Flag - True when a full command like "pick up axe" exists
        hasActiveCommand: false,

        init: function(){

            this.player = ig.game.getPlayer();

        },

        /**
         * Entrypoint for the execution of the current command.
         * Default command is "Gehe zu". Gets called every frame.
         */
        execute: function(){

            var currentCommand = ig.game.getEntitiesByClass(ig.CommandPreview)[0].currentCommand;
            var defaultCommand = ig.game.getEntitiesByClass(ig.CommandPreview)[0].defaultCommand;

            if( ig.input.pressed('click') ){

                if( this.isAbortionCommand() && currentCommand !== defaultCommand ){

                    this.removeCurrentCommand();

                }
                else {

                    // On valid command move the player, reset the entity name
                    // on existing default command, check for a full active command

                    this.movePlayer();

                    this.resetNameOnDefaultCommand( currentCommand, defaultCommand );
                    this.checkForActiveCommand( currentCommand );
                    this.checkForActiveCompundableCommand();

                }

            }

            this.TryToInteract( currentCommand );

        },

        /**
         * Tries to interact with the selected entity,
         * when there is a full active command in progression
         * and the desired entity is near the player.
         *
         * @param {string} currentCommand The current command of the preview
         */
        TryToInteract: function( currentCommand ){

            var entity             = ig.game.getEntityByName( ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName );
            var compoundableEntity = ig.game.getEntityByName( ig.game.getEntitiesByClass(ig.CommandPreview)[0].compoundableEntityName );
            var commandPreview     = ig.game.getEntitiesByClass(ig.CommandPreview)[0];

            // Do not interact with pathways to other rooms!
            if( entity instanceof ig.EntityLevelchange === false && compoundableEntity instanceof ig.EntityLevelchange === false ){

                // On combining items in the inventory
                if( commandPreview.hasActiveCompoundableCommand && this.hasTwoInventoryItems( entity, compoundableEntity ) ){

                    compoundableEntity.combine( entity );

                    this.removeCurrentCommand();

                }
                else {

                    // On level 1 combining e.g "use stick with"
                    if( this.isUseWithCommand( currentCommand ) ){

                        ig.game.getEntitiesByClass(ig.CommandPreview)[0].hasCombinedCommand = true;

                    }
                    // On level 2 combining e.g "use stick with bear"
                    else if( commandPreview.hasActiveCompoundableCommand && this.hasEntityToInteract( compoundableEntity ) ){

                        compoundableEntity.combine( entity );

                        this.removeCurrentCommand();

                        this.player.moveToStop();


                    }
                    // On normal interaction eg "use stick"
                    else if( this.hasEntityToInteract( entity ) ){

                        entity.interact( currentCommand );

                        this.removeCurrentCommand();

                        this.player.moveToStop();

                    }

                }

            }

        },

        /**
         * Returns true if the user selects the use command
         * and afterwards selecting an inventory item.
         *
         * @param {string} currentCommand The current command of the preview
         * @returns {boolean}
         */
        isUseWithCommand: function( currentCommand ){

            return( this.hasActiveCommand && this.hasMouseOverInventory() && currentCommand === 'Benutze' );

        },

        /**
         * Returns true if the user has selected two items from the inventory.
         *
         * @param {object} entity Entity to check against
         * @param {object} compoundableEntity Entity to check against
         *
         * @returns {boolean}
         */
        hasTwoInventoryItems: function( entity, compoundableEntity ){

            return( entity.category === 'inventory' && compoundableEntity.category === 'inventory' );

        },

        /**
         * Returns true if the Player is near an interactive entity,
         * or that entity is an inventory item, and there is an active
         * command.
         *
         * @param {object} entity Entity to check against
         * @returns {boolean}
         */
        hasEntityToInteract: function( entity ){

            return( this.hasActiveCommand && this.hasPlayerNearEntity( entity ) || this.hasActiveCommand && this.hasMouseOverInventory() );

        },

        /**
         * Detect if the player moves the cursor over the inventory space.
         *
         * @returns {boolean} True if mouse hovers over the inventory space.
         */
        hasMouseOverInventory: function(){

            return(
                ig.input.mouse.y + ig.game.screen.y >= 153
                    && ig.input.mouse.y + ig.game.screen.y <= 185
                    && ig.input.mouse.x + ig.game.screen.x >= 177
                    && ig.input.mouse.x + ig.game.screen.x <= 303
                );

        },

        /**
         * Checks if player is near entity
         *
         * @param {object} entity Entity to check
         * @returns {boolean} True if player is near interactive entity
         */
        hasPlayerNearEntity: function( entity ){

            return( this.player.distanceEdgeTo( entity ) <= entity.interactionDistance );

        },

        /**
         * Checks if the current command is the default command. If true
         * check if there are any interactive entity at the mouse position,
         * if not reset the entity name property of the command preview.
         *
         * @param {string} currentCommand The current command of the preview
         * @param {string} defaultCommand The default command of the preview
         */
        resetNameOnDefaultCommand: function( currentCommand, defaultCommand ){

            if( currentCommand === defaultCommand ){

                var entities = ig.game.entities;
                var match = false;

                for( var i = 0, len = ig.game.entities.length; i < len; i++ ){

                    if( this.entityIsinFocus( entities[i] )
                        && entities[i].name !== 'player'
                        && entities[i].name !== 'cursor'
                        && entities[i].name !== 'command'
                        && entities[i].name !== 'preview'
                        && entities[i].name !== undefined
                        && entities[i].name !== 'spawner'
                        && entities[i].name !== 'textbox'){

                        match = false

                    }

                }

                if( !match ){
                    ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName = '';
                }

            }

        },

        /**
         * Sets the hasActiveCommand flag to true if
         * there is an full valid command, like
         * "use axe with monsterlemon" on an interactive entity.
         *
         * @param {string} currentCommand The current command of the preview
         */
        checkForActiveCommand: function( currentCommand ){

            if( currentCommand !== '' && ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName !== ''){

                this.hasActiveCommand = true;

            }

        },

        checkForActiveCompundableCommand: function(){

            var commandPreview = ig.game.getEntitiesByClass(ig.CommandPreview)[0];

            if( commandPreview.entityName !== '' && commandPreview.compoundableEntityName !== '' ){

                commandPreview.setHasActiveCompoundableCommand( true );

            }

        },

        /**
         * Detects if the mouse cursor hovers over an entity
         *
         * @returns {boolean} true if entity is in focus
         * @param entity {object} entity to check against
         */
        entityIsinFocus: function( entity ) {
            return (
                (entity.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
                    ((ig.input.mouse.x + ig.game.screen.x) <= entity.pos.x + entity.size.x) &&
                    (entity.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
                    ((ig.input.mouse.y + ig.game.screen.y) <= entity.pos.y + entity.size.y)
                );
        },

        /**
         * If the player clicks inside the game world, and
         * at that position there is no entity, with the exception
         * of the cursor, the player and the levelchange, the command
         * is an abortion command.
         *
         * An abortion command will disable all current commands.
         *
         * returns {boolean} true on abortion command, otherwise false
         */
        isAbortionCommand: function(){

            var entities           = ig.game.entities;
            var isAbortion         = true;
            var entity             = ig.game.getEntityByName( ig.game.getEntitiesByClass(ig.CommandPreview)[0].entityName );
            var compoundableEntity = ig.game.getEntityByName( ig.game.getEntitiesByClass(ig.CommandPreview)[0].compoundableEntityName );

            // iterate over all entitys. set isAbort
            // to false if one entity is found, or
            // that entity is an levelchange entity
            for( var i = 0, len = ig.game.entities.length; i < len; i++ ){

                if( this.entityIsinFocus( entities[i] )
                    && entities[i].name !== 'player'
                    && entities[i].name !== 'cursor'
                    && entity instanceof ig.EntityLevelchange === false
                    && compoundableEntity instanceof ig.EntityLevelchange === false ){

                    isAbortion = false;

                }

            }

            return isAbortion;

        },

        /**
         * Removes current commando and disable active command flag
         */
        removeCurrentCommand: function(){

            var commandPreview = ig.game.getEntitiesByClass(ig.CommandPreview)[0];

            commandPreview.setCurrentCommand('');
            commandPreview.setHasCombinedCommand( false );
            commandPreview.setHasActiveCompoundableCommand( false );

            this.hasActiveCommand = false;

        },

        /**
         * Moves the player to the desired location via pathfinding
         */
        movePlayer: function(){

            if( this.isClickOnGameWorld() ){

                // second parameter are pathfinding settings
                this.player.moveTo({
                    x: ig.input.mouse.x + ig.game.screen.x,
                    y: ig.input.mouse.y + ig.game.screen.y
                }, {
                    avoidEntities: false
                });

            }

        },

        /**
         * Returns true if the user clicks inside
         * the game world instead of the UI.
         *
         * @returns {boolean}
         */
        isClickOnGameWorld: function(){

            return( ig.input.mouse.y + ig.game.screen.y <= 135 );

        }

    });

});