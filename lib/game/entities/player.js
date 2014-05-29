ig.module(
    'game.entities.player'
)
.requires(
    'plusplus.abstractities.player',
    'plusplus.core.config',
    'plusplus.entities.conversation'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Entity that represents a playable character
     *
     * @class
     * @extends ig.Player
     * @memeberof ig
     */
    ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({

        name: 'player',

        collides: ig.Entity.COLLIDES.ACTIVE,

		size: {
            x: 8,
            y: 8
        },

		offset: {
            x: 3,
            y: 20
        },

        temporaryInvulnerabilityAlpha: 1,
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'player.png', 14, 30 ),

		animSettings: {
            idleX: {
                frameTime: 1,
                sequence: [0]
            },
			idleDown : {
				frameTime: 1,
				sequence: [6]
			},
            idleUp: {
                frameTime: 1,
                sequence: [12]
            },
			moveX: {
				frameTime: 0.10,
				sequence: [0,1,2,3,4,5]
			},
            moveDown: {
                frameTime: 0.10,
                sequence: [6,7,8,9,10,11]
            },
			moveUp: {
				frameTime: 0.10,
				sequence: [12,13,14,15,16,17]
			}
		},

        /**
         * Displays text in a small bubble
         *
         * @param {string} text Text that will be displayed
         * @param {string} secondText Text that will be displayed after the first one (if set)
         */
        speak: function( text, secondText ){

            /**
             * Kill existing conversation entities before
             * spawning new ones to avoid ghost conversation
             * entities!
             */
            if( ig.game.getEntitiesByClass(ig.EntityConversation)[0] ){

                ig.game.getEntitiesByClass(ig.EntityConversation)[0].kill();

            }

            var textbubble = ig.game.spawnEntity(ig.EntityConversation, 0, 0);

            textbubble.durationPerLetter = 0.05;

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

            textbubble.addStep( text, 'player', 1);

            if( secondText ){

               textbubble.addStep( secondText, 'player', 2);

            }

            textbubble.activate();

        }

	});

});