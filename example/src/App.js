import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

let logicJS = (brd) => {
  brd.suspendUpdate()
  var a = brd.create('slider', [[2, 8], [6, 8], [0, 3, 6]], { name: 'a' })
  var b = brd.create('slider', [[2, 7], [6, 7], [0, 2, 6]], { name: 'b' })
  var A = brd.create('slider', [[2, 6], [6, 6], [0, 3, 6]], { name: 'A' })
  var B = brd.create('slider', [[2, 5], [6, 5], [0, 3, 6]], { name: 'B' })
  var delta = brd.create('slider', [[2, 4], [6, 4], [0, 0, Math.PI]], { name: '&delta;' })

  var c = brd.create('curve', [
    function (t) { return A.Value() * Math.sin(a.Value() * t + delta.Value()); },
    function (t) { return B.Value() * Math.sin(b.Value() * t); },
    0, 2 * Math.PI], { strokeColor: '#aa2233', strokeWidth: 3 })
  brd.unsuspendUpdate();
}

let logicJC = `
$board.setView([-1.5, 2, 1.5, -1]);

// Triangle ABC
A = point(1, 0);
B = point(-1, 0);
C = point(0.2, 1.5);
pol = polygon(A,B,C) <<
        fillColor: '#FFFF00',
        borders: <<
            strokeWidth: 2,
            strokeColor: '#009256'
        >>
    >>;
 
// Perpendiculars and orthocenter i1
pABC = perpendicular(pol.borders[0], C);
pBCA = perpendicular(pol.borders[1], A);
pCAB = perpendicular(pol.borders[2], B);
i1 = intersection(pABC, pCAB, 0);

// Midpoints of segments
mAB = midpoint(A, B);
mBC = midpoint(B, C);
mCA = midpoint(C, A);
 
// Line bisectors and centroid i2
ma = segment(mBC, A);
mb = segment(mCA, B);
mc = segment(mAB, C);
i2 = intersection(ma, mc, 0);
 
// Circum circle and circum center
c = circumcircle(A, B, C) <<
        strokeColor: '#000000',
        dash: 3,
        strokeWidth: 1,
        center: <<
            name: 'i_3',
            withlabel:true,
            visible: true
        >>
    >>;
 
// Euler line 
euler = line(i1, i2) <<
        dash:1,
        strokeWidth: 2,
        strokeColor:'#901B77'
    >>;
`

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>JSXGraph with javascript function:</h1>
        <JXGBoard
          logic={logicJS}
          boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
        />
        <h1>JSXGraph with JessieCode string:</h1>
        <JXGBoard
          logic={logicJC}
          jessieCode
        />
      </div>
    )
  }
}
