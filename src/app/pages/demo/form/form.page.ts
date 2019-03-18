import { Component, OnInit } from '@angular/core';
import { NativeService } from '../../../providers/NativeService';
import { Helper } from '../../../providers/Helper';
import { Utils } from '../../../providers/Utils';

@Component({
    selector: 'app-form',
    templateUrl: './form.page.html',
    styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
    isIos;

    today = Utils.dateFormat(new Date());

    defaultValue = {
        username: null,
        password: null,
        newPassword: '123456',
        name: null,
        phone: null,
        birthday: null,
        isMarried: null,
        education: null,
        contacts: [{relation: '', name: '', phone: ''}],
        sex: null,
        hobby: [],
        games: [],
        tooth: 0,
        intro: null
    };

    model: any = JSON.parse(JSON.stringify(this.defaultValue)); // 利用JSON方法进行深拷贝

    hobby = [
        {value: 1, name: '游泳'},
        {value: 2, name: '健身'},
        {value: 3, name: '打麻将'},
        {value: 4, name: '吃饭'},
        {value: 5, name: '拉屎'},
        {value: 6, name: '睡觉'}
    ];

    games = [
        {value: 1, name: '传奇世界'},
        {value: 2, name: '吃鸡'},
        {value: 3, name: '反恐精英'},
        {value: 4, name: '血战上海滩'},
        {value: 5, name: '斗地主'}
    ];

    constructor(public native: NativeService, public helper: Helper) {
        this.isIos = this.helper.isIos();
    }

    ngOnInit() {
    }


    onSubmit() {
        console.log(this.model);
        this.helper.alert('提交成功', '在控制台打印了表单数据');
    }

    reset() {
        this.model = JSON.parse(JSON.stringify(this.defaultValue));
    }

    setData() {
        this.model = {
            username: 'yanxiaojun617',
            password: '123456',
            newPassword: '123456',
            name: '张三',
            phone: '18688498342',
            birthday: '1995-09-09',
            isMarried: false,
            education: '4',
            contacts: [{
                relation: '朋友',
                name: '李四',
                phone: '18670098124'
            }],
            sex: '1',
            hobby: [2, 3],
            games: [1, 3],
            tooth: 1,
            intro: '注：使用div模拟textarea从而实现根据内容多少自动改变文本域高度。https://github.com/KostyaTretyak/ng-contenteditable'
        };
    }

    hobbyCheckboxClick(value) {
        const hobby = this.model.hobby;
        const index = hobby.indexOf(value);
        if (index === -1) {
            hobby.push(value);
        } else {
            hobby.splice(index, 1);
        }
    }

    addContact() {
        this.model.contacts.push({relation: '', name: '', phone: ''});
    }

    trackByContacts(index) {
        return index;
    }

    removeContact(contact) {
        const doRemove = () => {
            const contacts = this.model.contacts;
            contacts.splice(contacts.indexOf(contact), 1);
        };
        if (!contact.relation && !contact.name && !contact.phone) {
            doRemove();
        } else {
            this.helper.alert(null, '已填写内容，确认移除？', () => {
                doRemove();
            });
        }
    }

    details(url) {
        // this.nativeService.openUrlByBrowser(url);
    }

    formValidation() {
        // this.navCtrl.push(FormValidationDemoPage);
    }
}
