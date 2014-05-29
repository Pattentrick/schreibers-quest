ig.module(
    'game.main'
)
.requires(
	// include impact++
    'plusplus.core.plusplus',
    // custom loader
    'game.components.pacloader',
    // player class
    'game.entities.player',
    // titlescreen
    'game.levels.titlescreen',
    // ending
    'game.levels.ending',
    // rooms
    'game.levels.bedroom',
    'game.levels.floor',
    'game.levels.junkroom',
    'game.levels.kitchen',
    // enable debug
    // 'plusplus.debug.debug',
    // command execution
    'game.components.command-execution',
    // user interface module
    'game.ui.pacui',
    // inventory
    'game.ui.inventory',
    // room state tracker/creator
    'game.components.room-state',
    // conversation module
    'plusplus.entities.conversation'
)
// define the main module
.defines(function () {

    "use strict";

    // config variable
    var _c = ig.CONFIG;

    // Game instance
	var Pac = ig.GameExtended.extend({

        // Background color of canvas
        clearColor: "#000000",

        // Contains the name of the current level
        currentLevel: null,

        hasUntoldBackgroundStory: true,

		init: function () {

			this.parent();

		    // Load starting level
            this.loadLevelDeferred( 'bedroom', 'spawner-a' );

            // Create new pac user interface instance
            this.gui = new ig.Pacui();

            // Instance room state
            this.roomState = new ig.RoomState();

            // Instance the inventory
            this.inventory = new ig.Inventory();

            // Cursor Layer
            this.setCursorLayer();

		},

        /**
         * Here i override the loadLevelDeferred method, so
         * i can set the currentLevel property. This is needed
         * for spawning/removing game items after the level build.
         *
         * @param level
         * @param playerSpawnerName
         * @override
         */
        loadLevelDeferred: function( level, playerSpawnerName ){

            this.currentLevel = level;

            this.parent( level, playerSpawnerName );

        },

        /**
         * This method creates the level and spawns all
         * the entitys. So any logic for spawning/removing
         * entitys in a certain room goes here after calling
         * parent.
         *
         * @override
         */
        buildLevel: function(){

            this.parent();

            // reposition camera on level switch
            this.centerStaticCamera();

            // Create room state
            this.roomState.createState();

            // Create new command execution instance
            this.commandExecution = new ig.CommandExecution();

            this.inventory.respawnInventoryItems();

        },

        /**
         * Bind all inputs to certain events
         */
        inputStart: function () {

            // Leftclick
            ig.input.bind(ig.KEY.MOUSE1, 'click');

        },

        /*
         * Tells the Backgroundstory on startup.
         */
        tellBackgroundStory: function(){

            var textbubble = ig.game.spawnEntity(ig.EntityConversation, 0, 0);

            textbubble.messageMoveToSettings = {
                matchPerformance: true,
                offset: {
                    x: 0,
                    y: -30
                },
                align: {
                    x: 0.5,
                    y: 1
                }
            };

            textbubble.addStep( 'Gestern dick gesoffen ...', 'player', 1);
            textbubble.addStep( 'Ich erinnere mich an gar nichts mehr.', 'player', 2 );
            textbubble.addStep( 'Wo bin ich hier?!', 'player', 3 );
            textbubble.addStep( 'Niekerken wollte mich doch heute zum Sport abholen!', 'player', 4 );
            textbubble.addStep( 'Ich muss hier schnell raus!', 'player', 5 );

            textbubble.trigger();

        },

        /**
         * Shows the end of the game.
         */
        showEnding: function(){

            ig.system.setGame( TheEnd );

        },

        /**
         * Add a new Layer for the cursor to
         * the game which is above all other layer
         */
        setCursorLayer: function(){

            this.addLayer( new ig.Layer('cursor', {
                zIndex: _c.Z_INDEX_ABOVE_ALL
            }));

        },

        /**
         * Centers camera on gamescreen when
         * the game runs in fullscreen mode
         */
        centerStaticCamera : function(){

            // Reset screen position for
            // proper positioning on resize
            ig.game.screen.x = 0;
            ig.game.screen.y = 0;

            // Calculate new screen position
            ig.game.screen.x -= ( ig.system.realWidth / 2 ) / ig.system.scale - ( _c.GAME_WIDTH_VIEW / 2 );
            ig.game.screen.y -= ( ig.system.realHeight / 2 ) / ig.system.scale - ( _c.GAME_HEIGHT_VIEW / 2 );

        },

        resize : function(){

            this.parent();

            // Check for game instance
            if( ig.game !== null ){

                // Center camera on gamescreen
                this.centerStaticCamera();

            }

        },

        update: function(){

            this.parent();

            if( this.hasUntoldBackgroundStory ){

                this.tellBackgroundStory();

                this.hasUntoldBackgroundStory = false;

            }

            // Sort entities to avoid zIndex bugs
            ig.game.sortEntities('entities');

        }

	});

    // Titlescreen instance
    var Titlescreen = ig.GameExtended.extend({

        // Background color of canvas
        clearColor: "#000000",

        init: function () {

            this.parent();

            // Cursor Layer
            this.setCursorLayer();

            // Load Titlescreen
            this.loadLevelDeferred( 'titlescreen' );

            // Play title theme
            var theme = new ig.Sound( _c.PATH_TO_MEDIA + 'music/title-theme.*' );

            theme.play();

        },

        /**
         * Bind all inputs to certain events
         */
        inputStart: function () {

            // Leftclick
            ig.input.bind(ig.KEY.MOUSE1, 'click');

        },

        /**
         * Add a new Layer for the cursor to
         * the game which is above all other layer
         */
        setCursorLayer: function(){

            this.addLayer( new ig.Layer('cursor', {
                zIndex: _c.Z_INDEX_ABOVE_ALL
            }));

        },

        /**
         * Centers camera on gamescreen when
         * the game runs in fullscreen mode
         */
        centerStaticCamera : function(){

            // Reset screen position for
            // proper positioning on resize
            ig.game.screen.x = 0;
            ig.game.screen.y = 0;

            // Calculate new screen position
            ig.game.screen.x -= ( ig.system.realWidth / 2 ) / ig.system.scale - ( _c.GAME_WIDTH_VIEW / 2 );
            ig.game.screen.y -= ( ig.system.realHeight / 2 ) / ig.system.scale - ( _c.GAME_HEIGHT_VIEW / 2 );

        },

        resize : function(){

            this.parent();

            // Check for game instance
            if( ig.game !== null ){

                // Center camera on gamescreen
                this.centerStaticCamera();

            }

        },

        update: function(){

            this.parent();

            if( ig.input.pressed('click') ){

                ig.system.setGame( Pac );

            }

        }

    });

    // instance the end :O
    var TheEnd = ig.GameExtended.extend({

        // Background color of canvas
        clearColor: "#000000",

        init: function () {

            this.parent();

            // Load Titlescreen
            this.loadLevelDeferred( 'ending' );

            // Play title theme
            var theme = new ig.Sound( _c.PATH_TO_MEDIA + 'music/title-theme.*' );

            theme.play();

        },

        /**
         * Centers camera on gamescreen when
         * the game runs in fullscreen mode
         */
        centerStaticCamera : function(){

            // Reset screen position for
            // proper positioning on resize
            ig.game.screen.x = 0;
            ig.game.screen.y = 0;

            // Calculate new screen position
            ig.game.screen.x -= ( ig.system.realWidth / 2 ) / ig.system.scale - ( _c.GAME_WIDTH_VIEW / 2 );
            ig.game.screen.y -= ( ig.system.realHeight / 2 ) / ig.system.scale - ( _c.GAME_HEIGHT_VIEW / 2 );

        },

        resize : function(){

            this.parent();

            // Check for game instance
            if( ig.game !== null ){

                // Center camera on gamescreen
                this.centerStaticCamera();

            }

        }

    });

    // Start up game
	ig.main(
		'#canvas',
        Titlescreen,
        60,
		_c.GAME_WIDTH,
		_c.GAME_HEIGHT,
		_c.SCALE,
        ig.pacLoader
	);
	
});
