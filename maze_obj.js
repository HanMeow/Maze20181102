(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.tunnel1_long = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f(game.wColor).s().p("AgxEOIAAobIBjAAIAAIbg");
	this.shape.setTransform(-40,-25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f(game.fColor).s().p("Ai4EOIAAobIFxAAIAAIbg");
	this.shape_1.setTransform(-16.5,-25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_long, new cjs.Rectangle(-45,-52,47,54), null);


(lib.tunnel1_corner2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f(game.wColor).s().p("AAPBVQgoAAgdgdQgegdAAgpIAAhGIBjAAIAABGIBGAAIAABjg");
	this.shape.setTransform(43.5,-43.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f(game.fColor).s().p("AkcEdIAAo5IGPAAIAABGQAAAqAeAdQAdAdApAAIBGAAIAAGPg");
	this.shape_1.setTransform(23.5,-23.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_corner2, new cjs.Rectangle(-5,-52,57,57), null);


(lib.tunnel1_corner1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f(game.wColor).s().p("ACWD6QikAAh2h2Qh1h0AAilIAAhkIBkAAIAABkQAAB8BYBXQBXBYB8AAIBkAAIAABkg");
	this.shape.setTransform(-20,20);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f(game.fColor).s().p("ABkDIQh7AAhYhYQhYhYAAh7IAAhkIGPAAIAAGPg");
	this.shape_1.setTransform(-15,15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_corner1, new cjs.Rectangle(-45,-5,50,50), null);


(lib.player = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(5,1,1).p("AARjQIgCBBABQk2ICWAAAh0gfQg7gPgxgiQhdg/AAhZQAAhaBdg/QBdg/CDAAQCEAABdA/QBdA/AABaQAABZhdA/QgzAjg/AQQgVAFgXADIAlDsIAfDHABDgVQggAFgjAAQgdAAgcgDIgaDqIgbDqABvgdIBlCrIBpidAjokqICngCAg5gTQgegEgdgIIiBDVABoDXIi7AA");
	this.shape.setTransform(0,5.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AhdB2IAajqQAcAEAeAAQAiAAAggFIAlDrg");
	this.shape_1.setTransform(1,15.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF9966").s().p("Ag5DVQgegEgcgIQg8gPgxgiQhdg/AAhZQAAhZBdg/QBdg/CDAAQCEAABcA/QBeA/AABZQAABZheA/QgyAjg/AQQgVAFgXAEQggAEgjAAQgdAAgcgDgAAOBZIADhAgAjohAICngDgADlhNIiWAAg");
	this.shape_2.setTransform(0,-17.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#333333").ss(5,1,1).p("AABjTIgBBBABAk6ICWAAAiDgiQg8gQgxghQhdg/AAhaQAAhZBdhAQBeg/CDAAQCDAABdA/QBdBAAABZQAABahdA/QgzAig/AQICVAwIBuheABYDTIhSB4IBsB6AAzgYIAlDrIi7AAIBpB4IhPB1AAzgYQggAEgiAAQgeAAgcgDIgaDqABfghQgVAGgXADAj4ktICogDAiDgiIiQA0IhOB9AhJgXQgegEgcgH");
	this.shape_3.setTransform(1.6,6.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.3,-41.6,68.6,94.8);


(lib.tunnel1_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.tunnel1_corner2();
	this.instance.parent = this;
	this.instance.setTransform(0,0,1,1,-90);

	this.instance_1 = new lib.tunnel1_corner2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,0,1,1,180);

	this.instance_2 = new lib.tunnel1_corner2();
	this.instance_2.parent = this;
	this.instance_2.setTransform(0,0,1,1,90);

	this.instance_3 = new lib.tunnel1_corner2();
	this.instance_3.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_4, new cjs.Rectangle(-52,-52,104,104), null);


(lib.tunnel1_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.tunnel1_corner2();
	this.instance.parent = this;
	this.instance.setTransform(0,0,1,1,90);

	this.instance_1 = new lib.tunnel1_long();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,0,1,1,0,180,0);

	this.instance_2 = new lib.tunnel1_corner2();
	this.instance_2.parent = this;

	this.instance_3 = new lib.tunnel1_long();
	this.instance_3.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_3, new cjs.Rectangle(-45,-52,97,104), null);


(lib.tunnel1_2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.tunnel1_long();
	this.instance.parent = this;
	this.instance.setTransform(0,0,1,1,0,180,0);

	this.instance_1 = new lib.tunnel1_long();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,0,1,1,180);

	this.instance_2 = new lib.tunnel1_long();
	this.instance_2.parent = this;
	this.instance_2.setTransform(0,0,1,1,0,0,180);

	this.instance_3 = new lib.tunnel1_long();
	this.instance_3.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_2_2, new cjs.Rectangle(-45,-52,90,104), null);


(lib.tunnel1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.tunnel1_corner2();
	this.instance.parent = this;

	this.instance_1 = new lib.tunnel1_long();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,0,1,1,0,90,-90);

	this.instance_2 = new lib.tunnel1_long();
	this.instance_2.parent = this;

	this.instance_3 = new lib.tunnel1_corner1();
	this.instance_3.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_2, new cjs.Rectangle(-45,-52,97,97), null);


(lib.tunnel1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.tunnel1_long();
	this.instance.parent = this;
	this.instance.setTransform(0,0,1,1,0,0,180);

	this.instance_1 = new lib.tunnel1_corner1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,0,1,1,0,0,180);

	this.instance_2 = new lib.tunnel1_long();
	this.instance_2.parent = this;

	this.instance_3 = new lib.tunnel1_corner1();
	this.instance_3.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_1, new cjs.Rectangle(-45,-52,90,97), null);


(lib.tunnel1_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.tunnel1_corner1();
	this.instance.parent = this;
	this.instance.setTransform(0,0,1,1,180);

	this.instance_1 = new lib.tunnel1_corner1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,0,1,1,90);

	this.instance_2 = new lib.tunnel1_corner1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(0,0,1,1,-90);

	this.instance_3 = new lib.tunnel1_corner1();
	this.instance_3.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_0, new cjs.Rectangle(-45,-45,90,90), null);


(lib.base1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(16));

	// text
	this.TextD = new cjs.Text("", "50px 'Arial'", "#FFFFFF");
	this.TextD.name = "TextD";
	this.TextD.textAlign = "center";
	this.TextD.lineHeight = 58;
	this.TextD.lineWidth = 76;
	this.TextD.parent = this;
	this.TextD.setTransform(0,-25.5);

	this.timeline.addTween(cjs.Tween.get(this.TextD).wait(16));

	// base
	this.instance = new lib.tunnel1_0();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(15));

	// tunnel1
	this.instance_1 = new lib.tunnel1_1("synched",0);
	this.instance_1.parent = this;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).wait(1).to({rotation:90,mode:"independent"},0).wait(1).to({visible:false},0).wait(1).to({rotation:180,visible:true},0).wait(1).to({rotation:0,visible:false},0).wait(3).to({rotation:-90,visible:true},0).to({_off:true},1).wait(7));

	// tunnel2
	this.instance_2 = new lib.tunnel1_2();
	this.instance_2.parent = this;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3).to({_off:false},0).wait(1).to({visible:false},0).wait(2).to({rotation:90,visible:true},0).wait(1).to({visible:false},0).wait(2).to({rotation:-90,visible:true},0).wait(1).to({visible:false},0).wait(2).to({rotation:-180,visible:true},0).to({_off:true},1).wait(3));

	// tunnel2-2
	this.instance_3 = new lib.tunnel1_2_2();
	this.instance_3.parent = this;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(5).to({_off:false},0).wait(1).to({visible:false},0).wait(4).to({rotation:90,visible:true},0).to({_off:true},1).wait(5));

	// tunnel3
	this.instance_4 = new lib.tunnel1_3();
	this.instance_4.parent = this;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(7).to({_off:false},0).wait(1).to({visible:false},0).wait(3).to({rotation:-90,visible:true},0).wait(1).to({visible:false},0).wait(1).to({rotation:-180,visible:true},0).wait(1).to({rotation:-270},0).to({_off:true},1).wait(1));

	// tunnel4
	this.instance_5 = new lib.tunnel1_4();
	this.instance_5.parent = this;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(15).to({_off:false},0).wait(1));

	// border
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,255,255,0)").ss(1,1,1).p("AnznzIPnAAIAAPnIvnAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(16));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51,-51,102,102);


// stage content:
(lib.maze_obj = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Main
	this.instance = new lib.player();
	this.instance.parent = this;
	this.instance.setTransform(302.8,254);

	this.instance_1 = new lib.base1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(387,262.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(908.5,571.6,169.1,101);
// library properties:
lib.properties = {
	id: 'BB9F837154AFB14390C1FB86F2D616B2',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#666666",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['BB9F837154AFB14390C1FB86F2D616B2'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;