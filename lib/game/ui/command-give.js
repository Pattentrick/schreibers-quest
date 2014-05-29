ig.module(
    'game.ui.command-give'
)
.requires(
    'plusplus.core.config',
    'plusplus.ui.ui-button',
    'game.ui.command'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Entity that functions as the "give command". Part of the Ui.
     *
     * @class
     * @extends ig.Command
     * @memeberof ig
     */
    ig.CommandGive = ig.global.CommandGive = ig.Command.extend({

        command: 'Gib',

        size: {
            x: 16,
            y: 10
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'ui/ui_button_give.gif', 16, 10 )
		
	});

});