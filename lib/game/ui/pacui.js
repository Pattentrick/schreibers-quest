ig.module(
    'game.ui.pacui'
)
.requires(
    // commands
    'game.ui.command-give',
    'game.ui.command-open',
    'game.ui.command-look',
    'game.ui.command-use',
    'game.ui.command-close',
    'game.ui.command-press',
    'game.ui.command-pickup',
    'game.ui.command-talk',
    'game.ui.command-pull',
    // command preview
    'game.ui.command-preview',
    // config
    'plusplus.core.config'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Spawns all parts of the UI.
     *
     * Pacui stands for *P*oint *A*nd *C*lick *U*ser *I*nterface
     *
     * @class
     * @extends ig.Class
     * @memeberof ig
     */
    ig.Pacui = ig.Class.extend({

        /**
         * Spawns the commands and the command preview,
         */
        init: function(){

            // Commands
            this.spawnCommands();
            this.spawnCommandPreview();

        },

        /**
         * Spawns all UI commandos like "talk", "pick up" or "open".
         *
         * @require game.ui.command-give
         *
         */
        spawnCommands: function(){

            // First row
            ig.game.spawnEntity(ig.CommandGive, 16, 151);
            ig.game.spawnEntity(ig.CommandOpen, 16, 161);
            ig.game.spawnEntity(ig.CommandLook, 16, 175);

            // Second row
            ig.game.spawnEntity(ig.CommandUse, 61, 151);
            ig.game.spawnEntity(ig.CommandClose, 61, 163);
            ig.game.spawnEntity(ig.CommandPress, 61, 175);

            // Third row
            ig.game.spawnEntity(ig.CommandPickUp, 117, 151);
            ig.game.spawnEntity(ig.CommandTalk, 117, 163);
            ig.game.spawnEntity(ig.CommandPull, 116, 175);

        },

        /**
         * Spawns an entity that displays the command preview
         *
         * @require game.ui.command-preview
         *
         */
        spawnCommandPreview: function(){

            ig.game.spawnEntity(ig.CommandPreview, 0, 135);

        }

    });

});