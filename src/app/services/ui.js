define(['config'], function (config) {
    
    var UiHelper = function () {
        var t = this;

        // descending order is important
        t.sizes = [
            { 'name': 'lg', 'size': 1200 },
            { 'name': 'md', 'size': 992 },
            { 'name': 'sm', 'size': 768 }
        ];
    };

    UiHelper.prototype.loader = function (hide) {
        var visible = hide || true,
            loader = $(config.loaderSelector);

        loader.toggle(visible);
    };

    UiHelper.prototype.getSizeClass = function () {
        var t = this;

        for (i = 0; i < t.sizes.length; ++i) {
            var item = t.sizes[i];
            if (window.matchMedia('(min-width: ' + item.size + 'px)').matches) {
                return item.name;
            }
        }

        return 'xs';
    };

    return new UiHelper();
});
