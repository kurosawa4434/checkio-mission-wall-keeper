//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        function wallKeeperCanvas( dom, dataInp, user_answer, result) {
            // draw grid
            const cell_size = 40,
                font_size = 15,
                paper_width = 211;
                paper_height = 211;
                [zx, zy] = [10, 10];
                color = {
                    dark: "#294270",
                    light: [
                        "#8FC7ED",
                        "#FABA00",
                    ],
                },
                attr = {
                    rect: {
                        'stroke': color.dark,
                        'stroke-width': 1
                    },
                    text: {
                        'stroke': color.dark,
                        'font-size': font_size, 
                        'font-family': "Verdana"
                    },
                };

            var paper = Raphael(dom, paper_width, paper_height, 0, 0);
            var cell_set = paper.set();
            for (var i=0; i < 5; i += 1) {
                for (var j=0; j < 5; j += 1) {
                    var light = dataInp.indexOf(i*5+j+1) > -1 ? 1: 0;
                    cell_set.push(
                        paper.rect(zx + j * cell_size,
                            zy + i * cell_size,
                            cell_size,
                            cell_size).attr(attr.rect).attr("fill",
                                color.light[light]
                            )
                    );
                    cell_set[cell_set.length-1].light = light; 
                    // text
                    paper.text(zx + j * cell_size + cell_size / 2,
                        zy + i * cell_size + cell_size / 2,
                        i*5+j+1
                    ).attr(attr.text);
                }
            }

            // click start
            if (! Array.isArray(user_answer)) {
                return
            }
            for (var i=0; i < user_answer.length; i += 1) {
                var ua = user_answer[i];
                if (!(typeof ua === 'number' && ua >= 1 && ua <= 25)) {
                    return
                }
            }
            var phase = 0;
            const delay = 400
            user_answer.forEach(a=>{
                a -= 1;
                setTimeout(function () {
                    var [C, U, D, L, R] = [
                        a > -1 && a < 25 && cell_set[a],
                        a-5 > -1 && cell_set[a-5],
                        a+5 < 25 && cell_set[a+5],
                        (a-1) % 5 < 4 && cell_set[a-1],
                        (a+1) % 5 > 0 && cell_set[a+1]
                    ];
                    return function(){
                        [C, U, D, L, R].forEach(cell=>{
                            if (cell) {
                                cell.light = 1 - cell.light;
                                cell.animate(
                                    {'fill': color.light[cell.light]},
                                    delay);
                            }
                        });
                    };
                }(), delay * phase);

                phase += 1;

            });
        }
        var $tryit;
        var io = new extIO({
            multipleArguments: false,
            functions: {
                js: 'wallKeeper',
                python: 'wall_keeper'
            },
            animation: function($expl, data){
                wallKeeperCanvas(
                    $expl[0],
                    data.in,
                    data.out,
                    data.ext.result
                );
            }
        });
        io.start();
    }
);
