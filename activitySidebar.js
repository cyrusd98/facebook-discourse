import React from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';

import { ic_pages } from 'react-icons-kit/md/ic_pages';
import { ic_folder } from 'react-icons-kit/md/ic_folder';
import { ic_settings } from 'react-icons-kit/md/ic_settings';


// “reusable component”
/*function circle(props) {
    const {ctx, cX, cY, radius, startAngle, endAngle, done} = props;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cX, cY, radius, startAngle, endAngle);
    if (done) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function text(props){
    const {ctx, x, y, text} = props;
    ctx.lineWidth = 1;
    ctx.font="15px Calibri";
    ctx.fillText(text,x,y);
}

function line(props){
    const {ctx, x1, y1, x2, y2} = props;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


function createHiDPICanvas(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}

class CanvasComponent extends React.Component {
    constructor(props){
        super(props);
        this.init = false;
    }
    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        if (!this.init){
            var canvas = createHiDPICanvas(this.props.width, this.props.height);
            var parent = this.refs.layout;
            parent.appendChild(canvas);
            this.init = true;
        }

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, this.props.width, this.props.height);
        ctx.fillStyle = ("#FFFFFF");
        ctx.strokeStyle = ("#FFFFFF");
        // draw children “components”
        for (var i = 0; i < this.props.eventList.length; i++){
            var event = this.props.eventList[i];
            var startX = event[3];
            var startY = event[4];
            var radius = event[5];
            var cX = startX + radius;
            var cY = startY + radius;
            var textX = startX + 10 + 2* radius;
            circle({ctx, cX: cX, cY: cY, radius: radius, startAngle: 0, endAngle: 2*Math.PI, done:event[2]});
            text({ctx, x:textX, y:cY, text: event[1]})
        }

        for (var i = 0; i < this.props.eventList.length-1; i++){
            var event1 = this.props.eventList[i];
            var event2 = this.props.eventList[i+1];
            var x1 = event1[3] + event1[5];
            var y1 = event1[4] + 2*event1[5];
            var x2 = event2[3] + event2[5];
            var y2 = event2[4];
            line({ctx, x1:x1, y1:y1, x2:x2, y2:y2})
        }
        
        //circle({ctx, cX: cX, cY: cY, radius: radius, startAngle: 0, endAngle: 2*Math.PI});
    }
    render() {
         return (
            <div ref = "layout"> </div>
         );
    }
}*/

class Event extends React.Component {
    render() {
        console.log(this.props.height);
        var eventStyle = {
            width: this.props.width, 
            height: this.props.height
        };

        return (
            <div style={eventStyle} > 
                <span> </span>
                <span> {this.props.eventList[this.props.index][1]}</span>
            </div>
        );
    }
}

class Activity extends React.Component {
    
    renderEvent(i, height){

        return(
            <div> 
                <Event width = {this.props.width} height = {height} eventList = {this.props.eventList} index = {i}/>
            </div>
        );
    }

    render() {
        var eventHeight = this.props.height/this.props.eventList.length;
        const events = this.props.eventList.map((question, i) => {
            return (this.renderEvent(i, eventHeight));
            });
        return (
            <div> 
                {events}
            </div>
        );
    }
}


//specify the base color/background of the parent container if needed
export class ActivitySidebar extends React.Component {

    getEventList(width, height, subunits) {
        var eventList = [];
        for (var subunit = 0; subunit < subunits.size; subunit++) {
            eventList.push(["subunit", this.props.unit + '.' + (subunit+1) + ' ' + subunits.getIn([subunit, 'name']), 
                subunits.getIn([subunit, 'done'])]);

            if ((subunit+1) === this.props.current.get("cSubUnit")){
                for (var activity = 0; activity < subunits.getIn([subunit, 'activityList']).size; activity++) {
                    eventList.push(["activity", subunits.getIn([subunit, 'activityList', activity, 'name']), 
                        subunits.getIn([subunit, 'activityList', activity, 'done'])]);
                }
            }
        }
        return eventList;
    }

    render() {
        if (this.props.render === 'activity') {
            var layoutWidth = 300;
            var layoutHeight = 700;
            var eventList = this.getEventList(layoutWidth, layoutHeight, this.props.subunits);

        return(
          <div style={{zIndex: -1000,background: '#65789a', color: '#FFF', width: 350, height: '100vh', position: 'absolute'}}>
              <SideNav>
                  <Nav id='Problem'>
                      <NavIcon><SvgIcon size={20} icon={ic_pages}/></NavIcon>
                      <NavText style = {{fontSize: '20px','position': 'relative', 'left': '50px', margin:0, padding:0}}>
                      <Activity width = {layoutWidth} height = {layoutHeight} eventList = {eventList}/>
                      </NavText>
                  </Nav>
                  <Nav id='Library'>
                      <NavIcon><SvgIcon size={20} icon={ic_folder}/></NavIcon>
                      <NavText style = {{fontSize: '12px'}}>
                       </NavText>
                  </Nav>
                  <Nav id='Settings' >
                      <NavIcon><SvgIcon size={20} icon={ic_settings}/></NavIcon>
                      <NavText style = {{fontSize: '12px'}}>
                      </NavText>
                  </Nav>
              </SideNav>
          </div>
        );
      }
      else if (this.props.render === 'none') {
        return(
          <div style={{zIndex: -1000,background: '#65789a', color: '#FFF', width: 50, height: '100vh', position: 'absolute'}}>
          </div>
        )
      }
      else {
        return(
          <div style={{zIndex: -1000,background: '#65789a', color: '#FFF', width: 50, height: '100vh', position: 'absolute'}}>
          </div>
        )
      }
    }
}
