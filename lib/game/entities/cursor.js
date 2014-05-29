ig.module(
    'game.entities.cursor'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Entity that functions as an animated cursor,
     * which replaces the default browser cursor.
     *
     * To hide the default cursor add 'cursor:none;'
     * to the index.html css block. However this is
     * still buggy on safari and opera.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityCursor = ig.global.EntityCursor = ig.EntityExtended.extend({

        name: 'cursor',

        performance: 'moveable',

        size: {
            x: 14,
            y: 14
        },

        layerName: 'cursor',

        cursorOffset: {
            x: -6,
            y: -6
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'ui/cursor.png', 14, 14 ),

        animInit: "blink",

        animSettings: {

            blink: {
                frameTime: 0.20,
                sequence: [0,1,2,0]
            }

        },

        /**
         * Reposition the cursor entity to the position
         * of the default browser mouse cursor
         */
        repositionCursor: function(){

            this.pos = {
                x: ig.input.mouse.x + ig.game.screen.x + this.cursorOffset.x,
                y: ig.input.mouse.y + ig.game.screen.y + this.cursorOffset.y
            }

        },

        update: function(){

            this.parent();

            this.repositionCursor();

        }
		
	});

});