define([
    "jquery",
    "mage/adminhtml/wysiwyg/events"
], function ($, events) {
    'use strict';

    function ComponentInitializer () {
        this.config = null;
        this.element = null;
    }

    ComponentInitializer.prototype = Object.create({});

    /**
     * Initialize the instance
     *
     * @param wysiwyg
     */
    ComponentInitializer.prototype.initialize = function (wysiwyg) {
        this.element = (0, $)("#" + wysiwyg.elementId);
        this.config = wysiwyg.config;
        var tinymce = wysiwyg.getAdapter();
        tinymce.eventBus.attachEventHandler(events.afterFocus, this.onFocus.bind(this));
        tinymce.eventBus.attachEventHandler(events.afterBlur, this.onBlur.bind(this));
    };
    
    /**
     * Called when tinymce is focused
     */
    ComponentInitializer.prototype.onFocus = function () {
        var self = this;

        // If there isn't enough room for a left-aligned toolbar, right align it
        if ((0, $)(window).width() < this.element.offset().left + parseInt(this.config.adapter_config.minToolbarWidth, 10)) {
            this.element.addClass("_right-aligned-toolbar");
        } else {
            this.element.removeClass("_right-aligned-toolbar");
        }

        $.each(this.config.adapter_config.parentSelectorsToUnderlay, function (i, selector) {
            self.element.closest(selector).css("z-index", 100);
        });
    };

    /**
     * Called when tinymce is blurred
     */
    ComponentInitializer.prototype.onBlur = function () {
        var self = this;

        $.each(this.config.adapter_config.parentSelectorsToUnderlay, function (i, selector) {
            self.element.closest(selector).css("z-index", "");
        });
    };

    return ComponentInitializer;
});
