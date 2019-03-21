

export default {
    getModel: function (modelObject) {
        let Model = function () {
            for (const key in modelObject) {
                if (modelObject.hasOwnProperty(key)) {
                    const element = modelObject[key];
                    this[key] = element;
                    this[key].placeholder = "请输入" + element.name;
                    this[key].value = element.default || '';
                }
            }

            this.getValues = function() {
                let obj = {};
                for (const key in this) {
                    if (this.hasOwnProperty(key)) {
                        const element = this[key];
                        if ( element && element.formField === true ) {
                            obj[key] = element.value;
                        }
                    }
                }
                return obj;
            }

            this.setValues = function(obj) {
                for (const key in this) {
                    if (this.hasOwnProperty(key)) {
                        const element = this[key];
                        if ( element && element.formField === true ) {
                            element.value = obj[key];
                        }
                    }
                }
            }

            this.checkValues = function() {
                let result = true;
                for (const key in this) {
                    if (this.hasOwnProperty(key)) {
                        const element = this[key];
                        if ( element && element.formField === true && element.formRequired === true ) {
                            if ( element.value === undefined || element.value === "" || element.value === null ) {
                                result = {
                                    msg: element.name + "不能为空"
                                }
                                break;
                            }
                        }
                    }
                }
                return result;
            }
        }

        return Model;
    }
}
