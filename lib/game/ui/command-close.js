ig.module(
    'game.ui.command-close'
)
.requires(
    'plusplus.core.config',
    'plusplus.ui.ui-button',
    'game.ui.command'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Entity that functions as the "close command". Part of the Ui.
     *
     * @class
     * @extends ig.Command
     * @memeberof ig
     */
    ig.CommandClose = ig.global.CommandClose = ig.Command.extend({

        command: 'Schließe',

        size: {
            x: 42,
            y: 10
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'ui/ui_button_close.gif', 42, 10 )
		
	});

});