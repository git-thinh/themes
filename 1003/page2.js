
var w2popup_close = false;
//========================================================================


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
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------






var config = {
    layout: {
        name: 'layout_login',
        padding: 0,
        panels: [
            { type: 'top', size: 32, style: 'border-bottom: 1px solid silver;' },
            {
                type: 'left', size: '20%', resizable: true, style: 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 0px;',
                toolbar: {
                    style: 'height:30px;',
                    items: [
                            {
                                type: 'html', id: 'item6',
                                html: '<div style="padding: 0px 0px;">' +
                                      '    <input size="12" placeholder="Input search" style="padding: 2px; border-radius: 2px; border: 1px solid silver"/>' +
                                      '</div>'
                            },
                            { type: 'button', id: 'search', caption: '', icon: 'mdi24 mdi-magnify' },
                    ]
                }
            },
            {
                type: 'main', overflow: 'hidden',
                style: 'padding:3px; background-color: #fff;'
                , tabs: {
                    active: 'tab0',
                    tabs: [
                                { id: 'tab0', caption: 'Design', hidden: false },
                                { id: 'tab1', caption: 'Code', hidden: false }
                    ],
                    onClick: function (event) {
                        //w2ui.layout.html('main', 'Active tab: ' + event.target);
                    },
                    onClose: function (event) {
                        this.click('tab0');
                    }
                }
            },
            { type: 'right', title: 'Properties', size: '20%', resizable: true, style: 'background-color: #ddd; border: 1px solid #dfdfdf; padding: 0px;', content: 'right' },
            { type: 'preview', title: 'Style', size: '30%', resizable: true, style: 'background-color: #ddd; border: 1px solid #dfdfdf; padding: 0px;', content: 'right' },
        ]
    },
    lay_edit_main: {
        name: 'lay_edit_main',
        panels: [
            { type: 'top', resizable: true, style: 'background-color: #fff; border: 1px solid #dfdfdf; padding: 0px;', content: 'top' },
            { type: 'left', size: '30%', resizable: true, style: 'background-color: #fff; border: 1px solid #dfdfdf; padding: 0px;', content: 'left' },
            { type: 'main', content: 'main', style: 'background-color: #fff; border: 1px solid #dfdfdf; padding: 0px;' },
            { type: 'preview', size: '10%', resizable: true, hidden: false, style: 'background-color: #fff; border: 1px solid #dfdfdf; padding: 0px;', content: 'preview' },
            { type: 'right', size: '30%', resizable: true, style: 'background-color: #fff; border: 1px solid #dfdfdf; padding: 0px;', content: 'right' },
            { type: 'bottom', size: 40, resizable: true, hidden: false, style: 'background-color: #fff; border: 1px solid #dfdfdf; padding: 0px;', content: 'bottom' }
        ]
    },
    sidebar: {
        name: 'sidebar',
        nodes: [
            {
                id: 'general', text: 'General', group: true, expanded: true, nodes: [
                  { id: 'grid', text: 'Grid', img: 'icon-page', selected: true },
                  { id: 'html', text: 'Some HTML', img: 'icon-page' }
                ]
            }
        ],
        onClick: function (event) {
            switch (event.target) {
                case 'grid':
                    w2ui.layout.content('main', w2ui.grid);
                    break;
                case 'html':
                    w2ui.layout.content('main', '<div style="padding: 10px">Some HTML</div>');
                    $(w2ui.layout.el('main'))
                        .removeClass('w2ui-grid')
                        .css({
                            'border-left': '1px solid silver'
                        });
                    break;
            }
        }
    },
    toolbar: {
        name: 'toolbar_top_login',
        items: [
            {
                type: 'html', id: 'item6',
                html: '<div style="padding: 3px 10px;text-transform: uppercase;font-weight: bold;">Layout</div>'
            },
            { type: 'break', id: 'break00' },
            { type: 'button', id: 'delete', caption: 'Create new', icon: 'mdi mdi-plus-circle-outline' },
            { type: 'button', id: 'delete', caption: 'delete', icon: 'mdi mdi-close-circle-outline' },
            { type: 'break', id: 'break01' },
            { type: 'button', id: 'undo', caption: 'Undo', icon: 'mdi mdi-undo' },
            { type: 'button', id: 'redo', caption: 'Redo', icon: 'mdi mdi-redo' },
            { type: 'button', id: 'row_add_after', caption: '', icon: 'mdi mdi-table-row-plus-after' },
            { type: 'button', id: 'row_add_before', caption: '', icon: 'mdi mdi-table-row-plus-before' },
            { type: 'button', id: 'row_add_delete', caption: '', icon: 'mdi mdi-table-row-remove' },
            { type: 'button', id: 'col_add_left', caption: '', icon: 'mdi mdi-table-column-plus-before' },
            { type: 'button', id: 'col_add_right', caption: '', icon: 'mdi mdi-table-column-plus-after' },
            { type: 'button', id: 'col_add_delete', caption: '', icon: 'mdi mdi-table-column-remove' },
            { type: 'spacer' },
            { type: 'break', id: 'break0' },
            { type: 'button', id: 'code', caption: 'Code', icon: 'mdi mdi-code-braces' },
            { type: 'button', id: 'preview', caption: 'Preview', icon: 'mdi mdi-eye' },
            { type: 'button', id: 'save', caption: 'Save', icon: 'mdi mdi-floppy' },
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
                    if (w2popup_close == false) {
                        w2confirm(
                            {
                                msg: 'Bạn chắc chắn muốn thoát?',
                                yes_text: 'Đồng ý thoát',
                                yes_class: '',
                                yes_style: '',
                                yes_callBack: function () {
                                    w2popup_close = true;
                                    w2popup.close();
                                },
                                no_text: 'Quay lại',
                                no_class: '',
                                no_style: '',
                                no_callBack: function (btn) {
                                    w2popup_close = false;
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
    },
    grid_properties: {
        name: 'grid_properties',
        columns: [
            {
                field: 'key', caption: 'Name', size: '40%', sortable: true, resizable: true
            },
            {
                field: 'value', caption: 'Value', size: '40%', sortable: true, resizable: true, editable: { type: 'text' }
            },
            {
                field: 'use', caption: 'Use', size: '35px', sortable: true, resizable: true, editable: { type: 'checkbox' }
            },
        ],

        records: [
            { recid: 1, key: 'width', value: '30%', use: true },
            { recid: 2, key: 'height', value: '', use: false },
        ]
    },
    grid_layout: {
        name: 'grid_layout',
        show: {
            footer: true
        },
        columns: [
            {
                field: 'name', caption: 'name', size: '90%', sortable: true, resizable: true, editable: { type: 'text' }
            },
            {
                field: 'use', caption: 'Use', size: '35px', sortable: true, resizable: true, editable: { type: 'checkbox' }
            },
        ],

        records: [
            { recid: 1, name: '3row; row2: 3col', use: true },
            { recid: 2, name: '3row; row123: 3col', use: false },
        ]
    }
}

$(function () {
    // initialization in memory
    $().w2layout(config.layout);
    $().w2sidebar(config.sidebar);
    $().w2toolbar(config.toolbar);
    $().w2grid(config.grid_layout);
    $().w2grid(config.grid_properties);
    $().w2layout(config.lay_edit_main);
});

w2popup.open({
    //title: 'Popup',
    width: 999,
    height: 555,
    modal: true,
    keyboard: false,    // will close on esc if not modal
    showClose: false,
    showMax: false,
    body: '<div id="main" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;"></div>',
    onOpen: function (event) {
        event.onComplete = function () {
            var w2popup_close = false;

            $('#w2ui-popup #main').w2render('layout_login');
            w2ui['layout_login'].content('top', w2ui.toolbar_top_login);
            w2ui['layout_login'].content('left', w2ui.grid_layout);
            w2ui['layout_login'].content('right', w2ui.grid_properties);

            w2ui['layout_login'].content('main', w2ui['lay_edit_main']);
        }
    },
    onToggle: function (event) {
        event.onComplete = function () {
            w2ui.layout.resize();
        }
    }
});


//var hasStorage = (function () {
//    try {
//        localStorage.setItem('mod', '');
//        localStorage.removeItem('mod');
//        return true;
//    }
//    catch (e) {
//        return false;
//    }
//}());
//if (hasStorage) {
//    //alert('has storage');
//}
//else {
//    alert('storage not available');
//}