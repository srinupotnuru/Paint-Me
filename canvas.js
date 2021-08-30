var canvas=document.getElementById('canvas');
var ctx = canvas.getContext("2d");


ctx.strokeStyle="white";
ctx.lineWidth=2;

var boundget = canvas.getBoundingClientRect();
var borderx = boundget.left;
var bordery = boundget.top;

var rectangles=[];
var colors=["#07090F","#3993DD","#6A3E37","#1C3738","#8338ec","#ff006e","#fb5607","#ffbe0b","#023047","#283618","#5a189a","#78290f"];
var color=0;
var sx,sy,ex,ey;
var arr=[];
var deletex, deletey;
var db=false;
var drag=false;
var flag=false;
var dragIndex;
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight*(0.8);

var rect={
    stx:1,
    sty:2,
    enx:3,
    eny:4,
    clr:"#07090F"
}

function drawall()
{
    
    var len=rectangles.length;
    for(var i=0;i<len;i++)
    {
        var tx=rectangles[i].stx;
        var ty=rectangles[i].sty;
        var bx=rectangles[i].enx;
        var by=rectangles[i].eny;
        
        var width=bx-tx;
        var height=by-ty;
        var cllr=rectangles[i].clr;
        console.log(cllr);
        ctx.fillStyle = cllr;
        ctx.strokeRect(tx, ty, width, height);
        ctx.fillRect(tx, ty, width, height);
    }
    
    
}
function mouseDown(e)
{
    e.preventDefault();
    e.stopPropagation();
    
    sx=parseInt(e.clientX- borderx);
    sy=parseInt(e.clientY-bordery);
    
    var len=rectangles.length;
    for(var i=len-1;i>=0;i--)
    {
        var tx=rectangles[i].stx;
        var ty=rectangles[i].sty;
        var bx=rectangles[i].enx;
        var by=rectangles[i].eny;
        if(sx<=Math.max(tx,bx) && sx>=Math.min(tx,bx) && sy<=Math.max(ty,by) && sy>=Math.min(ty,by) )
        {
                console.log("already rectangel exists at this cordiante");
                drag=true;
                dragIndex=i;
                var obj=rectangles[dragIndex];
                rectangles.splice(dragIndex,1);
                rectangles.push(obj);
                dragIndex=rectangles.length-1;
                break;
        }
    }
    
    flag=true;
}

function mouseUp(e)
{
    e.preventDefault();
    e.stopPropagation();
    var collen=colors.length;
    var width=ex-sx;
    var height=ey-sy;
            if(!(rectangles.includes(rect)) && db==false && drag==false && flag)
            {
            rectangles.push(rect); 
            console.log(rectangles);
            drawall();
            }
            color=(color+1)%collen;
        console.log("db",db,"rect","rectanles");
    
    flag=false;
    drag=false;

    db=false;
}

function mouseMove(e)
{
    e.preventDefault();
    e.stopPropagation();

    if(!flag)
    return ;
    if(drag)
    {
        var cl=rectangles[dragIndex].clr;
        ctx.fillStyle = cl;
        ex=parseInt(e.clientX- borderx);
        ey=parseInt(e.clientY-bordery);

        var newx=ex-sx;
        var newy=ey-sy;

        rectangles[dragIndex].stx=rectangles[dragIndex].stx + newx;
        rectangles[dragIndex].enx=rectangles[dragIndex].enx + newx;
        rectangles[dragIndex].sty=rectangles[dragIndex].sty + newy;
        rectangles[dragIndex].eny=rectangles[dragIndex].eny + newy;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawall();
        sx=ex;
        sy=ey;

    }
    else
    {
        ctx.fillStyle = colors[color];
        ex=parseInt(e.clientX- borderx);
        ey=parseInt(e.clientY-bordery);

        


        ctx.clearRect(0, 0, canvas.width, canvas.height);

        rect={
            stx:sx,
            sty:sy,
            enx:ex,
            eny:ey,
            clr:colors[color]
        }
        drawall();
        
        var width=ex-sx;
        var height=ey-sy;
        ctx.strokeRect(sx, sy, width, height);
        ctx.fillRect(sx,sy,width,height);
    }
    
    
    
    

}



function doubleClicked(e)
{

    db=true;
    flag=false;
    var sx=parseInt(e.clientX- borderx);
    var sy=parseInt(e.clientY-bordery);
    deletex=sx;
    deletey=sy;
    console.log("db",sx,sy);
    var len=rectangles.length;
        var arr=[];
        var temp=[];
    for(var i=len-1;i>=0;i--)
    {
        var tx=rectangles[i].stx;
        var ty=rectangles[i].sty;
        var bx=rectangles[i].enx;
        var by=rectangles[i].eny;
        
        
        if(sx<=Math.max(tx,bx) && sx>=Math.min(tx,bx) && sy<=Math.max(ty,by) && sy>=Math.min(ty,by) )
        {
                
               
                //arr.push(i);
                for(var j=0;j<len;j++)
                {
                    if(tx==rectangles[j].stx && ty==rectangles[j].sty && bx==rectangles[j].enx && by==rectangles[j].eny)
                    {
                        arr.push(j);
                    }
                }
                break;
               
                
        }
        
        
        
    }
    for(var i=0;i<len;i++)
    {
        if(!(arr.includes(i)))
        {
            temp.push(rectangles[i]);
        }
    }
    
    
    console.log("reca",rectangles);
    console.log("teemp",temp);
    rectangles=temp;
    console.log("recaa",rectangles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawall();
    

}

document.getElementById('canvas').addEventListener('mousedown', function(e) {
    mouseDown(e);
  });
  document.getElementById('canvas').addEventListener('mousemove', function(e) {
    mouseMove(e);
  });
  document.getElementById('canvas').addEventListener('mouseup', function(e) {
    mouseUp(e);
  });
  document.getElementById('canvas').addEventListener('dblclick', function(e) {
    doubleClicked(e);
  });
  function clearCanvas()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangles=[];
  }