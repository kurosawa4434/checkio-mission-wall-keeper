//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        function climbingRouteCanvas(
            dom, dataInp, dataExp, result) {
            var [zx, zy] = [10, 10];
            var cellSize = dataExp.cell_size;
            var fullSizeX = zx * 2 + cellSize * dataInp[0].length;
            var fullSizeY = zy * 2 + cellSize * dataInp.length;
            var color = {
                dark: "#294270",
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
                    'font-size': dataExp.font_size, 
                    'font-family': "Verdana"
                },
            };

            // draw cell & text
            var paper = Raphael(dom, fullSizeX, fullSizeY, 0, 0);
            var cell_dic = paper.set();
            for (var i = 0; i < dataInp.length; i+=1) {
                for (var j = 0; j < dataInp[i].length; j+=1) {
                    var ev = dataInp[i].slice(j, j+1)*1;
                    // cell
                    cell_dic[i*100+j]
                        = paper.rect(zx + j * cellSize,
                            zy + i * cellSize,
                            cellSize,
                            cellSize).attr(attr.rect).attr("fill",
                                color.blue[ev]);
                    // text
                    paper.text(zx + j * cellSize + cellSize / 2,
                        zy + i * cellSize + cellSize / 2,
                        ev
                    ).attr(attr.text);
                }
            }

            // paint route
            var [x, y] = [0, 0];
            var path_dic = {};
            var route = ' ' + dataExp.route;
            for (var i=0; i < route.length; i+=1) {
                var dir = route.slice(i, i+1);
                switch(dir){
                    case 'N': y -= 1; break;
                    case 'S': y += 1; break;
                    case 'W': x -= 1; break;
                    case 'E': x += 1; break; 
                }
                var ev = dataInp[y].slice(x, x+1)*1;
                var co = y*100 + x;
                if (path_dic[co] === undefined){
                    path_dic[co] = 0;
                } else {
                    path_dic[co] += 3;
                }
                setTimeout(function () {
                    var c = co;
                    var e = Math.min(ev + path_dic[co], 9);
                    return function(){
                        cell_dic[c].animate({'fill': color.orange[e]}, 50);
                    };
                }(), 50 * i);
            }
            return false;
        }

        var $tryit;
        var io = new extIO({
            multipleArguments: true,
            functions: {
                js: 'climbingRoute',
                python: 'climbing_route'
            },
            animation: function($expl, data){
                climbingRouteCanvas(
                    $expl[0],
                    data.in[0],
                    data.ext.explanation,
                    data.ext.result
                );
            }
        });
        io.start();
    }
);
