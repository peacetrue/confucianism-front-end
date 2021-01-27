window.backend = {
    // host: 'http://localhost:8111',
    host: 'http://101.200.133.86:8111',
}

class Template {

    init(options) {
        // this.options = options || {
        //     // template:'',
        //     // format:'',
        // };
        this.options = {...options};
        this.template = $(this.options.template);
        this.templateId = String(new Date().getTime());
        $.template(this.templateId, this.template.html());
        this.container = $(this.template.data("template-container"));

        return this;
    }

    format(data) {
        let format = this.options.format;
        if (!format) return data;
        if (data instanceof Array) return data.map(item => format(item));
        else return format(data);
    }

    render(data) {
        let tmpl = $.tmpl(this.templateId, this.format(data));
        tmpl.prependTo(this.container.empty());
        return this;
    }

}

class Templates {
    init(options) {
        this.options = {formats: [], ...options};
        this.templates = $(this.options.template)
            .map((index, item) => new Template().init({template: item, format: this.options.formats[index]}));
        return this;
    }

    format(data) {
        return Template.prototype.format.call(this, data);
    }

    render(data) {
        data = this.format(data);
        this.templates.each((index, item) => item.render(data));
        return this;
    }
}


jQuery.fn.getEvents = function () {
    if (typeof (jQuery._data) == 'function') {
        return jQuery._data(this.get(0), 'events') || {};
    } else if (typeof (this.data) == 'function') { // jQuery version < 1.7.?
        return this.data('events') || {};
    }
    return {};
};

jQuery.fn.preBind = function (type, data, fn) {
    this.each(function () {
        var $this = jQuery(this);

        $this.bind(type, data, fn);

        var currentBindings = $this.getEvents()[type];
        if (jQuery.isArray(currentBindings)) {
            currentBindings.unshift(currentBindings.pop());
        }
    });
    return this;
};
