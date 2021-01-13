class Index {
    init(options) {
        this.options = options || {};
        this.initCollege();
        this.initCollegeName();
        this.initSuccessCase();
    }

    initCollege() {
        this.colleges = $(".school-box>.menu-box");
        this.colleges.on('click', "dd[data-id]", (event) => {
            let college = $(event.targetElement);
            let data = this.resolveCollegeData(college);
            this.renderCollegeName(data);
            this.loadSuccessCases(data.id).then(data => this.renderSuccessCase(data));
        });
    }

    resolveCollegeData(college) {
        return {
            id: college.data('id'),
            name: college.text(),
            aliasName: college.data('alias-name'),
        }
    }

    initCollegeName() {
        this.templateCollegeName = $('#template-college-name');
        $.template('collegeName', this.templateCollegeName.html());
        this.collegeName = $(this.templateCollegeName.data('container'))
    }

    renderCollegeName(data) {
        $.tmpl("collegeName", data).appendTo(this.collegeName.empty());
    }

    initCollegeSummary() {
        this.templateSchoolSummaryHtml = $("#template-school-summary").html();
        $.template("schoolSummary", this.templateSchoolSummaryHtml);
    }

    initSuccessCase() {
        this.templateSuccessCaseItem = $('#template-successCase-item');
        $.template('successCaseItem', this.templateSuccessCaseItem.html());
        this.successCaseItems = $(this.templateSuccessCaseItem.data('container'))
    }

    renderSuccessCase(data) {
        $.tmpl("successCaseItem", data).appendTo(this.successCaseItems.empty());
    }

    loadSuccessCases(collegeId) {
        return $.getJSON(`${backend.host}/success-cases?collegeId=${collegeId}&page=0&size=8`)
            .then(response => response.data.content);
    }
}

$(function () {
    new Index().init(window.backend);
})
