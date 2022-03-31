var grid_status=false;
var tool = 0;
var isdrawing=false;

// UI pixel control

let canvas_range = document.getElementById('canvas_range');
let size_span= document.getElementById('size-holder');

canvas_range.addEventListener('input',function(){
    size_span.innerText= `${canvas_range.value} * ${canvas_range.value}`;
})
canvas_range.addEventListener('change',function(){
    Canvas_Creation();
})

//canvas creation +

let bg_color = document.getElementById('bg_color_selector');
let canvas = document.querySelector('.Canvas');

//if there is no canvas (first run) create one:
if (canvas.children.length==0){
    Canvas_Creation();
}

function Canvas_Creation(){
    canvas.innerHTML='';
    let canvas_size = canvas_range.value;
    for(let i=0 ; i<(canvas_size**2) ; i++){
        //create pixels
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.classList.add('bg-pixel');
        //grid canvas
        canvas.style.gridTemplateColumns = `repeat(${canvas_size},1fr`;
        canvas.style.gridTemplateRows = `repeat(${canvas_size}, 1fr`;
        
        pixel.setAttribute('draggable', 'false');
        //paint pixels
        pixel.style.backgroundColor = bg_color.value;
        //brightness attr
        pixel.setAttribute('rate','100');
        //add action func
        pixel.addEventListener('mousemove',action);
        pixel.addEventListener('click',action);
        pixel.addEventListener('mousedown',function(){
            isdrawing=true;
        })
        document.addEventListener('mouseup',function(){
            isdrawing=false;
        })
        //put pixels in canvas
        canvas.appendChild(pixel);
        
    }  
    grid_liner();
}

//change background color

bg_color.addEventListener('input',function(){
let bg_pixels = document.getElementsByClassName('bg-pixel');
for(let i=0; i<bg_pixels.length; i++){
    bg_pixels[i].style.backgroundColor = bg_color.value;
}
})

//clear button +
let clear_canvas = document.getElementById('clear_canvas');

clear_canvas.addEventListener('click',function(){
    Canvas_Creation();
})

//grid lines button+
let grid_lines = document.getElementById('grid_lines');

grid_lines.addEventListener('click',function(){
    grid_lines.classList.toggle('active_btn');
    grid_status= grid_lines.classList.contains('active_btn');
    grid_liner();
})

//grid lines draw func +

function grid_liner(){

    let pixels = document.getElementsByClassName('pixel');
    if(grid_status==true){
        for(let i =0 ; i< pixels.length; i++){
            pixels[i].classList.add('bordered');
        }
    }else{
        for(let i =0 ; i< pixels.length; i++){
        pixels[i].classList.remove('bordered');
    }
}
}

let pen_color = document.getElementById('pen_color_selector');
let pixels = document.getElementsByClassName('pixel');

//pen tool:0
let btn_pen = document.getElementById('pen');
//eraser tool:1
let btn_eraser = document.getElementById('eraser');
//rainbow tool:2
let pen_rainbow = document.getElementById('pen_rainbow');
//rainbow tool:3
let color_picker = document.getElementById('color_picker');
//rainbow tool:4
let shader = document.getElementById('shader');
//rainbow tool:5
let lighten = document.getElementById('lighten');


//button events:
btn_pen.addEventListener('click',function(){
    tool_status(0);
})
btn_eraser.addEventListener('click',function(){
    tool_status(1);
})
pen_rainbow.addEventListener('click',function(){
    tool_status(2);
})
color_picker.addEventListener('click',function(){
    tool_status(3);
})
shader.addEventListener('click',function(){
    tool_status(4);
})
lighten.addEventListener('click',function(){
    tool_status(5);
})



//CORE: this function toggles active for selected button and sets tool variable
function tool_status(x){
    //remove other active
    let btn_toggle = document.getElementsByClassName('toggle');
    for(let i = 0; i < btn_toggle.length;i++){
        if(btn_toggle[i].classList.contains('active_btn')){
            btn_toggle[i].classList.remove('active_btn')
        } 
    }
    //acive this then set tool variable
    btn_toggle[x].classList.add('active_btn');
        tool=x;
}


//action func
function action(){
    if(isdrawing==true){
        //pen
        if(tool==0){
            this.style.backgroundColor=pen_color.value;
            pixel_add(this);
        }
        //eraser
        if(tool==1){
            this.style.backgroundColor=bg_color.value;
            pixel_remove(this);
        }
        //rainbow
        if(tool==2){
            rnd_color= `hsl(${(Math.random())*360}, 90%, 50%)`
            this.style.backgroundColor=rnd_color;
            pixel_add(this);
        }
        //color picker
        //all the stuff i went through to convert colors :(
        //there should be a better way.
        if(tool==3){
            let color_value =this.style.backgroundColor;
            var color_codes = color_value.match(/\d+/g);
            for(let i = 0; i<3;i++){
                color_codes[i+3] = (parseInt(color_codes[i],10)).toString(16);
                if(color_codes[i]<16){
                    color_codes[i+3] = '0'+ color_codes[i+3];
                }
            }            
            pen_color.value =`#${color_codes[3]}${color_codes[4]}${color_codes[5]}`;
            tool_status(0);
        }
        //shader
        if(tool==4){
            let rate=parseInt(this.getAttribute('rate'));
            rate-=2;
            this.style.filter=`brightness(${rate}%)`;
            this.setAttribute('rate',rate);
        }
        //lighten
        if(tool==5){
            let rate=parseInt(this.getAttribute('rate'));
            rate+=2;
            this.style.filter=`brightness(${rate}%)`;
            this.setAttribute('rate',rate);
        }
    }

}


//pixel class check for above function
function pixel_add(item){
    if(item.classList.contains('bg-pixel')){
        item.classList.remove('bg-pixel');
        item.classList.add('ink-pixel');
    }
}
function pixel_remove(item){
    if(item.classList.contains('ink-pixel')){
        item.classList.remove('ink-pixel');
        item.classList.add('bg-pixel');
    }
}













