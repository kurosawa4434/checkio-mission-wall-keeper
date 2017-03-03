//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        var $tryit;
        var io = new extIO({
            multipleArguments: true,
            functions: {
                js: 'wallKeeper',
                python: 'wall_keeper'
            },
        });
        io.start();
    }
);
