class Article {
    init(options) {
        this.options = {...options};
        let id = this.options.params.get('id');
        if (!id) return this;
        this.template = new Template().init(this.options);
        if (id) this.loadArticle(id).then(data => this.template.render(data));
    }

    loadArticle(id) {
        return $.getJSON(`${this.options.host}/articles/${id}`);
    }
}

$(() => {
    new Article().init({
        ...window.backend,
        params: new URLSearchParams(window.location.search),
        template: '[data-template-container]',
        format(item) {
            item.modifiedTime && (item.modifiedTime = item.modifiedTime.substring(0, 10));
            return item;
        }
    });
})
