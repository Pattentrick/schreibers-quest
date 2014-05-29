ig.module(
    'game.ui.command-talk'
)
.requires(
    'plusplus.core.config',
    'plusplus.ui.ui-button',
    'game.ui.command'
)
.defines(function () {

	var _c  = ig.CONFIG;

    /**
     * Entity that functions as the "talk command". Part of the Ui.
     *
     * @class
     * @extends ig.Command
     * @memeberof ig
     */
    ig.CommandTalk = ig.global.CommandTalk = ig.Command.extend({

        command: 'Rede',

        size: {
            x: 25,
            y: 10
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'ui/ui_button_talk.gif', 25, 10 )
		
	});

});