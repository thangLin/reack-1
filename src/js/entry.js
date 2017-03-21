require('../css/index.less')
var React = require("react"),
    ReactDom = require("react-dom");


/*var Mask = React.createClass({
    getDefaultProps:function () {
        return {
            style:{
                opacity:0.5,
                background :"pink",
                display:'none',
                position:'absolute',
                left: '0px',
                right: '0px',
                top: '0px',
                bottom: '0px'
            }
        }
    },
    render:function (){
        var oStyle = Object.assign({},this.props.style);
        if(this.props.Oflag){
           oStyle.display = 'block'; 
        }
        console.log(this.props.Oflag)
        return (
            <div style={oStyle} className = {"mask"} >
                {this.props.children}
            </div>
        )
    }
})

var Info = React.createClass({
    getDefaultProps:function(){
        return{
            message:"Hello",
            message1:"world!",
            style:{
                height:'20%',
                width:'100%',
                position:'absolute',
                left:'50%',
                top:'50%',
                transform:"translateX(-50%) translateY(-50%)",
                color:'red',
                background:'blue',
                textAlign:'center'
            }
        }
    },
    render:function () {
        return (
            <div style = {this.props.style} className={'info'} onClick = {this.props.useFatherState}>
                <h1>{this.props.message}</h1>
                <h3>{this.props.message1}</h3>
            </div>
        )
    }
})

var Btn = React.createClass({
    getInitialState:function(){
        return {
            open:false,
        }
    },
    onChangeState:function(){
       var flag = ! this.state.open;
       this.setState({
           open:flag,
       })
    },
    getDefaultProps:function(){
        return {
            style :{
                    position:'absolute',
                    left: '0px',
                    right: '0px',
                    top: '0px',
                    bottom: '0px'
            },
            btnStyle:{
                postion:'absolute',
                display:'inline'
            }
        }
    },
    render:function(){
        return(
            <div style= {this.props.style}>
                <button style= {this.btnStyle} onClick={this.onChangeState}>showInfo</button> 
                <Mask Oflag = {this.state.open}>
                    <Info useFatherState = {this.onChangeState}></Info>
                </Mask>                   
            </div>
        )
    }
})
ReactDom.render(
    <Btn/>,
    document.getElementById('demo')
)*/
var products = [
    {category:'Sporting Goods',price:'49.99$',stocked:true,name:'Football'},
    {category:'Sporting Goods',price:'45$',stocked:true,name:'Basketball'},
    {category:'Sporting Goods',price:'29$',stocked:true,name:'Tennisball'},
    {category:'Sporting Goods',price:'9.99$',stocked:false,name:'Readball'},
    {category:'Electronics Goods',price:'99.99$',stocked:true,name:'I-watch'},
    {category:'Electronics Goods',price:'109$',stocked:true,name:'i-pod'},
    {category:'Electronics Goods',price:'299$',stocked:true,name:'XiaoMi-6'},
    {category:'Electronics Goods',price:'0.99$',stocked:false,name:'Note-7'}
];

var SearchBtn = React.createClass({
    getInitialState:function(){
        return {
            myText:'search you want'
        }
    },
    changeValue:function(e){
        if(this.state.myText == 'search you want'){
            this.setState({
                myText:''
            })
        }else{
            this.setState({
                myText:e.target.value
            })
        }
        this.props.onHandleText(e.target.value);
        this.refs.myInput.style.color = "black";
    },
    getDefaultProps:function(){
        return {
            texts:'only show products in stock',
            boxStyle:{
                height:'80px',
                width:'300px',
                overflow:'hidden',
                border:'1px solid pink',
                position:'relative'
            },
            div2Style:{
                marginTop:'7px',
            },
            input1:{
                height:'30px',
                lineHeight:'30px',
                width:'100%',
                color:'grey',
                wordSpacing:'5px',
                fontSize:'20px',
                textIndent:'15px'
            },
            spanStyle:{
                color:'red',
                fontSize:'20px',
                lineHeight:'40px',
            },
        }
    },
    render:function(){
        return (
            <div className = "navBox" style = {this.props.boxStyle}>
                <input type= "text" style = {this.props.input1} ref= 'myInput' value = {this.state.myText} onChange = {this.changeValue}></input>
                <div style = {this.props.div2Style}>
                    <input type= "checkbox" onClick= {this.props.handler}></input>
                    <span style = {this.props.spanStyle} >{this.props.texts}</span>
                </div>
            </div>
        )
    }
})

var ProductList = React.createClass({
    componentWillMount:function(){
        this.onHandleChange();
    },
    shouldComponentUpdate:function(nextProps,nextState){
        this.props = nextProps;
        // this.props.offStock = nextProps.offStock;
        // Error this cannot be changed ;
        //nextState = bull ,cause there is no state that we  did not difine it before on using it;
        this.onHandleChange();
        return true;
        // this function need you loopBack a boolean value  
    },
    onHandleChange:function(){
        var oList = [],
            oText = this.props.typeText,
            obj = {},
            goods = this.props.goodsInfo,
            stockFlag = this.props.offStock;
        goods.forEach(function(ele,index){
            var flag = '';
            if(!obj[ele.category]){
                obj[ele.category] = '111';
                oList.push(
                    <ListHead key ={index + 10} tags= {ele.category}></ListHead>
                )
            };
            if(!ele.stocked){
                flag = 'stocked';
            }
            if(stockFlag && !ele.stocked){

            }else{
                if(ele.name.indexOf(oText) !== -1){
                    oList.push(
                            <List name = {ele.name} price = {ele.price} stocked = {flag} key ={index + 100}></List>
                    )
                }
            }
        })
        this.oList = oList;
    },
    getDefaultProps:function(){
        return {
            pStyle:{
                width:'50%',
                height:'40px',
                lineHeight:'40px',
                fontSize:'20px',
                padding:'0',
                margin:'0',
                display :'inline-block',
                textIndent:'30px'
            }
        }
    },
    render:function(){
        return (
            <div>
                <p style = {this.props.pStyle}>Name</p>
                <p style = {this.props.pStyle}>Price</p>
                {
                    this.oList
                }
            </div>
        )
    }
})

var  ListHead = React.createClass({
    getDefaultProps:function(){
        return {
            style:{
                height:'40px',
                width:'100%',
                fontSize:'20px',
                textIndent:'30px',
                color:'blue'
            }
        }
    },
    render:function(){
        return(
            <div style = {this.props.style}>{this.props.tags}</div>
        )
    }
});
var  List = React.createClass({
    getDefaultProps:function(){
        return {
            ulStyle:{
                listStyle:'none',
                height:'30px',
                width:'100%',
                padding:'0px',
                position:'relative',
                margin:'0px',
                textIndent:'30px',
            },
            liStyle:{
                lineHeight:'30px',
                width:'50%',
                float:'left',
                fontSize:'15px',
            },
        }
    },
    render:function(){
        return (
                <ul style = {this.props.ulStyle} className = {this.props.stocked}>
                    <li style={this.props.liStyle}>{this.props.name}</li>
                    <li style={this.props.liStyle}>{this.props.price}</li>
                </ul>
        )
    }
})


var App = React.createClass({
    getInitialState:function(){
        return {
            offStocked:false,
            typeText:"",
        }
    },
    changeOffStocked:function(){
        this.setState({
            offStocked:!this.state.offStocked
        })
    },
    onHandleText:function(oText){
        this.setState({
            typeText:oText
        })
    },
    getDefaultProps:function(){
        return {
            style:{
                marginLeft:'20px',
                width:'300px'            
            }
        }
    },
    render:function(){
        return (
            <div style = {this.props.style}>
                <SearchBtn handler = {this.changeOffStocked} onHandleText = {this.onHandleText}></SearchBtn>
                <ProductList typeText = {this.state.typeText} offStock = {this.state.offStocked} goodsInfo = {this.props.goodsInfo}></ProductList>
            </div>
        )
    }
})

ReactDom.render(
    <App goodsInfo = {products}/>,
    document.getElementById('demo')
)