/*
* 公共验证控件
* 作者：彭文宽
* 日期：2015-11-03
**/
var $validator = {
    // 启动验证
    start: function(validatorJson) {
        // 默认验证通过
        var pass = true;
        // 遍历验证对象
        for(var name in validatorJson) {
            // 获取验证的对象
            var $obj = $("[name='" + name + "']");
            // 取消验证的信息
            $validator.hide($obj);
            // 非空验证
            if (validatorJson[name].notEmpty) {
                if (!$obj.val()) {
                    // 修改验证结果
                    pass = false;
                    // 显示错误文本
                    $validator.show($obj, validatorJson[name].notEmpty.message);
                }
            }
            // 验证区间
            if (pass && validatorJson[name].betweenof) {
                var num = parseFloat($obj.val());
                if (num < validatorJson[name].betweenof.min || num > validatorJson[name].betweenof.max) {
                    // 修改验证结果
                    pass = false;
                    // 显示错误文本
                    $validator.show($obj, validatorJson[name].betweenof.message);
                }
            }
            // 验证正则
            if (pass && validatorJson[name].regular) {
                var str = $obj.val();
                if (!str.match(validatorJson[name].regular.reg)) {
                    // 修改验证结果
                    pass = false;
                    // 显示错误文本
                    $validator.show($obj, validatorJson[name].regular.message);
                }
            }
        }
        return pass;
    },
    // 隐藏验证
    hide: function($this) {
        $this.parent().parent()
        .removeClass("has-error")
        .find("small")
        .remove();
    },
    // 显示验证
    show: function($this, text) {
        // 设置验证样式
        $this.parent().parent()
        .addClass("has-error")
        .append(
            $("<small></small>").addClass("help-block").html(text)
        );
    },
    // 文本控制
    control: function($this, valid) {
        // 控制事件设置
        $this.focus(function() {
            // 清值
            $this.val("");
            $("[name='" + valid.name + "']").val("");
        }).focusout(function() {
            // 存值
            $("[name='" + valid.name + "']").val($this.val());
            // 是否调用控制
            if ($this.val() && $(this).val().match(valid.reg)) {
                // 显示组合后文本
                $this.val(valid.prefix + $this.val() + valid.suffix);
                $validator.hide($("[name='" + valid.name + "']"));
            }
        });
    }
};