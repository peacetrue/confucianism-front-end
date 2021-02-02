class Registration {
    init(options) {
        this.options = options || {};

        this.form = $(this.options.form);
        if (this.form.length === 0) return this;
        console.info("form:", this.options.form, this.form);
        this.name = this.form.find(this.options.name);
        this.age = this.form.find(this.options.age);
        this.phone = this.form.find(this.options.phone);
        this.type = this.form.find(this.options.type);
        this.classGrade = this.form.find(this.options.classGrade);
        this.email = this.form.find(this.options.email);
        this.fieldNames = ['name', 'age', 'phone', 'email'];

        this.btnSubmit = this.form.find(this.options.submit);
        this.btnSubmit.preBind('click', (event) => {
            if (!this.add()) event.stopImmediatePropagation();
        });
    }

    add() {
        let errorMessage = this.check();
        if (errorMessage) return alert(errorMessage);
        let successMessage = this.options.successMessage;
        return this.doAdd(this.getFormData())
            .then(data => successMessage && alert(successMessage))
            .then(() => this.reset());
    }

    check() {
        if (!this.name.val().trim()) return "请输入姓名！";
        if (!this.phone.val().trim()) return "请输入手机号！";
        if (this.type.length && !this.type.attr('data-registration-id')) return "请选择报名类型！";
    }

    getFormData() {
        return {
            name: this.name.val(),
            age: this.age.val(),
            mobile: this.phone.val(),
            typeId: this.type.attr('data-registration-id'),
            classGradeId: this.classGrade.attr('data-classGrade-id'),
            email: this.email.val(),
        }
    }

    doAdd(data) {
        return $.post(`${this.options.host}/registrations`, data)
            .then(response => response.data);
    }

    reset() {
        if (this.type.is(":visible")) this.type.removeAttr('data-registration-id').removeAttr('data-classGrade-id').text('请选择');
        this.fieldNames.forEach((fieldName) => this[fieldName].val(''));
    }
}

Registration.quickOptions = {
    ...window.backend,
    form: '.sign-up-form',
    name: 'input[type=text]:eq(0)',
    phone: 'input[type=text]:eq(1)',
    submit: '.submit-bnt',
    // successMessage: '报名成功'
}

Registration.classGradeOptions = {
    ...window.backend,
    form: '.bm_table.ms_bm',
    name: 'input[type=text]:eq(0)',
    age: 'input[type=text]:eq(1)',
    phone: 'input[type=text]:eq(2)',
    type: '.sel_xz',
    classGrade: '.sel_xz',
    email: 'input[type=text]:eq(4)',
    submit: '.btn_tj'
    // successMessage: '报名成功'
}

Registration.options = {
    ...window.backend,
    form: '.main .bg_white .bm_table',
    name: 'input[type=text]:eq(0)',
    age: 'input[type=text]:eq(1)',
    phone: 'input[type=text]:eq(2)',
    type: '.sel_xz',
    classGrade: '.sel_xz',
    email: 'input[type=text]:eq(3)',
    submit: '.btn.btn_tj',
}

$(() => {
    new Registration().init(Registration.quickOptions);
    new Registration().init(Registration.classGradeOptions);
    new Registration().init(Registration.options);
});
