class ClassGrade {
    init(options) {
        this.options = {...options};
        this.container = $('.xq_bai > .ms_four');
        this.coverLeft = '<li><img src="${item}"></li>';
        this.coverRight = '<li class="li right"><img src="${pcPhotoRightUrl}"></li>';
        this.content = $('.ms_six');
        this.params = new URLSearchParams(window.location.search);
        let id = this.params.get('id');
        if (id) {
            this.loadClassGrade(id).then(data => this.render(data));
        }
    }

    loadClassGrade(id) {
        return $.getJSON(`${this.options.host}/class-grades/${id}`);
    }

    render(data) {
        this.container.empty();
        $('.wei>.main>.left').append(data.title);
        $('.sel_xz').attr('data-classGrade-id', data.id).attr('data-registration-id', data.businessTypeId)
            .find('input').val(data.title).attr('disabled',true);
        $.tmpl(this.coverLeft, data.pcPhotoLeftUrl.split(',').map(item => ({item}))).appendTo(this.container);
        $.tmpl(this.coverRight, data).appendTo(this.container);
        this.content.html(data.detail);
    }
}

$(() => {
    window.current = new ClassGrade().init({
        ...window.backend,
    });
})
