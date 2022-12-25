var c = document.getElementById("life");
var start_ = document.getElementById("start");
var next_ = document.getElementById("next");
var pause_ = document.getElementById("pause");
var ctx = c.getContext("2d");

var cell_size = 10;
num_rows = c.height / cell_size;
var idx = 2 ;

/*
num_rows = c.height / cell_size;
num_cols = c.width / cell_size;
for (var idx = 0 ; idx < num_rows; ++idx){
    ctx.moveTo(0, idx * cell_size);
    ctx.lineTo(c.width, idx * cell_size);
    ctx.lineWidth = 0.25;
    ctx.stroke();
}
for (var idx = 0 ; idx < num_rows; ++idx){
    ctx.moveTo(idx * cell_size, 0 );
    ctx.lineTo(idx * cell_size, c.width);
    ctx.lineWidth = 0.25;
    ctx.stroke();
}

*/


class Life{
    constructor(c){
        this.canvas = c;
        this.positions = c.getBoundingClientRect();
        this.ctx = c.getContext('2d');
        this.cell_size = 10;
        this.dead_color = "#FFFFFF";
        this.alive_color = "#0000FF";
        this.n_cell_per_row = Math.floor(c.width / this.cell_size);
        this.array = Array.from(Array(this.n_cell_per_row), () => new Array(this.n_cell_per_row))
        this.top_right = [200, 100];
        this.bottom_left = [800, 700];
        
    }
    fillBox(x, y){
        
        let col = Math.floor( (x - 200) / 10);
        let row = Math.floor( ( y - 100) / 10);
        this.array[row][col] = 1 - this.array[row][col];
        if (this.array[row][col] == 1){
            ctx.fillStyle = this.alive_color;
            ctx.fillRect( col * 10, row * 10, 10, 10);
        }
        if (this.array[row][col] == 0){
            ctx.fillStyle = this.dead_color;
            ctx.fillRect( col * 10, row * 10, 10, 10);
        }
        
    }
    
    condition(i, j){
        let c1 = i < this.n_cell_per_row;
        let c2 = i >=0;
        let c3 = j < this.n_cell_per_row;
        let c4 = j >=0;
        return c1 * c2 * c3 * c4
    }

    numNeighbours(x, y){
    

        let num = 0;
        for (var i = -1 ; i<2; i++){
            for (var j = -1; j<2; j++){
                if (this.condition( x+i, y+j)){
                    num += this.array[x+i][y+j]
                }
            }
        }
        return num - this.array[x][y]
    }


    nextState(){
        let state = Array.from(Array(this.n_cell_per_row), () => new Array(this.n_cell_per_row))
        state = this.init_state(state);
        for (var i = 0; i< this.n_cell_per_row; i++){
            for (var j=0;j<this.n_cell_per_row; j++){
                let neighbourNum = this.numNeighbours(i, j)
                if (this.array[i][j] == 1){

                    if (neighbourNum == 0 || neighbourNum==1){
                        state[i][j] = 0;
                    } else if(neighbourNum == 2 || neighbourNum == 3){
                        state[i][j] = 1;
                    } else if( neighbourNum > 3){
                        state[i][j] = 0;
                    }
                }else if ( (this.array[i][j] == 0) && (neighbourNum == 3)){
                    state[i][j] =1;
                    
                }
            }
        }
        return state;
    }

    drawBoard(){
        this.array = this.nextState()
        ctx.clearRect(0, 0, this.canvas.height, this.canvas.width)
        for (var i=0;i<this.n_cell_per_row;i++){
            for (var j=0;j< this.n_cell_per_row;j++){
            
                if (this.array[i][j]==1){
                    ctx.fillStyle = this.alive_color;
                    ctx.fillRect( j * 10, i * 10, 10, 10)
                }
            }
        }
        

    }

    init_state(state) {
        
        for (var i=0;i<this.n_cell_per_row;i++){
            for (var j=0;j< this.n_cell_per_row;j++){
                state[i][j] = 0 ;
            }
        }
        return state
        
    }
}

L = new Life(c);
L.array = L.init_state(L.array);

function get_cords(e){
    x = e.clientX;
    y = e.clientY;
    if (x>200 && y >100){
    L.fillBox(x, y);}
}


let play = 0;
let next = 0;
function run(){
        setInterval(() => {
            if (play == 1){
                L.drawBoard();
            }
            if (next ==1){
                L.drawBoard();
                next = 0 ;
            }
        }, 200)
}

run();
start_.addEventListener("click", function ch(){play = 1;})
pause_.addEventListener("click", function ch(){play = 0;})
next_.addEventListener("click", function ch(){next = 1;})


document.addEventListener('click', get_cords);
//document.addEventListener('mousemove', draw);
//document.addEventListener('mousedown', setPosition);
//document.addEventListener('mouseenter', setPosition);


