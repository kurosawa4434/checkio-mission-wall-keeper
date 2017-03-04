//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        function wallKeeperCanvas( dom, dataInp, user_answer, result) {
            // draw grid
            var cell_size = 40;
            var font_size = 15
            var paper_width = 211;
            var paper_height = 211;
            // 45, 236
            var [zx, zy] = [10, 10];
            var color = {
                dark: "#294270",
                light: [
                    "#8FC7ED",
                    "#FABA00",
                ],
                orange: [
                    "#FABA00",
                    "#FAB500",
                    "#FAB000",
                    "#FAAC00",
                    "#FAA700",
                    "#FAA200",
                    "#FA9D00",
                    "#FA9900",
                    "#FA9400",
                    "#FA8F00",
                ],
                blue: [
                    "#8FC7ED",
                    "#7FBDE5",
                    "#6FB3DE",
                    "#5FA9D6",
                    "#4F9FCF",
                    "#4094C7",
                    "#308AC0",
                    "#2080B8",
                    "#1076B1",
                    "#006CA9",
                ]
            };
            var attr = {
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
                    var light = dataInp[i].slice(j, j+1)*1;
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
            var phase = 0;
            var delay = 400
            user_answer.forEach(a=>{
                a -= 1;
                setTimeout(function () {
                    var [C, U, D, L, R] = [
                        cell_set[a],
                        a-5 > -1 && cell_set[a-5] && cell_set[a-5],
                        a+5 < 25 && cell_set[a+5] && cell_set[a+5],
                        (a-1) % 5 < 4 && cell_set[a-1] && cell_set[a-1],
                        (a+1) % 5 > 0 && cell_set[a+1] && cell_set[a+1]
                    ];
                    return function(){
                        [C, U, D, L, R].forEach(cell=>{
                            if (cell) {
                                console.log(a);
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
            multipleArguments: true,
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
