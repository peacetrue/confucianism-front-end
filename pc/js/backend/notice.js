class Notice {
    init(options) {
        this.options = options || {};

        this.templateNoticeItemHtml = $("#template-notice-item").html();
        $.template("noticeItem", this.templateNoticeItemHtml);
        this.notices = $('.gg_left > .gg_one');
        this.loadNotices().then(data => this.renderNotices(data));

        this.commends = $('.gg_two>ul');
        this.templateCommendItemHtml = $("#template-commend-item").html();
        $.template("commendItem", this.templateCommendItemHtml);
        this.loadNotices().then(data => this.renderCommends(data));
    }

    loadNotices() {
        return $.getJSON(`${this.options.host}/notices?typeId=2&page=0&size=10&sort=publishedTime,desc&sort=publishedTime,desc`)
            .then(response => response.content);
    }

    renderNotices(items) {
        items.forEach(item => this.format(item));
        $.tmpl("noticeItem", items).prependTo(this.notices.empty())
    }

    renderCommends(items) {
        items.forEach(item => this.format(item));
        $.tmpl("commendItem", items).prependTo(this.commends.empty())
    }


    format(item) {
        let time = new Date(item.publishedTime);
        item.publishedTime = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`;
    }
}

$(() => {
    new Notice().init(window.backend);
})
