var init;

//var lib = AdobeAn.compositions['5F9563222A1BEF42BC13F365CB2A987E'].getLibrary(); //函數庫
var lib = {};
var loadManifest, loadManifestError, queue;

var canvas, stage, exportRoot, game, mb;

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
	p,												//shortcut
	cjs = window.createjs;							//shortcut

//初始化
init = () =>{
	inputBlocks = document.getElementById("blocks");
	inputSeed = document.getElementById("seed");
	btnGen = document.getElementById("generate");
	inputStep = document.getElementById("steps");

	canvas = document.getElementById("canvas");

	//exportRoot = new lib.empty();
	exportRoot = new cjs.Container();

	exportRoot.addChild( mb = new cjs.Container() );

	stage = new cjs.Stage("canvas");

	stage.addChild(exportRoot);
	//cjs.Ticker.framerate = lib.properties.fps;
	cjs.Ticker.framerate = 30;
	stage.update();

	/*   
	//可暫停寫法
	cjs.Ticker.addEventListener("tick", e=>{
		if(!e.currentTarget.paused)stage.handleEvent(e);
	});
	*/

	//cjs.Ticker.addEventListener("tick", stage);

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
	const cvsMsDown = e =>{
		let X = e.pageX || e.clientX || e.screenX,
			Y = e.pageY || e.clientY || e.screenY;
		e.currentTarget.lastX = X;
		e.currentTarget.lastY = Y;
	}
	const cvsMsMove = e =>{
		let X = e.pageX || e.clientX || e.screenX,
			Y = e.pageY || e.clientY || e.screenY;

		if( e.currentTarget.lastX && e.currentTarget.lastY ){
			mbTrans(X - e.currentTarget.lastX, Y - e.currentTarget.lastY);
			e.currentTarget.lastX = X;
			e.currentTarget.lastY = Y;
		}
	}
	const cvsMsUp = e =>{
		e.currentTarget.lastX = e.currentTarget.lastY = undefined;
	}
	const cvsWheel = e =>{
		let X = (e.pageX || e.clientX || e.screenX) - exportRoot.x,
			Y = (e.pageY || e.clientY || e.screenY) - exportRoot.y,
			S = mb.scaleY;
		X /= exportRoot.scaleX;
		Y /= exportRoot.scaleY;

		if(e.deltaY>0 && mb.scaleY>0.2){

			mb.x += ( X - mb.x )*0.1/S;
			mb.y += ( Y - mb.y )*0.1/S;

			mb.scaleX = mb.scaleY -= 0.1;

		}else if(e.deltaY<0){

			mb.x -= ( X - mb.x )*0.1/S;
			mb.y -= ( Y - mb.y )*0.1/S;

			mb.scaleX = mb.scaleY += 0.1;

		}

		ReDraw();
	}
	const cvsTchMove = e =>{
		e.preventDefault();

		let X = e.changedTouches[0].pageX || e.changedTouches[0].clientX || e.changedTouches[0].screenX,
			Y = e.changedTouches[0].pageY || e.changedTouches[0].clientY || e.changedTouches[0].screenY;
	
		if( e.currentTarget.lastX && e.currentTarget.lastY )
			mbTrans(X - e.currentTarget.lastX, Y - e.currentTarget.lastY);

		e.currentTarget.lastX = X;
		e.currentTarget.lastY = Y;
	
	}
	const cvsTchEnd = e =>{
		e.preventDefault();
		e.currentTarget.lastX = e.currentTarget.lastY = undefined;
	}
	canvas.addEventListener('mousedown',	cvsMsDown);
	canvas.addEventListener('mousemove',	cvsMsMove);
	canvas.addEventListener('mouseup',		cvsMsUp);
	canvas.addEventListener('wheel',		cvsWheel)
	canvas.addEventListener('touchmove',	cvsTchMove);
	canvas.addEventListener('touchend',	 	cvsTchEnd);
	//測試用

	starting();

}

//開始執行函數
const starting = () =>{
	game = {
		probMain: 1000,		//機率主數
		forks2: 100,		//二岔路機率
		forks3: 50,			//三叉路機率
		blkLength: 100,		//格寬高
		DeadEnds: [],		//死路
		bases: [],			//座標
		RenQueue: [],		//渲染列
		Deepest: [],		//最深
		Toppest: []			//最高
	};
	game.seed = inputSeed.value = Math.random()*20181102|0;
	game.blocks = inputBlocks.value = 100;
}



(lib.base = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.addChild( this.shape = new cjs.Shape() );
	this.shape.graphics.f("#ffa045").dr(-46,-46,93,93);

	//------畫牆壁------
	this.walls = [];

	this.addChild( this.walls[0] = new cjs.Shape() );
	this.walls[0].graphics.s("#421f0c").ss(7,2,2).mt(-47,-47).lt(47,-47).es();

	this.addChild( this.walls[1] = new cjs.Shape() );
	this.walls[1].graphics.s("#421f0c").ss(7,2,2).mt(47,-47).lt(47,47).es();

	this.addChild( this.walls[2] = new cjs.Shape() );
	this.walls[2].graphics.s("#421f0c").ss(7,2,2).mt(47,47).lt(-47,47).es();

	this.addChild( this.walls[3] = new cjs.Shape() );
	this.walls[3].graphics.s("#421f0c").ss(7,2,2).mt(-47,47).lt(-47,-47).es();
	//------畫牆壁------

	//------畫角落------
	this.cnr = [];

	this.addChild( this.cnr[0] = new cjs.Shape() );
	this.cnr[0].graphics.f("#421f0c").dc(-48,-48,9);

	this.addChild( this.cnr[1] = new cjs.Shape() );
	this.cnr[1].graphics.f("#421f0c").dc(48,-48,9);

	this.addChild( this.cnr[2] = new cjs.Shape() );
	this.cnr[2].graphics.f("#421f0c").dc(48,48,9);

	this.addChild( this.cnr[3] = new cjs.Shape() );
	this.cnr[3].graphics.f("#421f0c").dc(-48,48,9);
	//------畫角落------

	this.addChild( this.TextD = new cjs.Text("", "50px 'Arial'", "#FFFFFF") );
	this.TextD.textAlign = 'center';
	this.TextD.lineHeight = 50;
	this.TextD.lineWidth = 50;
	this.TextD.parent = this;
	this.TextD.setTransform(0,-25);

}).prototype = p = new cjs.Container();

//拆牆函數
const breakWall = (obj,i) =>{
	//obj.walls[i].visible = false;
	obj.walls[i].graphics._instructions[4].style = "#ffa045";
}

const seedrandom = () =>{
	let a = 68903,	//prime 1
		b = 37633,	//prime 2
		m = 101653;	//prime 3 for mod
	game.seed = (game.seed*a + b)%m;
	return game.seed/m;
}

const directions = [ [0,-1], [1,0], [0,1], [-1,0] ];

const GenMaze = n =>{
	if(n<2)return;	//步數過小移除

	game.seed = game.seed*n|0;					//修正隨機性

	mb.removeAllChildren();						//刪除原有迷宮

	game.DeadEnds = [ [n,n],[n,n],[n,n],[n,n] ];//死路陣列，將原點也當作「死路」以方便計算

	game.Deepest = [n,n,0];		//最深
	game.Toppest = [n,n];		//最高

	game.bases = [];								//座標陣列
	for(let i=0;i<2*n;i++)game.bases.push([]);		//座標陣列

	game.RenQueue = [ mb.origin = game.bases[n][n] = new lib.base() ];	//迷宮中心，加入渲染列
	mb.origin.x = mb.origin.y = n*game.blkLength;						//迷宮中心座標

	mb.x = mainWidth/2 - n*game.blkLength;								//平移迷宮
	mb.y = mainHeight/2 - n*game.blkLength;								//平移迷宮
	mb.scaleX = mb.scaleY = 1;											//重置迷宮縮放

	let remain = randomWalk(n,n,n-1);			//長迷宮，剩下的步數

	while(remain>0){												//還有剩下的步數就依序從死路長
		if(game.DeadEnds.length<=0)break;							//無死路則中止
		let crd = game.DeadEnds.shift();							//死路第一個元素
		log(`growing ending [${crd[0]}, ${crd[1]}], remain: ${remain}, ends: ${game.DeadEnds.length}.`);
		//if(crd[2])break;											//有檢查值代表跑完了
		//crd[2] = 1;												//加一個檢查值代表檢查過
		remain = randomWalk(crd[0], crd[1], remain, game.bases[ crd[0] ][ crd[1] ].depth);
		//game.DeadEnds.push( crd );		//為了比較路經最好還是加回來，待修
	}

	while(remain>0){												//還有剩下的步數就依序往最上面長
		let crd = game.Toppest;										//最高元素座標
		log(`growing top [${crd[0]}, ${crd[1]}], remain: ${remain}.`);
		remain = randomWalk(crd[0], crd[1], remain, game.bases[ crd[0] ][ crd[1] ].depth);
	}

	//排序找最遠，待修
	//game.DeadEnds.sort( (a,b)=>game.bases[ a[0] ][ a[1] ].depth - game.bases[ b[0] ][ b[1] ].depth );

	for(let i=0;i<game.RenQueue.length;i++){
		mb.addChild(game.RenQueue[i]);
		if(inputStep.checked)game.RenQueue[i].TextD.text = game.RenQueue[i].depth;
	}

	//起點顯示 S，終點顯示 E
	mb.origin.TextD.text = "S";
	game.bases[ game.Deepest[0] ][ game.Deepest[1] ].TextD.text = "E";

	ReDraw();
}

const randomWalk = (x,y,n,depth=0) =>{
	if(!x || !y || !n)return n || 0;

	//log(`New path starting with x: ${x}, y: ${y}, n: ${n}, depth: ${depth}.`);

	//持續步行至步數歸零
	while(n>0){

		let drs = directions.slice(0,directions.length), 	//複製方向陣列
			p = seedrandom()*game.probMain,					//岔路機率
			rs = [];										//路

		for(let i=0;i<drs.length;i++)
			if(game.bases[ x+drs[i][0] ][ y+drs[i][1] ]){		//該方向已走過刪除
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

			game.RenQueue.push( game.bases[ x+dx ][ y+dy ] = new lib.base() );	//新增路，以免碰撞，並加入渲染列
			game.bases[ x+dx ][ y+dy ].depth = depth;							//登記深度
			game.bases[ x+dx ][ y+dy ].x = (x+dx)*game.blkLength;				//紀錄座標
			game.bases[ x+dx ][ y+dy ].y = (y+dy)*game.blkLength;				//紀錄座標

			if(depth>game.Deepest[2])game.Deepest = [ x+dx, y+dy, depth ];		//檢查深度與更新深度
			if(y+dy<game.Toppest[1])game.Toppest = [ x+dx, y+dy ];		//檢查高度與更新高度

			breakWall( game.bases[x][y], 1+dy+(dx>-1?0:2) );					//計算哪面牆要打掉(原點)
			breakWall( game.bases[ x+dx ][ y+dy ], 2+dx-(dy<1?0:2) );			//計算哪面牆要打掉(新)
		}

		for(let i=0;i<rs.length-1;i++)
			if(rs.length-i>1){											//如果是叉路則執行新的步行函數
				let fn = ( seedrandom()*n/(rs.length-i) )|0;			//分配給岔路步數
				if(fn==0){
					game.DeadEnds.push( [ x+rs[i][0], y+rs[i][1] ] ); 	//若分配到的布數等於零，該格為死路
				}else{
					n -= fn;											//分配給岔路步數
					n += randomWalk( x+rs[i][0], y+rs[i][1], fn, depth);//岔路函數
				}
			}

		x = x + rs[ rs.length-1 ][0];	//下一個座標
		y = y + rs[ rs.length-1 ][1];	//下一個座標

		if(n<1)game.DeadEnds.push( [ x, y ] );	//無步數，迴圈中止，該格為死路
	}

	//log(`remain n: ${n} and returning.`);

	return n;
}

//平移迷宮
const mbTrans = (x,y) =>{
	mb.x += (x/exportRoot.scaleX);
	mb.y += (y/exportRoot.scaleY);
	ReDraw();
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