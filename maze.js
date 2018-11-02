var init;

//var lib = AdobeAn.compositions['5F9563222A1BEF42BC13F365CB2A987E'].getLibrary(); //函數庫
var lib = {};
var loadManifest, loadManifestError, queue;

var canvas, stage, exportRoot, game, mb, GenMaze, bases;

(()=>{
//方便取得陣列末值
if(!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

let mainWidth = 720,					//RWD寬
	mainHeight = 1280,					//RWD高
	mainWHRatio = mainWidth/mainHeight,				//寬高比
	log = console.log, 								//shortcut
	inputBlocks, inputSeed, btnGen, inputStep,		//輸入值
	p;												//shortcut

//初始化
init = () =>{
	inputBlocks = document.getElementById("blocks");
	inputSeed = document.getElementById("seed");
	btnGen = document.getElementById("generate");
	inputStep = document.getElementById("steps");

	canvas = document.getElementById("canvas");

	//exportRoot = new lib.empty();
	exportRoot = new createjs.Container();

	exportRoot.addChild( mb = new createjs.Container() );

	stage = new createjs.Stage("canvas");

	stage.addChild(exportRoot);
	//createjs.Ticker.framerate = lib.properties.fps;
	createjs.Ticker.framerate = 30;
	stage.update();

	/*   
	//可暫停寫法
	createjs.Ticker.addEventListener("tick", e=>{
		if(!e.currentTarget.paused)stage.handleEvent(e);
	});
	*/

	//createjs.Ticker.addEventListener("tick", stage);

	canvas.addEventListener('contextmenu', function(e){e.preventDefault();});
	

	//Code to support hidpi screens and responsive scaling.
	resizeCanvas = function(){

		let r = window.devicePixelRatio,
		h = document.documentElement.clientHeight || window.innerHeight,
		w = document.documentElement.clientWidth || window.innerWidth,
		rt = exportRoot;

		//畫布寬高
		canvas.style.width = w + "px";
		canvas.style.height = h + "px";
		//畫布像素
		canvas.width = w;
		canvas.height = h;

		rt.x = rt.y = 0;
		if( w > h*mainWHRatio ){
			rt.scaleY = h/mainHeight;
			rt.scaleX = rt.scaleY;
			rt.x = (w - rt.scaleX*mainWidth)/2;

		}else{
			rt.scaleX = w/mainWidth;
			rt.scaleY = rt.scaleX;
			rt.y = (h - rt.scaleY*mainHeight)/2;
		}

		//重繪主要畫布
		ReDraw();
	}
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();

	btnGen.addEventListener('click',btnGenClick);

	//測試用
	const mbMsDown = e =>{
		e.currentTarget.lastX = e.localX;
		e.currentTarget.lastY = e.localY;
	}
	const mbMsMove = e =>{
		if( e.currentTarget.lastX && e.currentTarget.lastY ){
			mb.x += e.localX - e.currentTarget.lastX;
			mb.y += e.localY - e.currentTarget.lastY;
			e.currentTarget.lastX = e.localX;
			e.currentTarget.lastY = e.localY;
			ReDraw();
		}
	}
	const cvsTchMove = e =>{
		e.preventDefault();

		let X = e.changedTouches[0].pageX || e.changedTouches[0].clientX || e.changedTouches[0].screenX,
			Y = e.changedTouches[0].pageY || e.changedTouches[0].clientY || e.changedTouches[0].screenY;
	
		if( e.currentTarget.lastX && e.currentTarget.lastY ){
			mb.x += (X - e.currentTarget.lastX)/exportRoot.scaleX;
			mb.y += (Y - e.currentTarget.lastY)/exportRoot.scaleY;
			ReDraw();
		}

		e.currentTarget.lastX = e.changedTouches[0].pageX || e.changedTouches[0].clientX || e.changedTouches[0].screenX;
		e.currentTarget.lastY = e.changedTouches[0].pageY || e.changedTouches[0].clientY || e.changedTouches[0].screenY;
	
	}
	const cvsTchEnd = e =>{
		e.preventDefault();
		e.currentTarget.lastX = e.currentTarget.lastY = undefined;
	}
	mb.addEventListener('mousedown',mbMsDown);
	mb.addEventListener('pressmove',mbMsMove);
	canvas.addEventListener('touchmove', cvsTchMove);
	canvas.addEventListener('touchend', cvsTchEnd);
	//測試用

	starting();

}

//開始執行函數
const starting = () =>{
	game = {
		probMain: 1000,		//機率主數
		forks2: 100,		//二岔路機率
		forks3: 50			//三叉路機率
	};
	game.seed = inputSeed.value = Math.random()*20181102|0;
	game.blocks = inputBlocks.value = 100;
}



(lib.base = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.addChild( this.shape = new createjs.Shape() );
	this.shape.graphics.f("#ffa045").dr(-46,-46,92,92);

	this.walls = [];

	this.addChild( this.walls[0] = new createjs.Shape() );
	this.walls[0].graphics.s("#421f0c").ss(7,2,2).mt(-48,-47).lt(48,-47).es();

	this.addChild( this.walls[1] = new createjs.Shape() );
	this.walls[1].graphics.s("#421f0c").ss(7,2,2).mt(47,-48).lt(47,48).es();

	this.addChild( this.walls[2] = new createjs.Shape() );
	this.walls[2].graphics.s("#421f0c").ss(7,2,2).mt(48,47).lt(-48,47).es();

	this.addChild( this.walls[3] = new createjs.Shape() );
	this.walls[3].graphics.s("#421f0c").ss(7,2,2).mt(-47,48).lt(-47,-48).es();

	this.addChild( this.TextD = new createjs.Text("", "50px 'Arial'", "#FFFFFF") );
	this.TextD.textAlign = 'center';
	this.TextD.lineHeight = 50;
	this.TextD.lineWidth = 50;
	this.TextD.parent = this;
	this.TextD.setTransform(0,-25);

}).prototype = p = new createjs.Container();

//拆牆函數
const breakWall = (obj,i) =>{
	obj.walls[i].visible = false;
}

const seedrandom = () =>{
	let a = 68903,	//prime 1
		b = 37633,	//prime 2
		m = 101653;	//prime 3 for mod
	game.seed = (game.seed*a + b)%m;
	return game.seed/m;
}

const directions = [ [0,-1], [1,0], [0,1], [-1,0] ];

GenMaze = n =>{
	if(n<2)return;	//步數過小移除

	mb.removeAllChildren();

	bases = [];									//迷宮陣列
	for(let i=0;i<2*n;i++)bases.push([]);		//迷宮陣列
	mb.origin = bases[n][n] = new lib.base();	//迷宮中心
	mb.x = mainWidth/2 - n*100;					//迷宮中心座標
	mb.y = mainHeight/2 - n*100;				//迷宮中心座標

	let remain;
	if(remain = randomWalk(n,n,n-1))			//若有剩下重複執行
		if(remain = randomWalk(n,n,remain))		//若有剩下重複執行
			if(remain = randomWalk(n,n,remain))	//若有剩下重複執行
				if(remain = randomWalk(n,n,remain));//四次為上限

	for(let i=0;i<bases.length;i++)
		for(let j=0;j<bases[i].length;j++)
			if(bases[i][j]){
				mb.addChild(bases[i][j]);
				bases[i][j].x = i*100;
				bases[i][j].y = j*100;
				if(inputStep.checked)bases[i][j].TextD.text = bases[i][j].depth;
			}

	ReDraw();
}

const randomWalk = (x,y,n,depth=0) =>{
	if(!x || !y || !n)return n || 0;

	log(`New path starting with x: ${x}, y: ${y}, n: ${n}, depth: ${depth}.`);

	//持續步行至步數歸零
	while(n){

		let drs = directions.slice(0,directions.length), 	//複製方向陣列
			p = seedrandom()*game.probMain,					//岔路機率
			rs = [];										//路

		for(let i=0;i<drs.length;i++)
			if(bases[ x+drs[i][0] ][ y+drs[i][1] ]){		//該方向已走過刪除
				drs.splice(i,1);							//該方向已走過刪除
				i--;										//該方向已走過刪除
			}

		if(drs.length<1)break;	//無路可走，中斷迴圈並回傳剩餘步數

		if( n>2 && drs.length>2 && p<game.forks3 )
			rs.push( drs.splice(seedrandom()*drs.length|0, 1)[0] );	//三岔路機率，增加一條路
		if( n>1 && drs.length>1 && p<game.forks2 )
			rs.push( drs.splice(seedrandom()*drs.length|0, 1)[0] );	//二岔路機率，增加一條路

		rs.push( drs.splice(seedrandom()*drs.length|0, 1)[0] );		//主路

		n -= rs.length;	//剩餘步數
		depth++;		//深度

		for(let i=0;i<rs.length;i++){

			let dx = rs[i][0],	//X方向
				dy = rs[i][1];	//Y方向

			bases[ x+dx ][ y+dy ] = new lib.base();		//新增路，以免碰撞
			bases[ x+dx ][ y+dy ].depth = depth;		//登記深度

			breakWall( bases[x][y], 1+dy+(dx>-1?0:2) );				//計算哪面牆要打掉(原點)
			breakWall( bases[ x+dx ][ y+dy ], 2+dx-(dy<1?0:2) );	//計算哪面牆要打掉(新)
		}

		for(let i=0;i<rs.length-1;i++)
			if(rs.length-i>1){	//如果是叉路則執行新的步行函數
				let fn = ( seedrandom()*n/(rs.length-i) )|0;		//分配給岔路步數
				n -= fn;											//分配給岔路步數
				n += randomWalk( x+rs[i][0], y+rs[i][1], fn, depth);//岔路函數
			}

		x = x + rs[ rs.length-1 ][0];	//下一個座標
		y = y + rs[ rs.length-1 ][1];	//下一個座標

	}

	log(`remain n: ${n} and returning.`);

	return n;

}

const ReDraw = () =>{
	if(null!=stage && null!=canvas){
		stage.clear();
		stage.draw(canvas.getContext("2d"), false);
	}
}

const btnGenClick = e =>{
	game.seed = parseInt( String( inputSeed.value.match(/\d+/g) ).replace(/\,/g,'') );
	game.blocks = parseInt( String( inputBlocks.value.match(/\d+/g) ).replace(/\,/g,'') );
	GenMaze(game.blocks);
}

})();