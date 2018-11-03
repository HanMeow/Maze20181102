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


(lib.tunnel1_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#432104").ss(10,1,1).p("AFQoNIAAAcQAGAlAcAcQAbAbAjAGQABABACAAIAVAAQAEAAADAAAGwmPIAYABAGxGQIAeAAIgcgBQgCAAAAABQgkAGgaAbQgcAcgGAlIAAAcAnOIOQAAmXAAqE");
	this.shape.setTransform(6.3,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCA243").s().p("AnOIOIAAwbIMeAAIAAAcQAGAlAcAcQAaAbAkAGIADABIAVAAIAHAAIAAMeIgcgBIgCABQgkAGgaAbQgdAcgFAlIAAAcg");
	this.shape_1.setTransform(6.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_3, new cjs.Rectangle(-45,-57.6,102.6,115.3), null);


(lib.tunnel1_2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#432104").ss(10,1,1).p("AGQoOIAAQdAmPIPIAAwd");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCA243").s().p("AmPIOIAAwcIMfAAIAAQcg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_2_2, new cjs.Rectangle(-44.9,-57.6,89.9,115.3), null);


(lib.tunnel1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#432104").ss(10,1,1).p("AFQnOIAAAcQAGAlAcAcQAcAcAlAGIAcAAAHPHPIp5AAQh3gChVhWQhWhVgCh3IAAp5");
	this.shape.setTransform(6.3,-6.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCA243").s().p("AiqHPQh3gDhVhVQhVhVgDh3IAAp5IMeAAIAAAdQAGAkAcAcQAcAcAlAGIAcAAIAAMeg");
	this.shape_1.setTransform(6.3,-6.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_2, new cjs.Rectangle(-45,-57.6,102.6,102.6), null);


(lib.tunnel1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#432104").ss(10,1,1).p("AGQnOIAAJ5QgDB3hVBVQhVBWh3ACIjXAAQh3gChVhWQhVhVgDh3IAAp5");
	this.shape.setTransform(0,-6.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCA243").s().p("AhqHPQh4gDhUhVQhWhVgDh3IAAp5IMfAAIAAJ5QgDB3hWBVQhUBVh4ADg");
	this.shape_1.setTransform(0,-6.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.tunnel1_1, new cjs.Rectangle(-44.9,-57.6,89.9,102.6), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#432104").ss(10,1,1).p("AGQBrQgDB3hVBWQhWBVh3ADIjWAAQh3gDhVhVQhVhVgDh3IAAjXQADh3BVhVQBVhVB3gDIDXAAQB3ADBVBVQBVBVADB3g");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCA243").s().p("AhqGQQh4gDhUhWQhWhUgDh4IAAjVQADh4BWhUQBUhWB4gDIDVAAQB4ADBUBWQBWBUADB4IAADVQgDB3hWBVQhVBWh3ADg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[]},1).wait(15));

	// tunnel1
	this.instance = new lib.tunnel1_1();
	this.instance.parent = this;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({rotation:90},0).wait(1).to({visible:false},0).wait(1).to({rotation:180,visible:true},0).wait(1).to({rotation:0,visible:false},0).wait(3).to({rotation:-90,visible:true},0).to({_off:true},1).wait(7));

	// tunnel2
	this.instance_1 = new lib.tunnel1_2();
	this.instance_1.parent = this;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3).to({_off:false},0).wait(1).to({visible:false},0).wait(2).to({rotation:90,visible:true},0).wait(1).to({visible:false},0).wait(2).to({rotation:-90,visible:true},0).wait(1).to({visible:false},0).wait(2).to({rotation:-180,visible:true},0).to({_off:true},1).wait(3));

	// tunnel2-2
	this.instance_2 = new lib.tunnel1_2_2();
	this.instance_2.parent = this;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(5).to({_off:false},0).wait(1).to({visible:false},0).wait(4).to({rotation:90,visible:true},0).to({_off:true},1).wait(5));

	// tunnel3
	this.instance_3 = new lib.tunnel1_3();
	this.instance_3.parent = this;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(7).to({_off:false},0).wait(1).to({visible:false},0).wait(3).to({rotation:-90,visible:true},0).wait(1).to({visible:false},0).wait(1).to({rotation:-180,visible:true},0).wait(1).to({rotation:-270},0).to({_off:true},1).wait(1));

	// tunnel4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#432104").ss(10,1,1).p("AGQnuIAAgfIgBAcQAAABABACQAGAjAbAaQAbAbAjAHIAYAAQAEAAADAAAHvmPQABAAACAAIAVAAAHwGQIAeAAIgcgBQgBAAgBABQgkAGgaAbQgbAbgHAjQAAABAAACIAAAcIAAgfAmPoGQAAgEAAgDAmPnuQAAgBAAgCIAAgVAnvmPIgeAAIAcABQABAAABgBQAkgGAagbQAbgbAHgjIAAgYAnuGQIgYAAQgEAAgDAAAmPHwQgGgkgbgaQgbgbgjgHQgBAAgCAAIgVAAAmOIHIgBgXAmOIOQAAgDAAgEIAAgVQAAgBgBgB");

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCA243").s().p("AmOIOIAAgHIAAgVIgBgCQgGgkgbgaQgagbgkgHIgDAAIgVAAIgHAAIAAsfIAcABIACgBQAkgGAagbQAbgbAHgiIAAgEIAAgUIAAgIIMfAAIgBAcIABADQAGAjAbAaQAaAbAkAHIADAAIAVAAIAHAAIAAMfIgcgBIgCABQgkAGgaAbQgbAagHAkIAAADIAAAcg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},15).wait(1));

	// border
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("rgba(255,255,255,0)").ss(1,1,1).p("AnznzIPnAAIAAPnIvnAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(16));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51,-51,102,102);


// stage content:
(lib.maze_obj = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Main
	this.instance = new lib.base1();
	this.instance.parent = this;
	this.instance.setTransform(387,262.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(976.5,571.6,101,101);
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