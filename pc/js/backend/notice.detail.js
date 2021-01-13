class Notice {
    init(options) {
        this.options = options || {};
        this.template = new Template().init(this.options);
        this.params = new URLSearchParams(window.location.search);
        let id = this.params.get('id');
        if (id) {
            this.loadNotice(id).then(data => this.template.render(data));
            this.viewNotice(id);
        }
    }

    loadNotice(id) {
        return $.getJSON(`${this.options.host}/notices/${id}`);
    }

    viewNotice(id) {
        return $.ajax(`${this.options.host}/notices/view?id=${id}`, {method: 'put'});
    }
}

$(() => {
    new Notice().init({
        ...window.backend,
        template: '[data-template-container]',
        format(item) {
            item.publishedTime && (item.publishedTime = item.publishedTime.substring(0, 10));
            return item;
        }
    });
})
