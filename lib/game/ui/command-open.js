ig.module(
    'game.ui.command-open'
)
.requires(
    'plusplus.core.config',
    'plusplus.ui.ui-button',
    'game.ui.command'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Entity that functions as the "open command". Part of the Ui.
     *
     * @class
     * @extends ig.Command
     * @memeberof ig
     */
    ig.CommandOpen = ig.global.CommandOpen = ig.Command.extend({

        command: 'Öffne',

        size: {
            x: 28,
            y: 12
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'ui/ui_button_open.gif', 28, 12 )
		
	});

});