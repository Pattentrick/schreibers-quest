ig.module(
    'game.ui.command-pull'
)
.requires(
    'plusplus.core.config',
    'plusplus.ui.ui-button',
    'game.ui.command'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Entity that functions as the "pull command". Part of the Ui.
     *
     * @class
     * @extends ig.Command
     * @memeberof ig
     */
    ig.CommandPull = ig.global.CommandPull = ig.Command.extend({

        command: 'Ziehe',

        size: {
            x: 27,
            y: 10
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'ui/ui_button_pull.gif', 27, 10 )
		
	});

});