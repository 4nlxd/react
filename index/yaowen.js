var React=require("react")
var Link=require('react-router').Link
var $=require('jquery')

var Yaowen=React.createClass({
	getDefaultProps:function(){
		return{
			url:'http://www.xielihao.xin/index.php'
		}
	},
	getInitialState:function(){
		return{
			res:[{"id":''}],
			reslunbo:[{"id":''}],
			reslist:[]
		}
	},
	componentWillMount:function(){
		var _this=this
		$.ajax({
			type:"post",
			url:this.props.url,
			async:true,
			data:{"name":'imNews'},
			success:function(data){
				var data=JSON.parse(data);
				_this.setState({res:data.top,reslunbo:data.lunbo,reslist:data.list})
			}
		});
	},
	render:function(){
		var sty={'width':'98vw','height':'30vh'}
		return(
			<div>
				<Link to={"/yaowen-detail/"+this.state.res[0].id}>
					<Childtop name={this.state.res} />
				</Link>
				<Link to={"/yaowen-detail/"+this.state.reslunbo[0].id}>
					<Childswiper name={this.state.reslunbo} />
				</Link>
				{
					this.state.reslist.map(function(item,index){
						return (<Link to={"/yaowen-detail/"+item.id} key={index}><Childlist name={item} /></Link>)
					})
				}
			</div>
		)
	},
	componentDidMount:function(){
		var mySwiper = new Swiper('.swiper-container', {
			direction:"horizontal",
			loop:true,
			autoplay: 2000,
			pagination : '.swiper-pagination'
			
		})
		
	}
})

var Childtop=React.createClass({
	render:function(){
		var list=this.props.name.map(function(item,index){
			return (<div key={index}>
				<dt style={{"float":"left"}} >
					<img style={{'width':'22vw','height':'10vh','margin':'0 2vw 2vw'}} src={item.imgTit} />
				</dt>
				<dd style={{"fontSize":"2.5vh","float":"left","width":"65vw"}}>{item.title}</dd>
			</div>)
		})
		return(
			<dl style={{'height':'12vh','display':'flex','color':'#000'}}>
				{
					list
				}
			</dl>
		)
	}
})
var Childswiper=React.createClass({
	componentWillMount:function(){
		var mySwiper = new Swiper('.swiper-container', {
			direction:"horizontal",
			loop:true,
			autoplay: 2000,
			pagination : '.swiper-pagination'
		})
	},
	render:function(){
		var sty={'width':'98vw','height':'30vh'}
		return(
			<div className="swiper-container" style={sty} >
				<div className="swiper-wrapper">
					{
						this.props.name.map(function(item,index){
							return (<div className="swiper-slide" key={index}>
							<img style={{'width':'99vw','height':'30vh'}} src={item.imgTit}/>
							</div>)
						})
					}
				</div>
				<div className="swiper-pagination"></div>
			</div>
		)
	}
})

var Childlist=React.createClass({
	render:function(){
		var arr=this.props.name.imgTit.split("&&&&");
		var sty4={'width':'30vw','height':'13vh','margin':'3vw 2vw 0 0'};
		var jsx=[];
		for(var i=0;i<arr.length;i++){
			jsx.push(<img style={sty4} src={arr[i]}/>)
		}
		return(
			<dl style={{'height':'23vh','color':'#000','margin':'2vw'}}>
				<p style={{"fontSize":"2.5vh","margin":0,"padding":0}}>{this.props.name.title}</p>
				<dt style={{'display':'flex','margin':'2vw 0'}}>
				{jsx}
				</dt>
				<dd style={{'position':'relative'}}>
					<span style={{'color':'#999','fontSize':'2vh'}}>{this.props.name.author}</span>
					<span style={{'color':'#999','fontSize':'2vh','position':'absolute','right':'5px'}}>{this.props.name.readNum}</span>
				</dd>
			</dl>
		)
	}
})

module.exports=Yaowen