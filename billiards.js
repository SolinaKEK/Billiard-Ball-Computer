function inheritPrototype(t, e) {
  var i = Object.create(e.prototype);
  (i.constructor = t), (t.prototype = i);
}
function contains2D(t, e) {
    for (var i = 0; i < t.length; i++)
    if (t[i][0] == e[0] && t[i][1] == e[1]) return !0;
  return !1;
}
function StatArea() {
  (this.x = 0),
    (this.y = 0),
    (this.w = $(".leftArea").width()),
    (this.h = $(window).height()),
    (this.padding = 10),
    (this.div = d3.select(".leftArea").append("div").classed("statArea", !0)),
    (this._text = this.div.append("p").classed("text", !0)),
    this.div.append("p").classed("text", !0).text("examples"),
    this.div
      .append("a")
      .classed("text", !0)
      .text("planar")
      .on("click", function () {
        Examples.load(Ex.PLANAR);
      }),
    this.div
      .append("a")
      .classed("text", !0)
      .text("switch")
      .on("click", function () {
        Examples.load(Ex.SWITCH);
      }),
    this.div
      .append("a")
      .classed("text", !0)
      .text("and")
      .on("click", function () {
        Examples.load(Ex.AND);
      }),
    this.div
      .append("a")
      .classed("text", !0)
      .text("not")
      .on("click", function () {
        Examples.load(Ex.NOT);
      }),
    this.div
      .append("a")
      .classed("text", !0)
      .text("fanout")
      .on("click", function () {
        Examples.load(Ex.FANOUT);
      }),
      this.div
      .append("a")
      .classed("text", !0)
      .text("fredkin")
      .on("click", function () {
        Examples.load(Ex.FREDKIN);
      });
      this.div
      .append("a")
      .classed("text", !0)
      .text("custom")
      .on("click", function () {
        Examples.load();
      });
}
function DescArea() {
    (this.x = 0),
    (this.y = 0),
    (this.w = $(".rightArea").width()),
    (this.h = $(window).height()),
    (this.padding = 10);
    var t = d3.select(".rightArea");
    (this._descbox = t.append("descbox"))
}
function DrawingArea() {
  (this.x = StatArea.w),
    (this.y = 0),
    (this.w = $(window).width() - 30 - $(".rightArea").width() - this.x),
    (this.h = $(window).height() - 10),
    (this._svg = d3
      .select("body")
      .append("svg")
      .attr("width", this.w)
      .attr("height", this.h)
      .attr("style", "left: " + this.x + "px")),
    (this.svg = this._svg
      .append("g")
      .attr("width", this.w)
      .attr("height", this.h)),
    this.svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", this.w)
      .attr("height", this.h)
      .style("fill", "white"),
    this.svg.on("mousemove", function () {
      Metastate.updateGhost(d3.mouse(this)[0], d3.mouse(this)[1]);
    }),
    this.svg.on("click", function () {
      switch (Metastate.selected) {
        case Elements.HWALL:
        case Elements.VWALL:
        case Elements.ARG:
        case Elements.RESULT:
        case Elements.SOURCE:
        case Elements.SINK:
        case Elements.HTML:
          Metastate.addElement(d3.mouse(this)[0], d3.mouse(this)[1]);
          break;
        case Elements.REMOVER:
          Metastate.removeElement(d3.mouse(this)[0], d3.mouse(this)[1]);
      }
    });
}
function Drawable() {}
function Grid() {
    (this.tickCount = 26),
    (this.minTickCount = 10),
    (this.maxTickCount = 50),
    (this.xAxisGrid = null),
    (this.yAxisGrid = null),
    (this.svgXLines = null),
    (this.svgYLines = null);
}
function Configuration() {
  (this.hwalls = []),
    (this.vwalls = []),
    (this.sources = []),
    (this.sinks = []),
    (this.args = []),
    (this.results = []),
    (this.htmls = []);
}
function Metastate() {
  (this.selected = null), (this._ghost = null), (this._svgs = []);
}
function Sprite() {}
function HTMLSprite() {}
function BallSprite() {}
function ArgSprite() {}
function ResSprite() {}
function SourceSprite() {}
function SinkSprite() {}
function HWallSprite() {}
function VWallSprite() {}
function RealBallSprite() {}
function State(t) {
  (this.config = t),
    (this.balls = []),
    (this._svgBalls = []),
    (this._interval = null);
}
function Ball(t, e, i, s) {
  (this.x = t), (this.y = e), (this.dx = i), (this.dy = s);
}
function Examples() {}
var Elements = {
    HWALL: 0,
    VWALL: 1,
    SOURCE: 2,
    SINK: 3,
    REMOVER: 4,
    HTML: 5,  
    RESULT: 6,
    ARG: 7,
  },
  Ex = { PLANAR: 0, SWITCH: 1, AND: 2, NOT: 3, FANOUT: 4, FREDKIN: 5 };
(StatArea.prototype = {
  constructor: StatArea
}),
  (StatArea = new StatArea()),
  (DescArea.prototype = { constructor: DescArea }),
  (DescArea = new DescArea()),
  (DA = new DrawingArea()),
  (Drawable.prototype = {
    constructor: Drawable,
    initialize: function () {},
    redraw: function () {},
  }),
  inheritPrototype(Grid, Drawable),
  (Grid.prototype = {
    constructor: Grid,
    initialize: function () {
      var t = d3.scale.linear().domain([-1, 1]).range([-1, 1]),
        e = d3.svg.axis().scale(t).tickFormat("").orient("bottom"),
        i = d3.svg.axis().scale(t).tickFormat("").orient("right");
      (this.xAxisGrid = e
        .tickSize(DA.h)
        .tickValues(d3.range(0, DA.w, this.getTickSize()))),
        (this.yAxisGrid = i
          .tickSize(DA.w)
          .tickValues(d3.range(0, DA.h, this.getTickSize()))),
        (this.svgXLines = DA.svg
          .append("g")
          .classed("grid", !0)
          .call(this.xAxisGrid)),
        (this.svgYLines = DA.svg
          .append("g")
          .classed("grid", !0)
          .call(this.yAxisGrid));
    },
    redraw: function () {
      this.xAxisGrid.tickValues(d3.range(0, DA.w, this.getTickSize())),
        this.yAxisGrid.tickValues(d3.range(0, DA.h, this.getTickSize())),
        this.svgXLines.call(this.xAxisGrid),
        this.svgYLines.call(this.yAxisGrid);
    },
    zoomIn: function () {
      this.tickCount > this.minTickCount && this.tickCount--;
    },
    zoomOut: function () {
      this.tickCount < this.maxTickCount && this.tickCount++;
    },
    getTickSize: function () {
      var t = Math.min(DA.w, DA.h);
      return t / this.tickCount;
    },
    getDrawPos: function (t, e) {
      return [t * this.getTickSize(), e * this.getTickSize()];
    },
    getGridPos: function (t, e) {
      return [
        Math.round(t / this.getTickSize()),
        Math.round(e / this.getTickSize()),
      ];
    },
    getGridPosFloor: function (t, e) {
      return [
        Math.floor(t / this.getTickSize()),
        Math.floor(e / this.getTickSize()),
      ];
    },
    getGridPosNoround: function (t, e) {
      return [t / this.getTickSize(), e / this.getTickSize()];
    },
    snapToGrid: function (t, e) {
      return this.getDrawPos.apply(this, this.getGridPos(t, e));
    },
    snapToGridFloor: function (t, e) {
      return this.getDrawPos.apply(this, this.getGridPosFloor(t, e));
    },
  }),
  (Grid = new Grid()),
  (Configuration.prototype = {
    constructor: Configuration,
    addHtml: function (t, e, i) {
      this.htmls.push([t, e, i]);
    },
    addHWall: function (t, e) {
      contains2D(this.hwalls, [t, e]) || this.hwalls.push([t, e]);
    },
    addVWall: function (t, e) {
      contains2D(this.vwalls, [t, e]) || this.vwalls.push([t, e]);
    },
    addSource: function (t, e) {
      contains2D(this.sources, [t, e]) || this.sources.push([t, e, !0]);
    },
    addSink: function (t, e) {
      contains2D(this.sinks, [t, e]) || this.sinks.push([t, e]);
    },
    toString: function () {
      return JSON.stringify([
        this.hwalls,
        this.vwalls,
        this.sources,
        this.sinks,
        this.args,
        this.results,
        this.htmls,
        DescArea._descbox[0][0].value,
      ]);
    },
    fromString: function (t) {
      var e = JSON.parse(t);
      (this.hwalls = e[0]),
        (this.vwalls = e[1]),
        (this.sources = e[2]),
        (this.sinks = e[3]),
        (this.args = e[4]),
        (this.results = e[5]),
        (this.htmls = e[6]),
        (DescArea._descbox[0][0].value = e[7]);
    },
  }),
  (Metastate.prototype = {
    constructor: Metastate,
    initialize: function () {
      this._ghost = DA.svg.append("svg");
    },
    updateGhost: function (t, e) {
      if ((null != this._ghost && this._ghost.remove(), null != this.selected))
        switch (this.selected) {
          case Elements.VWALL:
            this._ghost = VWallSprite.constructSVG.apply(
              this,
              Grid.snapToGridFloor(t, e)
            );
            break;
          case Elements.HWALL:
            this._ghost = HWallSprite.constructSVG.apply(
              this,
              Grid.snapToGridFloor(t, e)
            );
            break;
            case Elements.ARG:
              this._ghost = ArgSprite.constructSVG.apply(
                this,
                Grid.snapToGrid(t, e)
              );
              break;
            case Elements.RESULT:
              this._ghost = ResSprite.constructSVG.apply(
                this,
                Grid.snapToGrid(t, e)
              );
              break;      
          case Elements.SOURCE:
            this._ghost = SourceSprite.constructSVG.apply(
              this,
              Grid.snapToGrid(t, e)
            );
            break;
          case Elements.SINK:
            this._ghost = SinkSprite.constructSVG.apply(
              this,
              Grid.snapToGrid(t, e)
            );
        }
    },
    addElement: function (t, e) {
      switch (this.selected) {
        case Elements.HTML:
              State.config.addHtml.apply(
                State.config,
                Grid.getGridPosNoround(t, e)
            );
          break;
        case Elements.VWALL:
          State.config.addVWall.apply(State.config, Grid.getGridPosFloor(t, e));
          break;
        case Elements.HWALL:
          State.config.addHWall.apply(State.config, Grid.getGridPosFloor(t, e));
          break;
        case Elements.SOURCE:
          State.config.addSource.apply(State.config, Grid.getGridPos(t, e));
          break;
        case Elements.SINK:
          State.config.addSink.apply(State.config, Grid.getGridPos(t, e));
      }
      this.updateSVGs();
    },
    toggleElement: function (t, e) {
      for (
        var i = Grid.getGridPos(t, e), s = 0;
        s < State.config.args.length;
        s++
      ) {
        var a = State.config.args[s];
        if (a[0] == i[0] && a[1] == i[1])
          return (a[2] = !a[2]), this.updateSVGs();
      }
      for (var s = 0; s < State.config.sources.length; s++) {
        var r = State.config.sources[s];
        if (r[0] == i[0] && r[1] == i[1])
          return (r[2] = !r[2]), this.updateSVGs();
      }
    },
    removeElement: function (t, e) {
      for (
        var i = Grid.getGridPosNoround(t, e), s = State.config.htmls, a = 0;
        a < s.length;
        a++
      ) {
        var r = s[a];
        if (Math.sqrt(Math.pow(r[0] - i[0], 2) + Math.pow(r[1] - i[1], 2)) < 1)
          return s.splice(a, 1), this.updateSVGs();
      }
      for (
        var n = Grid.getGridPos(t, e),
          o = [
            State.config.sources,
            State.config.sinks,
            State.config.hwalls,
            State.config.vwalls,
          ],
          c = 0;
        c < o.length;
        c++
      )
        for (var s = o[c], a = 0; a < s.length; a++) {
          var r = s[a];
          if (r[0] == n[0] && r[1] == n[1])
            return s.splice(a, 1), this.updateSVGs();
        }
    },
    updateSVGs: function () {
      this._svgs.forEach(function (t) {
        t.remove();
      }),
        (this._svgs = []),
        State.config.htmls.forEach(function (t) {
          var e = HTMLSprite.constructSVG.apply(
            this,
            Grid.getDrawPos(t[0], t[1]).concat(t[2])
          );
          this._svgs.push(e);
        }, this),
        State.config.hwalls.forEach(function (t) {
          this._svgs.push(
            HWallSprite.constructSVG.apply(this, Grid.getDrawPos(t[0], t[1]))
          );
        }, this),
        State.config.vwalls.forEach(function (t) {
          this._svgs.push(
            VWallSprite.constructSVG.apply(this, Grid.getDrawPos(t[0], t[1]))
          );
        }, this),
        State.config.sources.forEach(function (t) {
          var e = SourceSprite.constructSVG.apply(
            this,
            Grid.getDrawPos(t[0], t[1])
          );
          t[2] || e.style("stroke-opacity", 0.5), this._svgs.push(e);
        }, this),
        State.config.sinks.forEach(function (t) {
          this._svgs.push(
            SinkSprite.constructSVG.apply(this, Grid.getDrawPos(t[0], t[1]))
          );
        }, this),
        State.config.args.forEach(function (t) {
          var e = ArgSprite.constructSVG.apply(
            this,
            Grid.getDrawPos(t[0], t[1])
          );
          t[2]
            ? e.__caption.text("1")
            : (e.style("stroke-opacity", 0.5), e.__caption.text("0")),
            this._svgs.push(e);
        }, this),
        State.config.results.forEach(function (t) {
          var e = ResSprite.constructSVG.apply(
            this,
            Grid.getDrawPos(t[0], t[1])
          );
          e.__caption.text("0");
          for (var i = 0; i < State.balls.length; i++) {
            var s = State.balls[i];
            if (s.x == t[0] && s.y == t[1]) {
              e.__caption.text("1");
              break;
            }
          }
          this._svgs.push(e);
        }, this);
    },
    load: function (t) {
        State.config.fromString(t),
        this.updateSVGs()
    },
  }),
  (Metastate = new Metastate()),
  (Sprite.prototype = { constructor: Sprite, constructSVG: function () {} }),
  inheritPrototype(HTMLSprite, Sprite),
  (HTMLSprite.prototype = {
    constructor: HTMLSprite,
    constructSVG: function (t, e, i) {
      var s = DA.svg.append("g");
      return (
        s
          .append("line")
          .attr("x1", t - (1 * Grid.getTickSize()) / 8)
          .attr("x2", t + (1 * Grid.getTickSize()) / 8)
          .attr("y1", e)
          .attr("y2", e)
          .attr("stroke-width", 1)
          .attr("stroke", "black")
          .attr("shape-rendering", "crispEdges"),
        s
          .append("line")
          .attr("x1", t)
          .attr("x2", t)
          .attr("y1", e - (1 * Grid.getTickSize()) / 8)
          .attr("y2", e + (1 * Grid.getTickSize()) / 8)
          .attr("stroke-width", 1)
          .attr("stroke", "black")
          .attr("shape-rendering", "crispEdges"),
        s
          .append("text")
          .attr("x", t + 2)
          .attr("y", e + 2 - (1 * Grid.getTickSize()) / 4)
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .classed("text", !0)
          .attr("shape-rendering", "crispEdges")
          .text(i),
        s
          .append("text")
          .attr("x", t)
          .attr("y", e - (1 * Grid.getTickSize()) / 4)
          .attr("text-anchor", "middle")
          .classed("text", !0)
          .attr("shape-rendering", "crispEdges")
          .text(i),
        s
      );
    },
  }),
  (HTMLSprite = new HTMLSprite()),
  inheritPrototype(BallSprite, Sprite),
  (BallSprite.prototype = {
    constructor: BallSprite,
    constructSVG: function (t, e) {
      var i = DA.svg.append("g");
      return (
        i
          .append("circle")
          .attr("cx", t)
          .attr("cy", e)
          .attr("r", Grid.getTickSize() / 2)
          .style("fill", "transparent")
          .attr("stroke", "black"),
        i
      );
    },
  }),
  inheritPrototype(ArgSprite, BallSprite),
  (ArgSprite.prototype = {
    constructor: ArgSprite,
    constructSVG: function (t, e) {
      var i = BallSprite.constructSVG(t, e);
      return (
        i
          .append("line")
          .attr("x1", t - (5 * Grid.getTickSize()) / 8)
          .attr("x2", t + (5 * Grid.getTickSize()) / 8)
          .attr("y1", e + (5 * Grid.getTickSize()) / 8)
          .attr("y2", e - (5 * Grid.getTickSize()) / 8)
          .attr("stroke-width", 1)
          .attr("stroke", "black"),
        i
          .append("line")
          .attr("x1", t)
          .attr("x2", t + (5 * Grid.getTickSize()) / 8)
          .attr("y1", e - (5 * Grid.getTickSize()) / 8)
          .attr("y2", e - (5 * Grid.getTickSize()) / 8)
          .attr("stroke-width", 1)
          .attr("stroke", "black"),
        i
          .append("line")
          .attr("x1", t + (5 * Grid.getTickSize()) / 8)
          .attr("x2", t + (5 * Grid.getTickSize()) / 8)
          .attr("y1", e)
          .attr("y2", e - (5 * Grid.getTickSize()) / 8)
          .attr("stroke-width", 1)
          .attr("stroke", "black"),
        (i.__caption = i
          .append("text")
          .attr("x", t + Grid.getTickSize() / 2)
          .attr("y", e + Grid.getTickSize() / 2)
          .classed("text", !0)
          .text("1")),
        i
      );
    },
  }),
  inheritPrototype(ResSprite, BallSprite),
  (ResSprite.prototype = {
    constructor: ResSprite,
    constructSVG: function (t, e) {
      var i = BallSprite.constructSVG(t, e);
      return (
        i
          .append("circle")
          .attr("cx", t)
          .attr("cy", e)
          .attr("r", (3 * Grid.getTickSize()) / 8)
          .style("fill", "transparent")
          .style("stroke", "black"),
        (i.__caption = i
          .append("text")
          .attr("x", t + Grid.getTickSize() / 2)
          .attr("y", e + Grid.getTickSize() / 2)
          .classed("text", !0)
          .text("0")),
        i
      );
    },
  }),
  inheritPrototype(SourceSprite, BallSprite),
  (SourceSprite.prototype = {
    constructor: SourceSprite,
    constructSVG: function (t, e) {
      var i = BallSprite.constructSVG(t, e);
      return (
        i
          .append("line")
          .attr("x1", t + (5 * Grid.getTickSize()) / 8)
          .attr("x2", t - (5 * Grid.getTickSize()) / 8)
          .attr("y1", e + (5 * Grid.getTickSize()) / 8)
          .attr("y2", e - (5 * Grid.getTickSize()) / 8)
          .attr("stroke-width", 1)
          .attr("stroke", "black"),
        i
          .append("line")
          .attr("x1", t + (5 * Grid.getTickSize()) / 8)
          .attr("x2", t)
          .attr("y1", e + (5 * Grid.getTickSize()) / 8)
          .attr("y2", e + (5 * Grid.getTickSize()) / 8)
          .attr("stroke-width", 1)
          .attr("stroke", "black"),
        i
          .append("line")
          .attr("x1", t + (5 * Grid.getTickSize()) / 8)
          .attr("x2", t + (5 * Grid.getTickSize()) / 8)
          .attr("y1", e)
          .attr("y2", e + (5 * Grid.getTickSize()) / 8)
          .attr("stroke-width", 1)
          .attr("stroke", "black"),
        i
      );
    },
  }),
  inheritPrototype(SinkSprite, BallSprite),
  (SinkSprite.prototype = {
    constructor: SinkSprite,
    constructSVG: function (t, e) {
      var i = BallSprite.constructSVG(t, e);
      return (
        i
          .append("line")
          .attr("x1", t - Grid.getTickSize() / 2)
          .attr("x2", t + Grid.getTickSize() / 2)
          .attr("y1", e + Grid.getTickSize() / 2)
          .attr("y2", e - Grid.getTickSize() / 2)
          .attr("stroke-width", 1)
          .attr("stroke", "black"),
        i
          .append("line")
          .attr("x1", t + Grid.getTickSize() / 2)
          .attr("x2", t - Grid.getTickSize() / 2)
          .attr("y1", e + Grid.getTickSize() / 2)
          .attr("y2", e - Grid.getTickSize() / 2)
          .attr("stroke-width", 1)
          .attr("stroke", "black"),
        i
      );
    },
  }),
  (BallSprite = new BallSprite()),
  (ArgSprite = new ArgSprite()),
  (ResSprite = new ResSprite()),
  (SourceSprite = new SourceSprite()),
  (SinkSprite = new SinkSprite()),
  inheritPrototype(HWallSprite, Sprite),
  (HWallSprite.prototype = {
    constructor: HWallSprite,
    constructSVG: function (t, e) {
      var i = DA.svg
        .append("line")
        .attr("x1", t)
        .attr("x2", t + Grid.getTickSize())
        .attr("y1", e)
        .attr("y2", e)
        .attr("stroke-width", 3)
        .attr("stroke", "black")
        .attr("shape-rendering", "crispEdges");
      return i;
    },
  }),
  (HWallSprite = new HWallSprite()),
  inheritPrototype(VWallSprite, Sprite),
  (VWallSprite.prototype = {
    constructor: VWallSprite,
    constructSVG: function (t, e) {
      var i = DA.svg
        .append("line")
        .attr("x1", t)
        .attr("x2", t)
        .attr("y1", e)
        .attr("y2", e + Grid.getTickSize())
        .attr("stroke-width", 3)
        .attr("stroke", "black")
        .attr("shape-rendering", "crispEdges");
      return i;
    },
  }),
  (VWallSprite = new VWallSprite()),
  inheritPrototype(RealBallSprite, Sprite),
  (RealBallSprite.prototype = {
    constructor: RealBallSprite,
    constructSVG: function (t, e) {
      var i = DA.svg.append("g");
      return (
        i
          .append("circle")
          .attr("cx", t)
          .attr("cy", e)
          .attr("r", Grid.getTickSize() / 2)
          .style("fill", "transparent")
          .attr("stroke", "black")
          .attr("stroke-width", 3),
        i
      );
    },
  }),
  (RealBallSprite = new RealBallSprite()),
  (State.prototype = {
    constructor: State,
    initBalls: function() {
      (this.balls = []),
      this.config.args.forEach(function (t) {
        t[2] && this.balls.push(new Ball(t[0], t[1], 1, -1));
      }, this),
      this.config.sources.forEach(function (t) {
        t[2] && this.balls.push(new Ball(t[0], t[1], 1, 1));
      }, this),
      this.balls.forEach(function (t) {
        this._svgBalls.push(
          RealBallSprite.constructSVG.apply(this, Grid.getDrawPos(t.x, t.y))
        );
      }, this),
      Metastate.updateSVGs()
    },
    start: function () {
      if (this.balls.length == 0) { this.initBalls(); }
      this.step();      
      (this._interval = setInterval(
        (function (t) {
          return function () { t.step(); };
        })(this),
        
      ));
    },
    stepForward: function () {
      if (this.balls.length == 0) { this.initBalls(); }
      this.step();
    },
    step: function () {
      this.balls.forEach(function (t) {
        (Math.floor(t.x) != t.x || Math.floor(t.y) != t.y) &&
          (contains2D(this.config.vwalls, [t.x + 0.5 * t.dx, t.y - 0.5]) &&
            (t.dx *= -1),
          contains2D(this.config.hwalls, [t.x - 0.5, t.y + 0.5 * t.dy]) &&
            (t.dy *= -1));
      }, this);
      for (var t = 0; t < this.balls.length; t++)
        for (var e = this.balls[t], i = t + 1; i < this.balls.length; i++) {
          var s = this.balls[i];
          e.dx == -1 * s.dx &&
            e.x + e.dx == s.x &&
            e.y == s.y &&
            ((e.dx *= -1), (s.dx *= -1)),
            e.dy == -1 * s.dy &&
              e.x == s.x &&
              e.y + e.dy == s.y &&
              ((e.dy *= -1), (s.dy *= -1));
        }
      this.balls.forEach(function (t) {
        (t.x += 0.5 * t.dx), (t.y += 0.5 * t.dy);
      }),
      this.config.results.forEach(function (t) {
        this.balls.forEach(function (e) {
          e.x == t[0] && e.y == t[1]
        }, this);
      }, this),
      this._svgBalls.forEach(function (t) {
        t.remove();
      }),
      (this._svgBalls = []),
      this.balls.forEach(function (t) {
        this._svgBalls.push(
          RealBallSprite.constructSVG.apply(this, Grid.getDrawPos(t.x, t.y))
        );
      }, this),
      Metastate.updateSVGs();
    },
    stepBack: function () {
        this.config.results.forEach(function (t) {
          this.balls.forEach(function (e) {
            e.x == t[0] && e.y == t[1]
          }, this);
        }, this),
          this.balls.forEach(function (t) {
            (t.x -= 0.5 * t.dx), (t.y -= 0.5 * t.dy);
          });
        for (var t = 0; t < this.balls.length; t++)
          for (var e = this.balls[t], i = t + 1; i < this.balls.length; i++) {
            var s = this.balls[i];
            e.dx == -1 * s.dx &&
              e.x - e.dx == s.x &&
              e.y == s.y &&
              ((e.dx *= -1), (s.dx *= -1)),
              e.dy == -1 * s.dy &&
                e.y - e.dy == s.y &&
                e.x == s.x &&
                ((e.dy *= -1), (s.dy *= -1));
          }
        this.balls.forEach(function (t) {
          console.log(this.config.vwalls, [t.x - 0.5 * t.dx, t.y - 0.5]);
          console.log(this.config.hwalls, [t.x - 0.5, t.y + 0.5 * t.dy]);
          (Math.floor(t.x) != t.x || Math.floor(t.y) != t.y) &&
            (contains2D(this.config.vwalls, [t.x - 0.5 * t.dx, t.y - 0.5]) &&
              (t.dx *= -1),
            contains2D(this.config.hwalls, [t.x - 0.5, t.y + 0.5 * t.dy]) &&
              (t.dy *= -1));
        }, this),
          this._svgBalls.forEach(function (t) {
            t.remove();
          }),
          (this._svgBalls = []),
          this.balls.forEach(function (t) {
            this._svgBalls.push(
              RealBallSprite.constructSVG.apply(this, Grid.getDrawPos(t.x, t.y))
            );
          }, this),
          Metastate.updateSVGs();
    },
    stop: function () {
        ((this.balls = []),
        this._interval && clearInterval(this._interval),
        this._svgBalls.forEach(function (t) {
          t.remove();
        }),
        (this._svgBalls = []),
        Metastate.updateSVGs());
    },
  }),
  (State = new State(new Configuration())),
  inheritPrototype(Ball, Drawable),
  (Ball.prototype = {
    constructor: Ball,
    initialize: function () {},
    redraw: function () {},
  }),
  Grid.initialize(),
  (Examples.prototype = {
    constructor: Examples,
    load: function (t) {
      switch (t) {
        case Ex.PLANAR:
          Metastate.load(
            '[[[6,9],[12,9],[13,7],[14,11],[14,7],[13,11],[15,11],[16,11],[12,7],[21,12],[23,8],[23,11]],[[15,8],[13,9],[17,8],[15,7],[17,10],[17,9],[13,10],[17,7]],[[4,6,true],[10,6,true],[20,6,true],[20,10,true]],[],[],[],[[5.692068429237947,10.295489891135304,"Turning"],[14.898911353032661,12.628304821150856,"Arbitrary delays"],[21.959564541213066,13.374805598755833,"Signal crossover"]],"A 2D grid of bouncing billiard balls is just as expressive as a physical circuit.  From left to right: Turning, arbitrarily long delays, and signal crossover."]'
          );
          break;
        case Ex.SWITCH:
          Metastate.load(
            '[[[8,6],[10,7],[12,12]],[],[],[],[[7,12,true],[7,8,true]],[[16,7],[16,14],[16,3]],[[6.09642301710731,8.211508553654744,"c"],[6.065318818040436,12.19284603421462,"x"],[17.91601866251944,7.1850699844479005,"cx"],[17.884914463452567,3.203732503888025,"(~c)x"],[17.91601866251944,14.090202177293936,"c"]],"The switch gate takes two arguments, c and x.<br><br>c always passes through the circuit unchanged, but x gets routed to either cx or (~c)x depending on what c is."]'
          );
          break;
        case Ex.AND:
          Metastate.load(
            '[[[8,6]],[],[],[[12,11]],[[7,12,true],[7,8,true]],[[12,6]],[[6.003110419906688,8.087091757387247,"a"],[5.9720062208398135,12.03732503888025,"b"],[13.12597200622084,5.940902021772939,"ab"]],"This is an AND gate.  It only triggers if both inputs are 1.  Notice how similar this is to the switch gate!"]'
          );
          break;
        case Ex.NOT:
          Metastate.load(
            '[[],[],[[7,7,true]],[[12,7],[13,5]],[[7,12,false]],[[12,12],[13,14]],[[5.940902021772939,11.975116640746501,"x"],[14.090202177293936,13.96578538102644,"x"],[13.032659409020217,12.006220839813375,"~x"],[5.940902021772939,6.9673405909797825,"1"]],"This is a NOT gate."]'
          );
          break;
        case Ex.FANOUT:
          Metastate.load(
            '[[[9,12]],[],[[7,8,true]],[[13,14]],[[7,12,true]],[[13,5],[13,8]],[[6.065318818040436,12.19284603421462,"x"],[6.003110419906688,8.024883359253499,"1"],[13.96578538102644,5.0077760497667185,"x"],[13.934681181959565,7.993779160186626,"x"]],"This is a FAN OUT gate.  It makes a copy of x.<br><br>Note that with AND, NOT, and FAN OUT, our billiard ball computer is Turing complete!"]'
          );
          break;
        case Ex.FREDKIN:
          Metastate.load(
            '[[[2,10],[4,14],[3,10],[5,14],[2,14],[3,14],[2,16],[3,16],[4,16],[5,16],[8,10],[9,10],[8,14],[9,14],[10,14],[11,14],[8,8],[9,8],[10,4],[11,6],[13,3],[14,3],[13,9],[13,11],[13,13],[14,13],[14,11],[14,9],[14,6],[15,8],[16,5],[16,8],[15,3],[17,8],[18,2],[19,2],[20,2],[18,6],[19,8],[20,6],[15,9],[16,9],[17,9],[18,9],[19,9],[20,9],[15,11],[16,11],[17,11],[18,11],[19,11],[20,11],[15,13],[16,13],[17,13],[20,13],[19,13],[18,13],[21,9],[21,11],[21,13],[24,4],[23,6],[25,8],[26,8],[25,10],[26,10],[23,14],[24,14],[25,14],[26,14],[29,14],[30,14],[31,14],[32,14],[32,16],[31,16],[30,16],[29,16],[32,10],[31,10]],[],[],[],[[1,14,true],[1,16,true],[1,12,true]],[[34,12],[34,14],[34,16]],[[7.060653188180405,8.118195956454121,"(~c)x"],[6.9673405909797825,10.015552099533437,"cx"],[7.029548989113531,12.068429237947123,"c"],[13.063763608087092,12.03732503888025,"c"],[13.001555209953345,9.984447900466563,"cy"],[12.908242612752723,8.055987558320373,"(~c)y"],[12.939346811819597,6.003110419906688,"cx"],[12.939346811819597,4.0124416796267495,"(~c)x"],[10.046656298600311,12.006220839813375,"switch gate (c and y)"],[3.981337480559876,11.975116640746501,"switch gate (c and x)"],[14.463452566096423,4.510108864696734,"trivial crossover"],[16.51632970451011,6.500777604976673,"nontrivial crossover"],[17.97822706065319,3.079315707620529,"cx"],[18.009331259720064,5.038880248833593,"(~c)y"],[17.947122861586315,6.998444790046657,"(~c)x"],[19.533437013996892,3.421461897356143,"trivial crossover"],[20.995334370139968,3.048211508553655,"(~c)y"],[22.052877138413688,3.981337480559876,"(~c)y"],[21.99066874027994,6.034214618973562,"cx"],[22.021772939346814,8.024883359253499,"(~c)x"],[20.964230171073094,5.0077760497667185,"cx"],[22.021772939346814,10.046656298600311,"cy"],[22.083981337480562,12.006220839813375,"c"],[35.22550544323484,12.052877138413686,"c"],[35.53654743390358,14.074650077760499,"cx+(~c)y"],[35.45878693623639,16.1353032659409,"(~c)x+cy"],[0.24261275272161742,11.968895800933126,"c"],[0.2021772939346812,14.031104199066874,"x"],[0.24261275272161742,16.052877138413688,"y"],[24.948678071539657,11.92846034214619,"inverse switch gate"],[30.933125972006223,12.049766718507,"inverse switch gate"]],"This is a Fredkin gate.  When c is 0, x and y are swapped.  When c is 1, x and y stay the same.<br><br>This implementation uses four switch gates and one nontrivial crossover."]'
          );
        default:
          Metastate.load('[[], [], [], [], [], [], []]');
          break;
      }
    },
  }),
  (Examples = new Examples()),
  Examples.load(Ex.PLANAR),
  $("body").keydown(function (t) {
    if (document.activeElement !== DescArea._descbox[0][0])
      switch (t.keyCode) {
        case 38:
          Grid.zoomIn(), Grid.redraw(), Metastate.updateSVGs();
          break;
        case 40:
          Grid.zoomOut(), Grid.redraw(), Metastate.updateSVGs();
          break;
        case 81:
          Metastate.selected = Elements.VWALL;
          break;
        case 87:
          Metastate.selected = Elements.HWALL;
          break;
        case 68:
          Metastate.selected = Elements.SOURCE;
          break;
        case 70:
          Metastate.selected = Elements.SINK;
          break;
        case 73:
          State.stop(); State.start();
          break;
        case 79:
          State.stop();
          break;
        case 74:
          State.stepForward();
          break;
        case 75:
          State.stepBack();
          break;
        case 82:
          Metastate.selected = Elements.REMOVER;
          break;
          break;
      }
  });
