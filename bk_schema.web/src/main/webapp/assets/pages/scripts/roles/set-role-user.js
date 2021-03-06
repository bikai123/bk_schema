/**
 * Created by fanxi on 2016-7-5.
 */
var SetRoleUser;
(function (SetRoleUser) {
    var RoleUser = (function () {
        function RoleUser(roleId) {
            this.configMap = {
                roleId: null,
                userDataGrid: null,
                userDataUrl: 'users/user',
                roleUserDataUrl: 'roles/getroleuser',
                roleUserSetUrl: 'roles/setroleusers',
                currentRoleUser: []
            };
            this.jqueryMap = {
                $container: null,
                $blockTarget: null,
                $userDataTable: null
            };
            this.configMap.roleId = roleId;
            this.configMap.roleUserDataUrl = this.configMap.roleUserDataUrl + '/' + roleId;
            this.jqueryMap.$container = $('#role-manger-setuser');
            this.jqueryMap.$userDataTable = $('#role-users', this.jqueryMap.$container);
            this.jqueryMap.$blockTarget = this.jqueryMap.$container.closest(".modal-body");
        }
        RoleUser.prototype.initUserDatas = function () {
            var currentClass = this;
            currentClass.configMap.userDataGrid = this.jqueryMap.$userDataTable.DataTable({
                "dom": 'rt<"clear">',
                "ordering": false,
                "columnDefs": [
                    {
                        "searchable": false, "targets": [0]
                    }
                ],
                scrollY: "300px",
                "columns": [
                    {
                        "data": "id",
                        "render": function (data, type, row) {
                            return "<div class=\"data-center\"><input type=\"checkbox\" class=\"checkboxes\" value=\"" + data + "\" /></div>";
                        }
                    },
                    { "data": "name" },
                    { "data": "orgName" }
                ],
                "drawCallback": function () {
                    $('input[class="checkboxes"]', currentClass.jqueryMap.$userDataTable).iCheck({
                        checkboxClass: 'icheckbox_minimal',
                        radioClass: 'iradio_minimal',
                        increaseArea: '20%' // optional
                    });
                    $('input[class="checkboxes"]', currentClass.jqueryMap.$userDataTable).off('ifChanged').on("ifChanged", function (event) {
                        var checked = $(this).prop("checked");
                        var value = $(this).val();
                        if (checked) {
                            if (_.indexOf(currentClass.configMap.currentRoleUser, value) < 0) {
                                currentClass.configMap.currentRoleUser.push(value);
                            }
                        }
                        else {
                            _.remove(currentClass.configMap.currentRoleUser, function (val) {
                                return val === value;
                            });
                        }
                    });
                }
            });
            $('.group-checkable', currentClass.jqueryMap.$container).iCheck({
                checkboxClass: 'icheckbox_minimal',
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            });
            $('.group-checkable', currentClass.jqueryMap.$container).on("ifChanged", function (event) {
                var set = currentClass.jqueryMap.$userDataTable.find('tbody > tr > td:nth-child(1) input[type="checkbox"]');
                var checked = $(this).prop("checked");
                $(set).each(function () {
                    $(this).iCheck(checked ? 'check' : 'uncheck');
                });
            });
        };
        RoleUser.prototype.getUserDatas = function () {
            App.blockUI({
                target: this.jqueryMap.$blockTarget,
                boxed: true,
                message: '正在加载数据，请稍候...'
            });
            var currentClass = this;
            $.get(currentClass.configMap.roleUserDataUrl, null, function (result) {
                currentClass.configMap.currentRoleUser = _.map(result, 'id');
            }).done(function () {
                $.get(currentClass.configMap.userDataUrl, null, function (result) {
                    App.unblockUI(currentClass.jqueryMap.$blockTarget);
                    currentClass.configMap.userDataGrid.clear().draw();
                    if (result.length > 0) {
                        currentClass.configMap.userDataGrid.rows.add(result).draw();
                        _.forEach(currentClass.configMap.currentRoleUser, function (value) {
                            $('input[value=' + value + ']', currentClass.jqueryMap.$userDataTable).iCheck('check');
                        });
                    }
                });
            });
        };
        RoleUser.prototype.initSearchData = function () {
            var currentClass = this;
            $('#searchFilter', currentClass.jqueryMap.$container).on('keyup', function () {
                currentClass.configMap.userDataGrid.search(this.value).draw();
            });
        };
        RoleUser.prototype.saveRoleUser = function (callback) {
            App.blockUI({
                target: this.jqueryMap.$blockTarget,
                boxed: true,
                message: '正在设置用户，请稍候...'
            });
            var currentClass = this;
            $.ajax({
                url: currentClass.configMap.roleUserSetUrl + '/' + currentClass.configMap.roleId,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(currentClass.configMap.currentRoleUser),
                type: 'PUT',
                success: function (result) {
                    App.unblockUI(currentClass.jqueryMap.$blockTarget);
                    callback(true);
                },
                error: function () {
                    App.unblockUI(currentClass.jqueryMap.$blockTarget);
                    callback(false);
                }
            });
        };
        return RoleUser;
    }());
    var exeHandler = null;
    function initData(roleUser) {
        if (exeHandler != null) {
            clearTimeout(exeHandler);
        }
        if ($('#role-manger-setuser').closest(".modal-content").width() > 0) {
            roleUser.initUserDatas();
            roleUser.getUserDatas();
            roleUser.initSearchData();
        }
        else {
            exeHandler = setTimeout(function () {
                initData(roleUser);
            }, 10);
        }
    }
    var roleUser;
    function init(roleId) {
        roleUser = new RoleUser(roleId);
        initData(roleUser);
    }
    SetRoleUser.init = init;
    function saveRoleUser(callback) {
        roleUser.saveRoleUser(callback);
    }
    SetRoleUser.saveRoleUser = saveRoleUser;
})(SetRoleUser || (SetRoleUser = {}));
//@ sourceURL=roles/set-role-user.js 
//# sourceMappingURL=set-role-user.js.map