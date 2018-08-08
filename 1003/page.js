var grid4_people = [
    { id: 1, text: 'John Cook' },
    { id: 2, text: 'Steve Jobs' },
    { id: 3, text: 'Peter Sanders' },
    { id: 4, text: 'Mark Newman' },
    { id: 5, text: 'Addy Osmani' },
    { id: 6, text: 'Paul Irish' },
    { id: 7, text: 'Doug Crocford' },
    { id: 8, text: 'Nicolas Cage' },
];

function popup_edit() {
    w2popup.open({
        width: 800,
        height: 500,
        title: 'Popup Title',
        body: '<div class="w2ui-centered">This is text inside the popup</div>',
        buttons: '<button class="btn" onclick="showMessage()">Show Message</button> ',
        showMax: true
    });
}

function showMessage() {
    w2popup.message({
        width: 400,
        height: 180,
        html: '<div style="padding: 60px; text-align: center">Click on the message to Hide it</div>' +
                  '<div style="text-align: center"><button class="btn" onclick="w2popup.message()">Close</button>'
    });
}

function f_panel_left_toggle() {
    w2ui['layout_page'].toggle('left', window.instant);

    var tl = $('.panel_left_bar_ib_toggle');
    if (tl.is(":visible")) {
        $('div[name="layout_page_main_tabs"] table').css({ 'padding-left': '0px' });
        tl.hide();
    } else {
        $('div[name="layout_page_main_tabs"] table').css({ 'padding-left': '20px' });
        tl.show();
    }
}

// widget configuration
var config = {
    layout: {
        name: 'layout',
        padding: 0,
        panels: [
            {
                type: 'top', size: 30, resizable: false, hidden: false,
                content: 'top', overflow: 'hidden', style: 'background-color: #fafafa;border:none;',
                toolbar: {
                    name: 'toolbar_top',
                    style: 'padding:0px;border:none;',
                    items: [
                        {
                            type: 'html', id: 'nav_item_logo',
                            html: '<div class="nav_item_logo"><img src="/Asset/admin/user.jpg"/></div><div class="nav_item_logo_space"></div>'
                        },
                        {
                            type: 'menu', id: 'item2', caption: '<b>IFC</b>', count: 17, items: [
                              { text: 'Thông tin tài khoản', icon: 'mdi mdi-account', },
                              { text: 'Đổi mật khẩu', icon: 'mdi mdi-lock' },
                              { text: 'Cấu hình', icon: 'mdi mdi-settings' }
                            ]
                        },
                        { type: 'spacer' },
                        { type: 'radio', id: 'item3', group: '1', caption: 'task 1', icon: 'mdi mdi-file-outline', checked: true },
                        { type: 'radio', id: 'item4', group: '1', caption: 'task 2', icon: 'mdi mdi-file-outline' },
                        { type: 'break', id: 'break1' },
                        {
                            type: 'html', id: 'nav_item_notification',
                            html: '<div class="nav_item_notification">' +
                                  ' <ul>' +
                                  '     <li class="mdi mdi-bell"><span>5</span></li>' +
                                  '     <li class="mdi mdi-email"><span>5</span></li>' +
                                  '     <li class="mdi mdi-history"><span>5</span></li>' +
                                  ' </ul>' +
                                  '</div>'
                        }
                    ]
                }
            }
            , {
                type: 'left', size: 225, resizable: true, minSize: 0, hidden: false,
                toolbar: {
                    name: 'toolbar_left',
                    style: 'padding:0px;border:none;border-bottom: 1px solid silver;',
                    items: [
                        {
                            type: 'menu', id: 'toolbar_leftitemff1', caption: '<span class="mdi16 mdi-menu"></span>', items: [
                              { text: 'Chức năng (API)', icon: 'mdi mdi-codepen' },
                              { text: 'Kết nối, truy cập', icon: 'mdi mdi-access-point-network' },
                              { text: 'Cơ sở dữ liệu', icon: 'mdi mdi-database' },
                              { text: 'Tài khoản', icon: 'mdi mdi-account-key' },
                              { text: 'Hệ thống khách hàng', icon: 'mdi mdi-monitor' }
                            ]
                        },
                        { type: 'radio', id: 'toolbar_leftitemff2', group: '1', caption: 'Điện lực', checked: true },
                        { type: 'radio', id: 'toolbar_leftitemff3', group: '1', caption: 'Trạm' },
                        { type: 'radio', id: 'toolbar_leftitemff4', group: '1', caption: 'Nhóm' },
                        { type: 'spacer' },
                        {
                            type: 'html', id: 'panel_left_bar',
                            html: '<div id="panel_left_bar"><span class="ib_toggle mdi24 mdi-menu-left" onclick="f_panel_left_toggle()"></span></div>'
                        }
                    ]
                }
            }
            , {
                type: 'main', overflow: 'hidden'
                , style: 'background-color: white; border: 1px solid silver; border-top: 0px; padding: 0px;'
                , tabs: {
                    active: 'tab0',
                    tabs: [
                        { id: 'tab0', caption: 'tab0', hidden: false },
                        { id: 'tab1', caption: 'tab1', hidden: true }
                    ],
                    onClick: function (event) {
                        //w2ui.layout.html('main', 'Active tab: ' + event.target);
                    },
                    onClose: function (event) {
                        this.click('tab0');
                    }
                }
            }
            , { type: 'preview', size: '10%', resizable: true, hidden: false, content: 'preview' }
            , {
                type: 'bottom', size: 20, resizable: false, hidden: false,
                content: '<span class=fs12>©<span> <span class=fs11>IFC company<span>', overflow: 'hidden',
                style: 'background-color: #EEEEEE;text-align: center;display: block;top: 0px; padding-top: 1px;font-family: arial;color: #666;'
            }
        ]
        , onShow: function (event) {
            console.log('onShow(): object ' + event.panel + ' is shown');
        }
        , onRender: function (event) {
            //console.log('object ' + this.name + ' is rendered. 1 lần duy nhất khi trang vừa tải về');
        }
    },
    sidebar: {
        name: 'sidebar',
        //topHTML: '<div id="panel_left_bar"><span class="ib_toggle mdi24 mdi-menu-left" onclick="f_panel_left_toggle()"></span></div>',
        bottomHTML: '<div style="background-color: #eee; padding: 10px 5px; border-top: 1px solid silver"></div>',
        nodes: [
            {
                id: 'level-1', text: 'Level 1', img: 'icon-folder', expanded: true, group: true,
                nodes: [{ id: 'grid1', text: 'Grid 1', icon: 'mdi mdi-home' },
                         { id: 'grid2', text: 'Grid 2', icon: 'mdi mdi-table' },
                         { id: 'grid3', text: 'Grid 3', icon: 'mdi mdi-table' },
                         { id: 'grid4', text: 'Grid 4', icon: 'mdi mdi-table-edit' },
                         { id: 'html', text: 'HTML', icon: 'mdi mdi-comment-account' }
                ]
            },
            {
                id: 'level-2', text: 'Level 2', img: 'icon-folder', expanded: true, group: false,
                nodes: [
                    {
                        id: 'level-2-1', text: 'Level 2.1', img: 'icon-folder', count: 3,
                        nodes: [
                                    { id: 'level-2-1-1', text: 'Level 2.1.1', icon: 'mdi mdi-monitor' },
                                    { id: 'level-2-1-2', text: 'Level 2.1.2', icon: 'mdi mdi-monitor', count: 67 },
                                    { id: 'level-2-1-3', text: 'Level 2.1.3', icon: 'mdi mdi-monitor' }
                        ]
                    },
                    { id: 'level-2-2', text: 'Level 2.2', icon: 'mdi mdi-monitor' },
                    { id: 'level-2-3', text: 'Level 2.3', icon: 'mdi mdi-monitor' }
                ]
            },
            {
                id: 'level-3', text: 'Level 3', img: 'icon-folder', expanded: true, group: false,
                nodes: [{ id: 'level-3-1', text: 'Level 3.1', icon: 'mdi mdi-file' },
                         { id: 'level-3-2', text: 'Level 3.2', icon: 'mdi mdi-file' },
                         { id: 'level-3-3', text: 'Level 3.3', icon: 'mdi mdi-file' }
                ]
            },
            {
                id: 'level-4', text: 'Level 4', img: 'icon-folder', expanded: true, group: false,
                nodes: [{ id: 'level-4-1', text: 'Level 4.1', icon: 'mdi mdi-file' },
                         { id: 'level-4-2', text: 'Level 4.2', icon: 'mdi mdi-file' },
                         { id: 'level-4-3', text: 'Level 4.3', icon: 'mdi mdi-file' }
                ]
            },
            {
                id: 'level-5', text: 'Level 5', img: 'icon-folder', expanded: true, group: false,
                nodes: [{ id: 'level-5-1', text: 'Level 5.1', icon: 'mdi mdi-file' },
                         { id: 'level-5-2', text: 'Level 5.2', icon: 'mdi mdi-file' },
                         { id: 'level-5-3', text: 'Level 5.3', icon: 'mdi mdi-file' }
                ]
            }
        ],
        onClick: function (event) {
            switch (event.target) {
                case 'grid1':
                    w2ui.layout.content('main', w2ui.grid1);
                    break;
                case 'grid2':
                    w2ui.layout.content('main', w2ui.grid2);
                    break;
                case 'grid3':
                    w2ui.layout.content('main', w2ui.grid3);
                    break;
                case 'grid4':
                    w2ui.layout.content('main', w2ui.grid4);
                    break;
                case 'html':
                    w2ui.layout.content('main', '<div style="padding: 10px">Some HTML</div>');
                    $(w2ui.layout.el('main'))
                        .removeClass('w2ui-grid')
                        .css({
                            'border-left': '1px solid silver'
                        });
                    break;
                default:
                    //add dynamic tab x
                    var tabs = w2ui.layout_main_tabs;
                    if (tabs.get(event.target)) {
                        tabs.select(event.target);
                        //w2ui.layout.html('main', 'Tab Selected');
                    } else {
                        tabs.add({ id: event.target, caption: 'Tab ' + event.target, closable: true });
                        //w2ui.layout.html('main', 'New tab added');
                    }
                    break;
            }





        }
    },
    grid1: {
        name: 'grid1',
        multiSelect: true, //chỉ cho chọn 1 row hoặc chọn nhiều row, mặc định là false
        show: {
            toolbar: true,
            footer: true,
            lineNumbers: true,
            selectColumn: true,
            expandColumn: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true,
            toolbarEdit: true
        },
        onAdd: function (event) {
            //w2alert('add');
            var g = w2ui['grid1'].records.length;
            w2ui['grid1'].add([
                { recid: g + 1, fname: 'Mr', lname: 'Thinh', email: 'ifc@gmail.com', sdate: '9/9/2016' },
                { recid: g + 2, fname: 'Mr', lname: 'Duy', email: 'ifc@gmail.com', sdate: '1/1/2000' }
            ]);
        },
        onEdit: function (event) {
            popup_edit();
        },
        onDelete: function (event) {
            w2alert(w2ui['grid1'].getSelection());

            //w2alert('delete has default behaviour');
            w2ui['grid1'].clear();
            w2ui['grid1'].records = [
                { recid: 1, fname: 'John', lname: 'doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
            ];
            w2ui['grid1'].total = 2;
            w2ui['grid1'].refresh();
        },
        onSubmit: function (event) {
            w2ui['grid1'].lock('Saving', true);
            //w2alert('save');
            setTimeout(function () { w2ui['grid1'].unlock(); }, 3000);
        },
        onRender: function (event) {
            //console.log('grid1:  object ' + this.name + ' is rendered');
        },
        onDestroy: function (event) {
            //console.log('grid1:  object ' + event.target + ' is destroyed');
        },
        onRefresh: function (event) {
            //console.log('grid1: object ' + event.target + ' is refreshed');
            var grid_grid1_records = document.getElementById('grid_grid1_records');
            if (grid_grid1_records != null) {
                //console.log('grid1:  exist element: grid_grid1_records');
            }
        },
        onResize: function (event) {
            //console.log('grid1: object ' + this.name + ' is resized');
            var grid_grid1_records = document.getElementById('grid_grid1_records');
            if (grid_grid1_records != null) {
                //console.log('grid1:  exist element: grid_grid1_records');
            }
        },
        multiSearch: true,
        searches: [
            { field: 'recid', caption: 'ID ', type: 'int' },
            { field: 'lname', caption: 'Last Name', type: 'text' },
            { field: 'fname', caption: 'First Name', type: 'text' },
            { field: 'email', caption: 'Email', type: 'list', options: { items: ['kelly@gmail.com', 'jin@gmail.com', 'mark@gmail.com'] } },
            { field: 'sdate', caption: 'Start Date', type: 'date' }
        ],
        toolbar: {
            items: [
                    { type: 'break' },
                    { type: 'button', id: 'export_excel', caption: 'Export excel', icon: 'mdi mdi-file-excel' },
                    { type: 'button', id: 'g1_select', caption: 'Select', icon: 'mdi mdi-check' },
                    { type: 'button', id: 'g1_unselect', caption: 'Un select', icon: 'mdi mdi-check' },
                    { type: 'button', id: 'g1_hide_column', caption: 'Show/Hide column', icon: 'mdi mdi-check' },
                    { type: 'spacer' },
                    {
                        type: 'menu', id: 'menu_bar', caption: 'Menu', icon: 'fa-table', count: 17,
                        items: [
                            { text: 'Item 1', icon: 'fa-camera', count: 5 },
                            { text: 'Item 2', icon: 'fa-picture', disabled: true },
                            { text: 'Item 3', icon: 'fa-glass', count: 12 }
                        ]
                    },
                    { type: 'button', id: 'g1_help', caption: '', icon: 'mdi mdi-help-circle' }
            ],
            onClick: function (target, data) {
                switch (target) {
                    case 'menu_bar':
                        break;
                    case 'g1_hide_column':
                        w2ui['grid1'].toggleColumn('email');
                        break;
                    case 'g1_select':
                        //w2ui['grid1'].selectNone();
                        //w2ui['grid1'].selectAll();
                        //w2alert(w2ui['grid1'].getSelection());
                        w2ui['grid1'].select(5, 2, 7);
                        break;
                    case 'g1_unselect':
                        w2ui['grid1'].unselect(2);
                        break;
                    case 'g1_help':
                        w2alert('show help');
                        break;
                    default:
                        w2ui['grid1'].lock(target, true);
                        //w2alert('save');
                        setTimeout(function () { w2ui['grid1'].unlock(); }, 3000);
                        break;
                }
            }
        },
        columns: [
            { field: 'lname', caption: 'Last Name', size: '30%', sortable: true, resizable: true, editable: { type: 'text' } },
            { field: 'fname', caption: 'First Name', size: '30%', sortable: true, resizable: true, editable: { type: 'text' } },
            { field: 'email', caption: 'Email', size: '40%', sortable: true, resizable: true, editable: { type: 'text' } },
            { field: 'sdate', caption: 'Start Date', size: '90px', sortable: true, resizable: true, attr: "align=center" },
        ],
        onEditField: function (event) {
            //console.log('value', event.value);
            console.log(w2ui['grid1'].getChanges());
        },
        records: [
            { recid: 1, fname: 'John', lname: 'doe', email: 'kelly@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jin@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jin@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'kelly@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'mark@gmail.com', sdate: '4/3/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 1, fname: 'John', lname: 'doe', email: 'kelly@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jin@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jin@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'kelly@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'mark@gmail.com', sdate: '4/3/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 1, fname: 'John', lname: 'doe', email: 'kelly@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jin@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jin@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'kelly@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'mark@gmail.com', sdate: '4/3/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
        ],
        onExpand: function (event) {
            if (w2ui.hasOwnProperty('subgrid-' + event.recid)) w2ui['subgrid-' + event.recid].destroy();
            $('#' + event.box_id).css({ margin: '0px', padding: '0px', width: '100%' }).animate({ height: '105px' }, 100);
            setTimeout(function () {
                $('#' + event.box_id).w2grid({
                    name: 'subgrid-' + event.recid,
                    show: { columnHeaders: false },
                    fixedBody: true,
                    columns: [
                        { field: 'lname', caption: 'Last Name', size: '30%' },
                        { field: 'fname', caption: 'First Name', size: '30%' },
                        { field: 'email', caption: 'Email', size: '40%' },
                        { field: 'sdate', caption: 'Start Date', size: '90px', attr: "align=center" },
                    ],
                    records: [
                        { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                        { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                        { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
                    ]
                });
                w2ui['subgrid-' + event.recid].resize();
            }, 300);
        }
    },
    grid2: {
        name: 'grid2',
        show: {
            toolbar: true,
            footer: true,
            lineNumbers: true,
            selectColumn: true,
            expandColumn: false
        },
        multiSearch: true,
        searches: [
            { field: 'recid', caption: 'ID ', type: 'int' },
            { field: 'lname', caption: 'Last Name', type: 'text' },
            { field: 'fname', caption: 'First Name', type: 'text' },
            { field: 'email', caption: 'Email', type: 'list', options: { items: ['kelly@gmail.com', 'jin@gmail.com', 'mark@gmail.com'] } },
            { field: 'sdate', caption: 'Start Date', type: 'date' }
        ],
        columns: [
            {
                field: 'fname', caption: 'Full Name', size: '200px',
                render: function (record, index, column_index) {
                    var html = '<div>' + record.fname + ' ' + record.lname + '</div>';
                    return html;
                }
            },
            { field: 'email', caption: 'Email', size: '100%' },
            { field: 'profit', caption: 'Profit', size: '120px', render: 'money', sortable: true },
            { field: 'sdate', caption: 'Start Date', size: '120px', render: 'date:mm/dd/yyyy', sortable: true, attr: "align=center" }
        ],
        records: [
            { recid: 1, fname: 'John', lname: 'Doe', email: 'john@gmail.com', profit: 2500, sdate: '1/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'stuart@gmail.com', profit: 1004, sdate: '4/13/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jin@gmail.com', profit: 473, sdate: '3/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'susan@gmail.com', profit: 304, sdate: '5/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'kelly@gmail.com', profit: 9300, sdate: '8/19/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'francis@gmail.com', sdate: '6/12/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'mark@gmail.com', profit: 3400, sdate: '8/13/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'thomas@gmail.com', profit: 2030, sdate: '4/31/2012' },
            { recid: 10, fname: 'John', lname: 'Doe', email: 'john@gmail.com', profit: 13004, sdate: '1/3/2012' },
            { recid: 12, fname: 'Stuart', lname: 'Motzart', email: 'stuart@gmail.com', sdate: '4/13/2012' },
            { recid: 13, fname: 'Jin', lname: 'Franson', email: 'jin@gmail.com', profit: 4043, sdate: '3/3/2012' },
            { recid: 14, fname: 'Susan', lname: 'Ottie', email: 'susan@gmail.com', profit: 474, sdate: '5/3/2012' },
            { recid: 15, fname: 'Kelly', lname: 'Silver', email: 'kelly@gmail.com', profit: 1704, sdate: '8/19/2012' },
            { recid: 16, fname: 'Francis', lname: 'Gatos', email: 'francis@gmail.com', sdate: '6/12/2012' },
            { recid: 17, fname: 'Mark', lname: 'Welldo', email: 'mark@gmail.com', profit: 7065, sdate: '8/13/2012' },
            { recid: 18, fname: 'Thomas', lname: 'Bahh', email: 'thomas@gmail.com', profit: 609, sdate: '4/31/2012' },
            { recid: 19, fname: 'Sergei', lname: 'Rachmaninov', email: 'sergei@gmail.com', profit: 777, sdate: '2/23/2012' }
        ]
    },
    grid3: {
        name: 'grid3',
        show: {
            toolbar: true,
            footer: true,
            lineNumbers: true,
            selectColumn: true,
            expandColumn: false
        },
        searches: [
            { field: 'lname', caption: 'Last Name', type: 'text' },
            { field: 'fname', caption: 'First Name', type: 'text' },
            { field: 'email', caption: 'Email', type: 'text' },
        ],
        sortData: [{ field: 'recid', direction: 'asc' }],
        columns: [
            { field: 'lname', caption: 'Last Name', size: '30%', sortable: true },
            { field: 'fname', caption: 'First Name', size: '30%', sortable: true },
            { field: 'email', caption: 'Email', size: '40%', sortable: true },
            { field: 'sdate', caption: 'Start', size: '90px', sortable: true },
            { field: 'edate', caption: 'End', size: '90px', sortable: true }
        ],
        records: [
            { recid: 1, fname: 'Jane', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012', edate: '12/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012', edate: '11/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'peter@gmail.com', sdate: '4/3/2012', edate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'frank@gmail.com', sdate: '9/3/2012', edate: '10/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '6/3/2012', edate: '4/24/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '2/3/2012', edate: '6/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'susan@gmail.com', sdate: '4/3/2012', edate: '6/23/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'david@gmail.com', sdate: '9/3/2012', edate: '4/16/2012' },
            { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'magi@gmail.com', sdate: '4/3/2012', edate: '4/3/2012' },
            { recid: 20, fname: 'Jill', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012', edate: '4/3/2012' },
            { recid: 21, fname: 'Frank', lname: 'Motzart', email: 'peterson@gmail.com', sdate: '4/3/2012', edate: '4/3/2012' },
            { recid: 22, fname: 'Peter', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012', edate: '8/3/2012' },
            { recid: 23, fname: 'Andrew', lname: 'Ottie', email: 'magi@gmail.com', sdate: '6/3/2012', edate: '4/19/2012' },
            { recid: 24, fname: 'Manny', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012', edate: '8/5/2012' },
            { recid: 25, fname: 'Ben', lname: 'Gatos', email: 'peter@gmail.com', sdate: '9/3/2012', edate: '4/3/2012' },
            { recid: 26, fname: 'Doer', lname: 'Welldo', email: 'magi@gmail.com', sdate: '4/3/2012', edate: '4/7/2012' },
            { recid: 27, fname: 'Shashi', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012', edate: '4/3/2012' },
            { recid: 28, fname: 'Av', lname: 'Rachmaninov', email: 'joe@gmail.com', sdate: '9/3/2012', edate: '12/6/2012' },
            { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'magi@gmail.com', sdate: '4/3/2012', edate: '4/3/2012' },
            { recid: 20, fname: 'Jill', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012', edate: '4/3/2012' },
            { recid: 21, fname: 'Frank', lname: 'Motzart', email: 'peterson@gmail.com', sdate: '4/3/2012', edate: '4/3/2012' },
            { recid: 22, fname: 'Peter', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012', edate: '8/3/2012' },
            { recid: 23, fname: 'Andrew', lname: 'Ottie', email: 'magi@gmail.com', sdate: '6/3/2012', edate: '4/19/2012' },
            { recid: 24, fname: 'Manny', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012', edate: '8/5/2012' },
            { recid: 25, fname: 'Ben', lname: 'Gatos', email: 'peter@gmail.com', sdate: '9/3/2012', edate: '4/3/2012' },
            { recid: 26, fname: 'Doer', lname: 'Welldo', email: 'magi@gmail.com', sdate: '4/3/2012', edate: '4/7/2012' },
            { recid: 27, fname: 'Shashi', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012', edate: '4/3/2012' },
            { recid: 28, fname: 'Av', lname: 'Rachmaninov', email: 'joe@gmail.com', sdate: '9/3/2012', edate: '12/6/2012' },
            {
                summary: true,
                recid: 'S-1', lname: '<span style="float: right;">Total</span>', fname: '403',
                email: '<span style="float: right;">Mean Date</span>',
                sdate: '1/1/2012', edate: '2/1/2012'
            },
            {
                summary: true,
                recid: 'S-2', lname: '<span style="float: right;">Average</span>', fname: '80',
                email: '<span style="float: right;">Average Date</span>',
                sdate: '1/1/2012', edate: '2/1/2012'
            }
        ]
    },
    grid4: {
        name: 'grid4',
        show: {
            toolbar: true,
            footer: true,
            toolbarSave: true
        },
        columns: [
            { field: 'recid', caption: 'ID', size: '50px', sortable: true, resizable: true },
            {
                field: 'text', caption: 'text', size: '120px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            {
                field: 'int', caption: 'int', size: '80px', sortable: true, resizable: true, render: 'int',
                editable: { type: 'int', min: 0, max: 32756 }
            },
            {
                field: 'money', caption: 'money', size: '80px', sortable: true, resizable: true, render: 'money',
                editable: { type: 'money' }
            },
            {
                field: 'percent', caption: 'percent', size: '80px', sortable: true, resizable: true, render: 'percent:1',
                editable: { type: 'percent', precision: 1 }
            },
            {
                field: 'color', caption: 'color', size: '80px', sortable: true, resizable: true,
                editable: { type: 'color' }
            },
            {
                field: 'date', caption: 'date', size: '90px', sortable: true, resizable: true, render: 'date', style: 'text-align: right',
                editable: { type: 'date' }
            },
            {
                field: 'time', caption: 'time', size: '70px', sortable: true, resizable: true,
                editable: { type: 'time' }
            },
            {
                field: 'list', caption: 'list', size: '50%', sortable: true, resizable: true,
                editable: { type: 'list', items: grid4_people, showAll: true },
                render: function (record, index, col_index) {
                    var html = this.getCellValue(index, col_index);
                    return html.text || '';
                }
            },
            {
                field: 'combo', caption: 'combo', size: '50%', sortable: true, resizable: true,
                editable: { type: 'combo', items: grid4_people, showAll: true }
            },
            {
                field: 'select', caption: 'select', size: '100px', sortable: true, resizable: true,
                editable: { type: 'select', items: grid4_people },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in grid4_people) {
                        if (grid4_people[p].id == this.getCellValue(index, col_index)) html = grid4_people[p].text;
                    }
                    return html;
                }
            },
            {
                field: 'check', caption: 'check', size: '60px', sortable: true, resizable: true,
                editable: { type: 'checkbox' }
            },
        ],
        toolbar: {
            items: [
                { id: 'add', type: 'button', caption: 'Add Record', icon: 'w2ui-icon-plus' }
            ],
            onClick: function (event) {
                if (event.target == 'add') {
                    w2ui.grid.add({ recid: w2ui.grid.records.length + 1 });
                }
            }
        },
        records: [
            { recid: 1, int: 100, money: 100, percent: 55, date: '1/1/2014', combo: 'John Cook', check: true },
            { recid: 2, int: 200, money: 454.40, percent: 15, date: '1/1/2014', combo: 'John Cook', check: false, list: { id: 2, text: 'Steve Jobs' } },
            { recid: 3, int: 350, money: 1040, percent: 98, date: '3/14/2014', combo: 'John Cook', check: true },
            { recid: 4, int: 350, money: 140, percent: 58, date: '1/31/2014', combo: 'John Cook', check: true, list: { id: 4, text: 'Mark Newman' } },
            { recid: 5, int: 350, money: 500, percent: 78, date: '4/1/2014', check: false },
            { recid: 6, text: 'some text', int: 350, money: 440, percent: 59, date: '4/4/2014', check: false },
            { recid: 7, int: 350, money: 790, percent: 39, date: '6/8/2014', check: false },
            { recid: 8, int: 350, money: 4040, percent: 12, date: '11/3/2014', check: true },
            {
                recid: 9, int: 1000, money: 3400, percent: 100, date: '2/1/2014',
                style: 'background-color: #ffcccc', editable: false
            }
        ]
    }
};//end config



function f_page_login() {

    var layout_login = $().w2layout({
        name: 'layout_login',
        padding: 0,
        panels: [
            { type: 'top', size: 32, content: '<div style="padding: 7px;">Top Panel</div>', style: 'border-bottom: 1px solid silver;' },
            { type: 'main', minSize: 350, overflow: 'hidden' },
        ]
    });

    var toolbar_top_login = $().w2toolbar({
        name: 'toolbar_top_login',
        items: [
            {
                type: 'html', id: 'item6',
                html: '<div style="padding: 3px 10px;">' +
                      '  Vui lòng nhập thông tin tài khoản.' +
                      '</div>'
            },
            { type: 'spacer' },
            { type: 'break', id: 'break0' },
            { type: 'button', id: 'login', caption: 'Đăng nhập', icon: 'mdi mdi-key' },
            { type: 'break', id: 'break1' },
            { type: 'button', id: 'help', caption: '', icon: 'mdi mdi-help-circle' },
            { type: 'button', id: 'close', caption: '', icon: 'mdi mdi-close' },
        ],
        onClick: function (target, data) {
            switch (target) {
                case 'help':
                    //w2alert('Hướng dẫn sử dụng, giới thiệu ....');
                    w2popup.message({
                        html: '<div style="padding: 0px 10px 10px; text-align: center"><h1>Hướng dẫn sử dụng</h1>Nội dung blabla ... <p>Two most frequntly used dialogs are alert and cofirm. In the case of a alert you just need to display a message to the user and require no feedback besides user acknowledgement. Confirm dialog has similar purpose, but expects from the user a response by accepting or declining to the request. The w2ui library includes these dialogs for your convenience.</p></div>'
                                  + '<div style="text-align: center;padding: 0px 10px 10px;"><button class="btn" onclick="w2popup.message()">Thoát</button>',
                        hideOnClick: true,    // if true, hide message if user clicks on it or call w2popup.message()
                        onOpen: function () {
                            // function to execute when message opens
                            console.log('function to execute when message opens');
                        },
                        onClose: function () {
                            // function to execute when message closes
                            console.log(' function to execute when message closes');
                        }
                    });
                    break;
                case 'close':
                    if (sessionStorage['w2popup.close'] != 'yes') {
                        w2confirm(
                            {
                                msg: 'Bạn chắc chắn muốn thoát?',
                                yes_text: 'Đồng ý thoát',
                                yes_class: '',
                                yes_style: '',
                                yes_callBack: function () {
                                    sessionStorage['w2popup.close'] = 'yes';
                                    w2popup.close();
                                },
                                no_text: 'Quay lại',
                                no_class: '',
                                no_style: '',
                                no_callBack: function (btn) {
                                    sessionStorage['w2popup.close'] = '';
                                }
                            });

                        event.preventDefault();
                    }
                    break;
                case 'login':
                    w2popup.lock('Đang xử lý...<br><br><button onclick="w2popup.unlock();">Quay lại</button>', true);
                    break;
            }
        }
    });


    var form_login = $().w2form({
        name: 'form',
        style: 'border: none;background-color: #fff;padding-top:20px;',
        url: 'server/post',
        fields: [
            { field: 'username', type: 'text', required: true, html: { caption: 'Tài khoản', attr: 'style="width: 300px"' } },
            { field: 'password', type: 'password', required: true, html: { caption: 'Mật khẩu', attr: 'style="width: 300px"' } }
        ],
        record: {
            username: 'admin',
            password: ''
        },

    });

    w2popup.open({
        //title: 'ĐĂNG NHẬP HỆ THỐNG',
        width: 500,
        height: 250,
        modal: true,
        keyboard: true,    // will close on esc if not modal
        showClose: false,
        showMax: false,
        body: '<div id="main" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;"></div>',
        onOpen: function (event) {
            event.onComplete = function () {
                sessionStorage['w2popup.close'] = '';

                $('#w2ui-popup #main').w2render('layout_login');
                w2ui['layout_login'].content('top', toolbar_top_login);
                w2ui['layout_login'].content('main', form_login);
            }
        }
    });


    //$().w2popup('open', {
    //    title: 'Đăng nhập hệ thống',
    //    body: '<div id="form" style="width: 100%; height: 100%;"></div>',
    //    style: 'padding: 0px 0px 0px 0px',
    //    width: 500,
    //    height: 250,
    //    showMax: false,
    //    onToggle: function (event) {
    //        $(w2ui['form_login'].box).hide();
    //        event.onComplete = function () {
    //            $(w2ui['form_login'].box).show();
    //            w2ui['form_login'].resize();
    //        }
    //    },
    //    onOpen: function (event) {
    //        event.onComplete = function () {
    //            // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, 
    //            // which would make this code execute too early and hence not deliver.
    //            $('#w2ui-popup #form').w2render('form_login');
    //        }
    //    }
    //});

}
//f_page_login();


function f_scroll_page_left() {
    var e = $('#layout_layout_page_panel_left').find('.w2ui-sidebar-div');
    
    console.log(e.length);

    if (e.length > 0) {
        $('#layout_layout_page_panel_left .w2ui-panel-content').show();
        $('.w2ui-sidebar-div').jScrollPane();
    } else {
        setTimeout(function () {
            f_scroll_page_left();
        }, 50);
    }
}


function f_page_dashboard() {

    var layout_page = {
        name: 'layout_page',
        padding: 0,
        panels: [
            {
                type: 'top', size: 30, resizable: false, hidden: false,
                content: 'top', overflow: 'hidden', style: 'background-color: #fafafa;border:none;',
                toolbar: {
                    name: 'toolbar_top',
                    style: 'padding:0px;border:none;',
                    items: [
                        {
                            type: 'html', id: 'nav_item_logo',
                            html: '<div class="nav_item_logo"><img src="/w2ui/user.jpg"/></div><div class="nav_item_logo_space"></div>'
                        },
                        {
                            type: 'menu', id: 'item2', caption: '<b>IFC</b>', count: 17, items: [
                              { text: 'Thông tin tài khoản', icon: 'mdi mdi-account', },
                              { text: 'Đổi mật khẩu', icon: 'mdi mdi-lock' },
                              { text: 'Cấu hình', icon: 'mdi mdi-settings' }
                            ]
                        },
                        { type: 'spacer' },
                        { type: 'radio', id: 'item3', group: '1', caption: 'task 1', icon: 'mdi mdi-file-outline', checked: true },
                        { type: 'radio', id: 'item4', group: '1', caption: 'task 2', icon: 'mdi mdi-file-outline' },
                        { type: 'break', id: 'break1' },
                        {
                            type: 'html', id: 'nav_item_notification',
                            html: '<div class="nav_item_notification">' +
                                  ' <ul>' +
                                  '     <li class="mdi mdi-bell"><span>5</span></li>' +
                                  '     <li class="mdi mdi-email"><span>5</span></li>' +
                                  '     <li class="mdi mdi-history"><span>5</span></li>' +
                                  ' </ul>' +
                                  '</div>'
                        }
                    ]
                }
            }
            , {
                type: 'left', size: 225, resizable: true, minSize: 0, hidden: false,
                toolbar: {
                    name: 'toolbar_left',
                    style: 'padding:0px;border:none;border-bottom: 1px solid silver;',
                    items: [
                        {
                            type: 'menu', id: 'toolbar_leftitemff1', caption: '<span class="mdi16 mdi-menu"></span>', items: [
                              { text: 'Chức năng (API)', icon: 'mdi mdi-codepen' },
                              { text: 'Kết nối, truy cập', icon: 'mdi mdi-access-point-network' },
                              { text: 'Cơ sở dữ liệu', icon: 'mdi mdi-database' },
                              { text: 'Tài khoản', icon: 'mdi mdi-account-key' },
                              { text: 'Hệ thống khách hàng', icon: 'mdi mdi-monitor' }
                            ]
                        },
                        { type: 'radio', id: 'toolbar_leftitemff2', group: '1', caption: 'Điện lực', checked: true },
                        { type: 'radio', id: 'toolbar_leftitemff3', group: '1', caption: 'Trạm' },
                        { type: 'radio', id: 'toolbar_leftitemff4', group: '1', caption: 'Nhóm' },
                        { type: 'spacer' },
                        {
                            type: 'html', id: 'panel_left_bar',
                            html: '<div id="panel_left_bar"><span class="ib_toggle mdi24 mdi-menu-left" onclick="f_panel_left_toggle()"></span></div>'
                        }
                    ]
                }
            }
            , {
                type: 'main', overflow: 'hidden'
                , style: 'background-color: white; border: 1px solid silver; border-top: 0px; padding: 0px;'
                , tabs: {
                    active: 'tab0',
                    tabs: [
                        { id: 'tab0', caption: 'tab0', hidden: false },
                        { id: 'tab1', caption: 'tab1', hidden: true }
                    ],
                    onClick: function (event) {
                        //w2ui.layout.html('main', 'Active tab: ' + event.target);
                    },
                    onClose: function (event) {
                        this.click('tab0');
                    }
                }
            }
            , { type: 'preview', size: '10%', resizable: true, hidden: false, content: 'preview' }
            , {
                type: 'bottom', size: 20, resizable: false, hidden: false,
                content: '<span class=fs12>©<span> <span class=fs11>IFC company<span>', overflow: 'hidden',
                style: 'background-color: #EEEEEE;text-align: center;display: block;top: 0px; padding-top: 1px;font-family: arial;color: #666;'
            }
        ]
        , onShow: function (event) {
            console.log('onShow(): object ' + event.panel + ' is shown');
        }
        , onRender: function (event) {
            //console.log('object ' + this.name + ' is rendered. 1 lần duy nhất khi trang vừa tải về');
        }
    };

    $('#page_main').w2layout(layout_page);

    //---------------------------------------------------------------------------------------------

    var sidebar_left = {
        name: 'sidebar_left',
        //topHTML: '<div id="panel_left_bar"><span class="ib_toggle mdi24 mdi-menu-left" onclick="f_panel_left_toggle()"></span></div>',
        bottomHTML: '<div style="background-color: #eee; padding: 10px 5px; border-top: 1px solid silver"></div>',
        nodes: [
            {
                id: 'level-1', text: 'Level 1', img: 'icon-folder', expanded: true, group: true,
                nodes: [{ id: 'grid1', text: 'Grid 1', icon: 'mdi mdi-home' },
                         { id: 'grid2', text: 'Grid 2', icon: 'mdi mdi-table' },
                         { id: 'grid3', text: 'Grid 3', icon: 'mdi mdi-table' },
                         { id: 'grid4', text: 'Grid 4', icon: 'mdi mdi-table-edit' },
                         { id: 'html', text: 'HTML', icon: 'mdi mdi-comment-account' }
                ]
            },
            {
                id: 'level-2', text: 'Level 2', img: 'icon-folder', expanded: true, group: false,
                nodes: [
                    {
                        id: 'level-2-1', text: 'Level 2.1', img: 'icon-folder', count: 3,
                        nodes: [
                                    { id: 'level-2-1-1', text: 'Level 2.1.1', icon: 'mdi mdi-monitor' },
                                    { id: 'level-2-1-2', text: 'Level 2.1.2', icon: 'mdi mdi-monitor', count: 67 },
                                    { id: 'level-2-1-3', text: 'Level 2.1.3', icon: 'mdi mdi-monitor' }
                        ]
                    },
                    { id: 'level-2-2', text: 'Level 2.2', icon: 'mdi mdi-monitor' },
                    { id: 'level-2-3', text: 'Level 2.3', icon: 'mdi mdi-monitor' }
                ]
            },
            {
                id: 'level-3', text: 'Level 3', img: 'icon-folder', expanded: true, group: false,
                nodes: [{ id: 'level-3-1', text: 'Level 3.1', icon: 'mdi mdi-file' },
                         { id: 'level-3-2', text: 'Level 3.2', icon: 'mdi mdi-file' },
                         { id: 'level-3-3', text: 'Level 3.3', icon: 'mdi mdi-file' }
                ]
            },
            {
                id: 'level-4', text: 'Level 4', img: 'icon-folder', expanded: true, group: false,
                nodes: [{ id: 'level-4-1', text: 'Level 4.1', icon: 'mdi mdi-file' },
                         { id: 'level-4-2', text: 'Level 4.2', icon: 'mdi mdi-file' },
                         { id: 'level-4-3', text: 'Level 4.3', icon: 'mdi mdi-file' }
                ]
            },
            {
                id: 'level-5', text: 'Level 5', img: 'icon-folder', expanded: true, group: false,
                nodes: [{ id: 'level-5-1', text: 'Level 5.1', icon: 'mdi mdi-file' },
                         { id: 'level-5-2', text: 'Level 5.2', icon: 'mdi mdi-file' },
                         { id: 'level-5-3', text: 'Level 5.3', icon: 'mdi mdi-file' }
                ]
            }
        ],
        onClick: function (event) {
            switch (event.target) {
                case 'grid1':
                    w2ui.layout.content('main', w2ui.grid1);
                    break;
                case 'grid2':
                    w2ui.layout.content('main', w2ui.grid2);
                    break;
                case 'grid3':
                    w2ui.layout.content('main', w2ui.grid3);
                    break;
                case 'grid4':
                    w2ui.layout.content('main', w2ui.grid4);
                    break;
                case 'html':
                    w2ui.layout.content('main', '<div style="padding: 10px">Some HTML</div>');
                    $(w2ui.layout.el('main'))
                        .removeClass('w2ui-grid')
                        .css({
                            'border-left': '1px solid silver'
                        });
                    break;
                default:
                    //add dynamic tab x
                    var tabs = w2ui.layout_main_tabs;
                    if (tabs.get(event.target)) {
                        tabs.select(event.target);
                        //w2ui.layout.html('main', 'Tab Selected');
                    } else {
                        tabs.add({ id: event.target, caption: 'Tab ' + event.target, closable: true });
                        //w2ui.layout.html('main', 'New tab added');
                    }
                    break;
            }
        }
    };

    w2ui['layout_page'].content('left', $().w2sidebar(sidebar_left));
    f_scroll_page_left();

    //---------------------------------------------------------------------------------------------

    $().w2layout({
        name: 'layout_main',
        panels: [
            { type: 'top', resizable: true, style: 'background-color: #fff; border: none; padding: 0px;', content: 'top' },
            { type: 'left', size: '30%', resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'left' },
            { type: 'main', content: 'main', style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;' },
            { type: 'preview', size: '10%', resizable: true, hidden: false, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'preview' },
            { type: 'right', size: '30%', resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'right' },
            { type: 'bottom', size: 40, resizable: true, hidden: false, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'bottom' }
        ]
    });

    w2ui['layout_page'].content('main', w2ui['layout_main']);

    //---------------------------------------------------------------------------------------------
    

    w2ui['layout_main'].set('top', { size: '33%' });
    w2ui['layout_main'].set('main', { size: '34%' });
    w2ui['layout_main'].set('bottom', { size: '33%' });

    w2ui['layout_main'].set('left', { size: '33%' });
    w2ui['layout_main'].set('right', { size: '33%' });

    w2ui['layout_main'].set('preview', { hidden: true });
    w2ui['layout_page'].set('preview', { hidden: true });
}
f_page_dashboard();




function get_all_link() {
    var s_link = '';
    var list_a = new Array();
    var list_href = new Array();
    var imgs = document.getElementsByTagName('img');
    for (var i = 0, n = imgs.length; i < n; i++) {
        var im = imgs[i];
        var pa = im.parentElement;
        if (pa.tagName == 'A') {
            var href = pa.innerText;
            if (href.indexOf('http:') == -1) { if (href.indexOf('/') == 0) { href = 'http://vnexpress.net' + href; } else { href = 'http://vnexpress.net/' + href; } }
            href = href.split('?')[0].split('#')[0];
            list_a.push(pa.text.trim() + '#' + href + '#' + im.src);
            list_href.push(pa.href);
        }
    }
    var b = document.getElementsByTagName('a');
    for (var k = 0; k < b.length; k++) {
        var bi = b[k]; var tit = bi.text.trim(); var href = bi.getAttribute('href');
        if (tit != '' && href != null && href.indexOf('javascript:') == -1) {
            var tit_len = tit.split(' ').length;
            if (tit_len > 4) {
                if (href.indexOf('http:') == -1) { if (href.indexOf('/') == 0) { href = 'http://vnexpress.net' + href; } else { href = 'http://vnexpress.net/' + href; } }
                href = href.split('?')[0].split('#')[0];
                if (list_href.indexOf(href) == -1) { list_a.push(tit + '#' + href + '#'); list_href.push(href); }
            }
        }
    }
    if (list_a.length > 0) { s_link = list_a.join('\n^'); }
    JSInterface.getText(s_link);
};























function f_page_main() {
    var layout_page = {
        name: 'layout_page',
        padding: 0,
        panels: [
            {
                type: 'top', size: 30, resizable: false, hidden: false,
                content: 'top', overflow: 'hidden', style: 'background-color: #fafafa;border:none;',
                toolbar: {
                    name: 'toolbar_top',
                    style: 'padding:0px;border:none;',
                    items: [
                        {
                            type: 'html', id: 'nav_item_logo',
                            html: '<div class="nav_item_logo"><img src="/w2ui/user.jpg"/></div><div class="nav_item_logo_space"></div>'
                        },
                        {
                            type: 'menu', id: 'item2', caption: '<b>IFC</b>', count: 17, items: [
                              { text: 'Thông tin tài khoản', icon: 'mdi mdi-account', },
                              { text: 'Đổi mật khẩu', icon: 'mdi mdi-lock' },
                              { text: 'Cấu hình', icon: 'mdi mdi-settings' }
                            ]
                        },
                        { type: 'spacer' },
                        { type: 'radio', id: 'item3', group: '1', caption: 'task 1', icon: 'mdi mdi-file-outline', checked: true },
                        { type: 'radio', id: 'item4', group: '1', caption: 'task 2', icon: 'mdi mdi-file-outline' },
                        { type: 'break', id: 'break1' },
                        {
                            type: 'html', id: 'nav_item_notification',
                            html: '<div class="nav_item_notification">' +
                                  ' <ul>' +
                                  '     <li class="mdi mdi-bell"><span>5</span></li>' +
                                  '     <li class="mdi mdi-email"><span>5</span></li>' +
                                  '     <li class="mdi mdi-history"><span>5</span></li>' +
                                  ' </ul>' +
                                  '</div>'
                        }
                    ]
                }
            }
            , {
                type: 'left', size: 225, resizable: true, minSize: 0, hidden: false,
                toolbar: {
                    name: 'toolbar_left',
                    style: 'padding:0px;border:none;border-bottom: 1px solid silver;',
                    items: [
                        {
                            type: 'menu', id: 'toolbar_leftitemff1', caption: '<span class="mdi16 mdi-menu"></span>', items: [
                              { text: 'Chức năng (API)', icon: 'mdi mdi-codepen' },
                              { text: 'Kết nối, truy cập', icon: 'mdi mdi-access-point-network' },
                              { text: 'Cơ sở dữ liệu', icon: 'mdi mdi-database' },
                              { text: 'Tài khoản', icon: 'mdi mdi-account-key' },
                              { text: 'Hệ thống khách hàng', icon: 'mdi mdi-monitor' }
                            ]
                        },
                        { type: 'radio', id: 'toolbar_leftitemff2', group: '1', caption: 'Điện lực', checked: true },
                        { type: 'radio', id: 'toolbar_leftitemff3', group: '1', caption: 'Trạm' },
                        { type: 'radio', id: 'toolbar_leftitemff4', group: '1', caption: 'Nhóm' },
                        { type: 'spacer' },
                        {
                            type: 'html', id: 'panel_left_bar',
                            html: '<div id="panel_left_bar"><span class="ib_toggle mdi24 mdi-menu-left" onclick="f_panel_left_toggle()"></span></div>'
                        }
                    ]
                }
            }
            , {
                type: 'main', overflow: 'hidden'
                , style: 'background-color: white; border: 1px solid silver; border-top: 0px; padding: 0px;'
                , tabs: {
                    active: 'tab0',
                    tabs: [
                        { id: 'tab0', caption: 'tab0', hidden: false },
                        { id: 'tab1', caption: 'tab1', hidden: true }
                    ],
                    onClick: function (event) {
                        //w2ui.layout.html('main', 'Active tab: ' + event.target);
                    },
                    onClose: function (event) {
                        this.click('tab0');
                    }
                }
            }
            , { type: 'preview', size: '10%', resizable: true, hidden: false, content: 'preview' }
            , {
                type: 'bottom', size: 20, resizable: false, hidden: false,
                content: '<span class=fs12>©<span> <span class=fs11>IFC company<span>', overflow: 'hidden',
                style: 'background-color: #EEEEEE;text-align: center;display: block;top: 0px; padding-top: 1px;font-family: arial;color: #666;'
            }
        ]
        , onShow: function (event) {
            console.log('onShow(): object ' + event.panel + ' is shown');
        }
        , onRender: function (event) {
            //console.log('object ' + this.name + ' is rendered. 1 lần duy nhất khi trang vừa tải về');
        }
    };
     
    $('#page_main').w2layout(layout_page);


    

    //---------------------------------------------------------------------------------------------

    var sidebar_left = {
        name: 'sidebar_left',
        //topHTML: '<div id="panel_left_bar"><span class="ib_toggle mdi24 mdi-menu-left" onclick="f_panel_left_toggle()"></span></div>',
        bottomHTML: '<div style="background-color: #eee; padding: 10px 5px; border-top: 1px solid silver"></div>',
        nodes: [
            {
                id: 'level-1', text: 'Level 1', img: 'icon-folder', expanded: true, group: true,
                nodes: [{ id: 'grid1', text: 'Grid 1', icon: 'mdi mdi-home' },
                         { id: 'grid2', text: 'Grid 2', icon: 'mdi mdi-table' },
                         { id: 'grid3', text: 'Grid 3', icon: 'mdi mdi-table' },
                         { id: 'grid4', text: 'Grid 4', icon: 'mdi mdi-table-edit' },
                         { id: 'html', text: 'HTML', icon: 'mdi mdi-comment-account' }
                ]
            },
            {
                id: 'level-2', text: 'Level 2', img: 'icon-folder', expanded: true, group: false,
                nodes: [
                    {
                        id: 'level-2-1', text: 'Level 2.1', img: 'icon-folder', count: 3,
                        nodes: [
                                    { id: 'level-2-1-1', text: 'Level 2.1.1', icon: 'mdi mdi-monitor' },
                                    { id: 'level-2-1-2', text: 'Level 2.1.2', icon: 'mdi mdi-monitor', count: 67 },
                                    { id: 'level-2-1-3', text: 'Level 2.1.3', icon: 'mdi mdi-monitor' }
                        ]
                    },
                    { id: 'level-2-2', text: 'Level 2.2', icon: 'mdi mdi-monitor' },
                    { id: 'level-2-3', text: 'Level 2.3', icon: 'mdi mdi-monitor' }
                ]
            },
            {
                id: 'level-3', text: 'Level 3', img: 'icon-folder', expanded: true, group: false,
                nodes: [{ id: 'level-3-1', text: 'Level 3.1', icon: 'mdi mdi-file' },
                         { id: 'level-3-2', text: 'Level 3.2', icon: 'mdi mdi-file' },
                         { id: 'level-3-3', text: 'Level 3.3', icon: 'mdi mdi-file' }
                ]
            },
            {
                id: 'level-4', text: 'Level 4', img: 'icon-folder', expanded: true, group: false,
                nodes: [{ id: 'level-4-1', text: 'Level 4.1', icon: 'mdi mdi-file' },
                         { id: 'level-4-2', text: 'Level 4.2', icon: 'mdi mdi-file' },
                         { id: 'level-4-3', text: 'Level 4.3', icon: 'mdi mdi-file' }
                ]
            },
            {
                id: 'level-5', text: 'Level 5', img: 'icon-folder', expanded: true, group: false,
                nodes: [{ id: 'level-5-1', text: 'Level 5.1', icon: 'mdi mdi-file' },
                         { id: 'level-5-2', text: 'Level 5.2', icon: 'mdi mdi-file' },
                         { id: 'level-5-3', text: 'Level 5.3', icon: 'mdi mdi-file' }
                ]
            }
        ],
        onClick: function (event) {
            switch (event.target) {
                case 'grid1':
                    w2ui.layout.content('main', w2ui.grid1);
                    break;
                case 'grid2':
                    w2ui.layout.content('main', w2ui.grid2);
                    break;
                case 'grid3':
                    w2ui.layout.content('main', w2ui.grid3);
                    break;
                case 'grid4':
                    w2ui.layout.content('main', w2ui.grid4);
                    break;
                case 'html':
                    w2ui.layout.content('main', '<div style="padding: 10px">Some HTML</div>');
                    $(w2ui.layout.el('main'))
                        .removeClass('w2ui-grid')
                        .css({
                            'border-left': '1px solid silver'
                        });
                    break;
                default:
                    //add dynamic tab x
                    var tabs = w2ui.layout_main_tabs;
                    if (tabs.get(event.target)) {
                        tabs.select(event.target);
                        //w2ui.layout.html('main', 'Tab Selected');
                    } else {
                        tabs.add({ id: event.target, caption: 'Tab ' + event.target, closable: true });
                        //w2ui.layout.html('main', 'New tab added');
                    }
                    break;
            }
        }
    };

    w2ui['layout_page'].content('left', $().w2sidebar(sidebar_left));
    f_scroll_page_left();
    //---------------------------------------------------------------------------------------------

    // in memory initialization
    $().w2grid(config.grid2);
    $().w2grid(config.grid3);
    $().w2grid(config.grid4);

    //---------------------------------------------------------------------------------------------


    $().w2layout({
        name: 'layout_main',
        panels: [
            { type: 'top', resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'top' },
            { type: 'left', size: '30%', resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'left' },
            { type: 'main', content: 'main', style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;' },
            { type: 'preview', size: '10%', resizable: true, hidden: false, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'preview' },
            { type: 'right', size: '30%', resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'right' },
            { type: 'bottom', size: 40, resizable: true, hidden: false, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'bottom' }
        ]
    });

    w2ui['layout_page'].content('main', w2ui['layout_main']);

    $().w2layout({
        name: 'layout_top',
        panels: [
            { type: 'top', size: 40, resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'top1' },
            //{ type: 'main', style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'top2' },
            //{ type: 'preview', size: '50%', resizable: true, hidden: false, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'top3' },
            { type: 'bottom',  resizable: true, hidden: false, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'top4' }
        ]
    });
    w2ui['layout_main'].content('top', w2ui['layout_top']);
    //---------------------------------------------------------------------------------------------
}
//f_page_main();


function f_page_module_config() {


    // initialization

    $().w2layout({
        name: 'layout2',
        panels: [
            { type: 'top', size: 40, resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'top' },
            { type: 'left', size: '30%', resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'left' },
            { type: 'main', content: 'main', style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;' },
            { type: 'preview', size: '10%', resizable: true, hidden: false, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'preview' },
            { type: 'right', size: '30%', resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'right' },
            { type: 'bottom', size: 40, resizable: true, hidden: false, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'bottom' }
        ]
    });

    w2ui['layout'].content('main', w2ui['layout2']);

    w2ui['layout2'].content('left', $().w2grid(config.grid1));
    w2ui['layout2'].content('right', $().w2grid(config.grid2));

    $().w2layout({
        name: 'layout_top',
        panels: [
            { type: 'top', size: 40, resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'top1' },
            { type: 'main', style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'top2' },
            { type: 'preview', size: '50%', resizable: true, hidden: false, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'top3' },
            { type: 'bottom', size: 40, resizable: true, hidden: false, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;', content: 'top4' }
        ]
    });
    w2ui['layout2'].content('top', w2ui['layout_top']);


    var f_login = $().w2form({
        name: 'form',
        header: 'ĐĂNG NHẬP HỆ THỐNG',
        url: 'server/post',
        fields: [
            { field: 'username', type: 'text', required: true, html: { caption: 'Tài khoản', attr: 'style="width: 300px"' } },
            { field: 'password', type: 'password', required: true, html: { caption: 'Mật khẩu', attr: 'style="width: 300px"' } }
        ],
        record: {
            username: 'admin',
            password: '123'
        },
        actions: {
            reset: function () {
                w2ui['layout'].get('main').tabs.show('tab0');
                w2ui['layout'].set('preview', { hidden: true, minSize: 100 });

                w2ui['layout'].content('main', $().w2grid(config.grid1));




                //this.clear();
            },
            save: function () {
                var obj = this;
                this.save({}, function (data) {
                    //if (data.status == 'error') {
                    //    console.log('ERROR: ' + data.username);
                    //    return;
                    //}
                    //obj.clear(); 
                });
            }
        }//end action
    });

    //w2ui['layout'].content('main', f_login);
    //w2ui['layout'].show('preview');


    //w2ui.tabs.hide('tab2');

    //w2ui['layout'].content('main', $().w2grid(config.grid1));



    //w2ui['layout'].content('left', $().w2sidebar(config.sidebar));
    //f_scroll();
    //w2ui['layout'].content('main', $().w2grid(config.grid1));



    //w2ui['layout'].show('right');


    //w2ui.layout.content('left', $().w2sidebar(config.sidebar));
    //w2ui.layout.content('main', $().w2grid(config.grid1));

}









