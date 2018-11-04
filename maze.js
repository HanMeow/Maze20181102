var init;

var lib = AdobeAn.compositions['BB9F837154AFB14390C1FB86F2D616B2'].getLibrary(); //函數庫
//var lib = {};
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
	inputLevel, inputSeed, btnGen, inputStep,		//輸入值
	inputWColor, inputFColor, inputPlayable,		//輸入值
	p,												//shortcut
	cjs = window.createjs;							//shortcut

//初始化
init = () =>{
	inputLevel = document.getElementById("level");
	inputSeed = document.getElementById("seed");
	btnGen = document.getElementById("generate");
	inputStep = document.getElementById("steps");
	inputWColor = document.getElementById("wColor"); 
	inputFColor = document.getElementById("fColor");
	inputPlayable = document.getElementById("playable");

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

	btnGen.addEventListener('click',GenActive);
	document.addEventListener('keydown',keyDown);

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
		cords: [0,0],		//座標
		blocks: [],			//格
		wColor: "#432104",	//牆顏色
		fColor: "#FCA243",	//地板顏色
		status: "stand"		//遊戲狀態
	};
	game.seed = inputSeed.value = Math.random()*20181102|0;
	game.level = inputLevel.value = 100;
}

//拆牆函數
const breakWall = (obj,i) =>{
	i = i|0;
	obj.gotoAndStop( obj.currentFrame | (1<<i) );
}

const seedrandom = () =>{
	let a = 68903,	//prime 1
		b = 101653,	//prime 2
		m = 37633;	//prime 3 for mod
	game.seed = (game.seed*a + b)%m;
	if(game.seed<0) game.seed = (-game.seed)|0;
	return game.seed/m;
}

const directions = [ [0,-1], [1,0], [0,1], [-1,0] ];

const GenLevel = n =>{

	game.seed = game.seed*n|0;					//修正隨機性
	game.blocks = [];
	game.cords = [n,n];

	mb.removeAllChildren();						//刪除原有迷宮

	game.Maze = GenMaze(n);

	//log(Maze);

	if(inputPlayable.checked){
		mb.x = mb.y = 0;							//平移迷宮
		mb.scaleX = mb.scaleY = 2;					//重置迷宮縮放
		for(let i=0;i<5;i++){
			game.blocks.push(new lib.base1());
			mb.addChild(game.blocks[i]);
		}
		for(let i=0;i<4;i++){
			game.blocks[i].x = mainWidth/4 + directions[i][0]*game.blkLength;
			game.blocks[i].y = mainHeight/4 + directions[i][1]*game.blkLength;
		}
		mb.addChild( game.player = new lib.player() );
		game.player.gotoAndStop(0);
		game.blocks[4].x = game.player.x = mainWidth/4;
		game.blocks[4].y = game.player.y = mainHeight/4;
		RenMaze(n,n);
	}else{
		mb.x = mainWidth/2 - n*game.blkLength;		//平移迷宮
		mb.y = mainHeight/2 - n*game.blkLength;		//平移迷宮
		mb.scaleX = mb.scaleY = 1;					//重置迷宮縮放
		for(let i=0;i<game.Maze.blocks.length;i++){
			let block = new lib.base1();
			block.x = game.Maze.blocks[i][0]*game.blkLength;
			block.y = game.Maze.blocks[i][1]*game.blkLength;
			block.gotoAndStop( game.Maze.blocks[i][3] );
			mb.addChild(block);
			if(inputStep.checked)block.TextD.text = block.depth = game.Maze.blocks[i][2];
			//起點顯示 S，終點顯示 E
			if(game.Maze.origin==game.Maze.blocks[i])block.TextD.text = "S";
			else if(game.Maze.Deepest==game.Maze.blocks[i])block.TextD.text = "E";
			game.blocks.push(block);
		}
	}	

	ReDraw();
}

const GenMaze = n =>{
	if(n<2)return false;	//步數過小移除

	let Maze = {},								//迷宮主物件
		probMain = game.probMain,		//主機率
		forks2 = game.forks2,				//岔路機率
		forks3 = game.forks3;				//岔路機率

	Maze.grids = [];							//座標陣列
	for(let i=0;i<2*n;i++)Maze.grids.push([]);	//座標陣列

	/*--迷宮座標陣列--
	[x, y, depth, Passable]
	x,y: 		座標
	depth:		深度，從起點算起
	Passable:	可通行，二進位格式，第 0123 位 代表 上右下左
	*/
	Maze.origin	 = Maze.grids[n][n] = [n,n,0,0];	//迷宮中心
	Maze.Deepest = Maze.grids[n][n];				//最深
	Maze.Toppest = Maze.grids[n][n];				//最高
	Maze.Rightmost = Maze.grids[n][n];				//最右
	Maze.Bottom = Maze.grids[n][n];					//最下
	Maze.Leftmost = Maze.grids[n][n];				//最左

	Maze.blocks = [ Maze.grids[n][n] ];			//生成格陣列
	Maze.DeadEnds = [];			//死路陣列
		
	//方向陣列
	const directions = [ [0,-1], [1,0], [0,1], [-1,0] ];
	//長迷宮函數
	const randomWalk = (x,y,n,depth=0) =>{
		if(!x || !y || !n)return n || 0;

		//持續步行至步數歸零
		while(n>0){

			let drs = [0,1,2,3],			//方向陣列index
				p = seedrandom()*probMain,	//岔路機率
				rs = [];					//路

			//該方向已走過刪除
			for(let i=0;i<drs.length;i++)
				if(Maze.grids[ x+directions[ drs[i] ][0] ][ y+directions[ drs[i] ][1] ]){
					drs.splice(i,1);
					i--;
				}

			if(drs.length<1)break;	//無路可走，中斷迴圈並回傳剩餘步數

			if( n>2 && drs.length>2 && p<forks3 )
				rs.push( drs.splice(seedrandom()*drs.length|0, 1)[0] );	//三岔路機率，增加一條路
			if( n>1 && drs.length>1 && p<forks2 )
				rs.push( drs.splice(seedrandom()*drs.length|0, 1)[0] );	//二岔路機率，增加一條路

			rs.push( drs.splice(seedrandom()*drs.length|0, 1)[0] );		//主路

			n -= rs.length;	//剩餘步數
			depth++;		//深度

			for(let i=0;i<rs.length;i++){

				let dx = directions[ rs[i] ][0],	//X方向
					dy = directions[ rs[i] ][1];	//Y方向

				//新增路，以免碰撞，並加入格列
				Maze.blocks.push( Maze.grids[ x+dx ][ y+dy ] = [x+dx, y+dy, depth, 0] );

				//檢查深度與更新深度
				if(depth>Maze.Deepest[2])Maze.Deepest = Maze.grids[ x+dx ][ y+dy ];	

				//檢查高度、最右、最下、最左，與更新高度
				if(y+dy<Maze.Toppest[1])Maze.Toppest = Maze.grids[ x+dx ][ y+dy ];
				else if(x+dx>Maze.Rightmost[0])Maze.Rightmost = Maze.grids[ x+dx ][ y+dy ];
				else if(y+dy>Maze.Bottom[1])Maze.Bottom = Maze.grids[ x+dx ][ y+dy ];
				else if(x+dx<Maze.Leftmost[0])Maze.Leftmost = Maze.grids[ x+dx ][ y+dy ];

				//計算哪面牆要打掉(原點)
				Maze.grids[x][y][3] = Maze.grids[x][y][3] | (1<<rs[i]);	
				//計算哪面牆要打掉(新)
				Maze.grids[ x+dx ][ y+dy ][3] = Maze.grids[ x+dx ][ y+dy ][3] | (1<<((rs[i]+2)%4));	
			}

			for(let i=0;i<rs.length-1;i++)
				if(rs.length-i>1){									//如果是叉路則執行新的步行函數
					let fn = ( seedrandom()*n/(rs.length-i) )|0,	//分配給岔路步數
						dx = directions[ rs[i] ][0],				//X方向
						dy = directions[ rs[i] ][1];				//Y方向
					if(fn==0){
						Maze.DeadEnds.push( Maze.grids[ x+dx ][ y+dy ] ); 	//若分配到的布數等於零，該格為死路
					}else{
						n -= fn;								//分配給岔路步數
						n += randomWalk( x+dx, y+dy, fn, depth);//岔路函數
					}
				}

			x = x + directions[ rs[ rs.length-1 ] ][0];	//下一個座標
			y = y + directions[ rs[ rs.length-1 ] ][1];	//下一個座標

			if(n<1)Maze.DeadEnds.push( Maze.grids[x][y] );	//無步數，迴圈中止，該格為死路
		}

		return n;
	}

	let remain = randomWalk(n,n,n-1);							//剩下的步數

	for (let i = 0; i<4; i++){
		remain = randomWalk(n,n,remain);	//重複4次從起點長迷宮
	}

	while(remain>0){												//還有剩下的步數就依序從死路長
		if(Maze.DeadEnds.length<=0)break;							//無死路則中止
		let crd = Maze.DeadEnds.shift();							//死路第一個元素
		log(`growing DeadEnds [${crd[0]}, ${crd[1]}], remain: ${remain}.`);
		remain = randomWalk(crd[0], crd[1], remain, crd[2]);
	}

	while(remain>0){												//還有剩下的步數就依序往最上面長
		let crd = game.Toppest;										//最高元素座標
		log(`growing top [${crd[0]}, ${crd[1]}], remain: ${remain}.`);
		remain = randomWalk(crd[0], crd[1], remain, crd[2]);
	}

	//回傳迷宮
	return Maze;
}

const RenMaze = (x,y) =>{
	for(let i=0;i<4;i++){
		let dx = directions[i][0],	//X方向
			dy = directions[i][1];	//Y方向
		game.blocks[i].x = mainWidth/4 + directions[i][0]*game.blkLength;
		game.blocks[i].y = mainHeight/4 + directions[i][1]*game.blkLength;
		if(game.Maze.grids[x+dx][y+dy] && (game.Maze.grids[x][y][3] & 1<<i)){
			game.blocks[i].visible = !0;
			game.blocks[i].gotoAndStop( game.Maze.grids[x+dx][y+dy][3] );
			if(game.Maze.Deepest==game.Maze.grids[x+dx][y+dy])
				game.blocks[i].TextD.text = "Next";
			else game.blocks[i].TextD.text = "";
		}else{
			game.blocks[i].visible = !1;
		}
	}
	game.blocks[4].gotoAndStop( game.Maze.grids[x][y][3] );
	if(game.Maze.Deepest==game.Maze.grids[x][y])
		game.blocks[4].TextD.text = "Next";
	else game.blocks[4].TextD.text = "";
	game.blocks[4].x = mainWidth/4;
	game.blocks[4].y = mainHeight/4;
	ReDraw();
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

const GenActive = e =>{
	game.seed = parseInt( String( inputSeed.value.match(/\d+/g) ).replace(/\,/g,'') );
	game.level = parseInt( String( inputLevel.value.match(/\d+/g) ).replace(/\,/g,'') );
	game.wColor = inputWColor.value;
	game.fColor = inputFColor.value;
	GenLevel(game.level);
}

const keyDown = e =>{
	switch(e.keyCode) {
		case 13:
			GenActive();
			break;
		case 37:
			if(game.status == "stand")playerWalk(3);
			break;
		case 38:
			if(game.status == "stand")playerWalk(0);
			break;
		case 39:
			if(game.status == "stand")playerWalk(1);
			break;
		case 40:
			if(game.status == "stand")playerWalk(2);
			break;
	    default:
	        //
	}
}

const playerWalk = d =>{
	let dx = directions[d][0],	//X方向
		dy = directions[d][1],	//Y方向
		x = game.cords[0],
		y = game.cords[1];
	if(game.Maze.grids[x+dx][y+dy] && (game.Maze.grids[x][y][3] & 1<<d)){
		game.status = "walking";
		if(dx)game.player.scaleX = dx;
		function myTimer() {
			game.player.gotoAndStop(game.player.currentFrame?0:1);
			mb.x -= mb.scaleX*game.blkLength*dx/s;
			mb.y -= mb.scaleY*game.blkLength*dy/s;
			game.player.x += game.blkLength*dx/s;
			game.player.y += game.blkLength*dy/s;
			c++;
			if(c>s){
				clearInterval(myVar);
				game.status = "stand";
				mb.x = mb.y = 0;
				game.player.x = mainWidth/4;
				game.player.y = mainHeight/4;
				game.player.gotoAndStop(0);
				if(game.Maze.Deepest==game.Maze.grids[game.cords[0]][game.cords[1]]){
					inputLevel.value = game.level += 1;
					GenActive(game.level);
				}
			}if(c==s/2){
				mb.x += mb.scaleX*game.blkLength*dx;
				mb.y += mb.scaleY*game.blkLength*dy;
				game.player.x -= game.blkLength*dx;
				game.player.y -= game.blkLength*dy;
				game.cords = [game.cords[0]+dx, game.cords[1]+dy];
				RenMaze(game.cords[0],game.cords[1]);
			}else{
				ReDraw();
			}
		}
		let myVar = setInterval(myTimer, 30),
			c = 0,
			s = 10;
	}
	
}

})();