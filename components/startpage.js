'use strict';
import React from 'react';
import Header from "./Header"
import {getHead} from "./getHead";

function to0(t){
    if(t<10){
        return "0"+t.toString()
    }else{
        return t.toString()
    }
}

export default class Persik extends React.Component {

    constructor(props){
        super(props);
        this.state={
            data:null,
        }


    }
    componentDidMount() {
        fetch("http://localhost:15234/getNews",{method:"POST"}).then(
            (response)=>{
                return response.json()
            }
        )
            .then((data)=>{
                this.setState({data:data})

            })
            .catch(e=>{
                alert("Ошибка соединения с сервером")
            })
    }
    getTime(unix){
        var dt = new Date(unix*1000)
        var x = new Date(Date.now())
        var result=""
        var day=to0(dt.getDate())
        var month=to0(dt.getMonth()+1)
        var year=to0(dt.getFullYear())
        var min=to0(dt.getMinutes())
        var hours=to0(dt.getHours())
        if(unix>Math.ceil(Date.now()/1000)-x.getHours()*60*60-x.getMinutes()*60-x.getSeconds()){
            result=result+"Сегодня, в "+hours+":"+min
        }else if(unix>Math.ceil(Date.now()/1000)-x.getHours()*60*60-x.getMinutes()*60-x.getSeconds()-60-60-24){
            result=result+"Вчера, "+hours+":"+min
        }else{
            result=day+"."+month+"."+year+", "+hours+":"+min
        }
        return result
    }
    render() {

        return(
            <div>
                {getHead("News Site","просто новости",[])}

                <Header shownavigate={false}></Header>

                <div className={"parent2"}>
                    {this.state.data!=null?(
                        <a target={"_blank"} href={"/article/"+this.state.data.result.main[0]['id'].toString()}>
                            <div>
                                <div style={{
                                    backgroundImage : " linear-gradient(" +
                                        "      rgba(0, 0, 0, 0.6), " +
                                        "      rgba(0, 0, 0, 0.6)" +
                                        "    ), url("+this.state.data.result.main[0].coverImage+")",
                                    backgroundSize:"cover",
                                    height: "60vh",
                                    display: 'flex',
                                    backgroundPosition:"50% 50%",
                                    alignItems: 'flex-end',
                                    justifyContent: 'left',

                                }}>
                                    <div style={{width:"100%"}}>
                                        <div>
                                            <table width="100%" style={{height:"60vh",overflow:"hidden"}}>
                                                <tr >
                                                    <td width="50%" valign="bottom">
                                                        <div style={{width:"100%"}}>
                                                            <div style={{paddingLeft:"50px",marginBottom:"-20px"}}>
                                                                {JSON.parse(this.state.data.result.main[0].tags).map((e)=>{
                                                                    return (
                                                                        <div className={"tags"}>
                                                                            {e}
                                                                        </div>
                                                                    )
                                                                })}

                                                            </div>

                                                            <div style={{marginLeft:"50px",marginBottom:"20px",maxWidth:"800px"}}>
                                                                <h1 style={{fontSize:"40px",color:"white"}}>{this.state.data.result.main[0].title}</h1>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td width="50%" align="right" valign="top">
                                                        <div className={"scrollHidden"} style={{color:"white",textAlign:"left",width:"100%",display:"block",maxWidth:"500px",overflow:"auto",maxHeight:"60vh"}}>
                                                            <h1 style={{fontSize:"20px"}}>
                                                                Главные новости
                                                            </h1>
                                                            <div>
                                                                {this.state.data.result.main.map((e,i)=>{
                                                                    if(i==0){
                                                                        return null
                                                                    }
                                                                    return (
                                                                        <a target={"_blank"} href={"/article/"+e['id']}>
                                                                            <div className={"newsOnStartpage"} style={{padding:"5px",marginTop:"5px",marginRight:"5px",cursor:"pointer",color:"white"}}>
                                                                                {JSON.parse(this.state.data.result.main[i].tags).map((ef)=>{
                                                                                    return (
                                                                                        <div className={"tags"}>
                                                                                            {ef}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                                <div style={{fontSize:"11px"}}>{this.getTime(e.publishedAt)}</div>
                                                                                {e.title}
                                                                                <div style={{backgroundColor:"gray",height:"1px",marginTop:"5px"}}></div>

                                                                            </div>
                                                                        </a>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </td>

                                                </tr>

                                            </table>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </a>
                    ):(
                        <div className="loader">
                            <div className="inner one"></div>
                            <div className="inner two"></div>
                            <div className="inner three"></div>
                        </div>

                    )}
                    <div style={{}}>


                        {this.state.data!=null?(
                           <div>
                               <h2 style={{color:"gray"}}>Остальные статьи</h2>
                               <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                                   {this.state.data.result['all'].map((e,i)=>{

                                       return (
                                           <a target={"_blank"} href={"/article/"+e['id']}>
                                               <div style={{width:"270px",marginBottom:"10px"}}>
                                                   <div className={"tabs"} style={{width:"250px",marginTop:"5px",marginRight:"5px",cursor:"pointer",borderRadius:"10px",
                                                       display:"inline-block"}}>
                                                       <div style={{backgroundImage : "url("+this.state.data.result.all[i].coverImage+")",
                                                           backgroundSize:"cover",
                                                           height: "200px",
                                                           width:"250px",
                                                           backgroundPosition:"50% 50%",
                                                           borderTopRightRadius:"10px",borderTopLeftRadius:"10px",
                                                           alignItems: 'flex-end',
                                                           justifyContent: 'left',}}/>

                                                       <div  style={{padding:"5px",borderBottomRightRadius:"10px",borderBottomLeftRadius:"10px"}}>
                                                           <div style={{fontSize:"11px"}}>{this.getTime(e.publishedAt)}</div>
                                                           {JSON.parse(this.state.data.result.main[i].tags).map((ef)=>{
                                                               return (
                                                                   <div className={"tags"}>
                                                                       {ef}
                                                                   </div>
                                                               )
                                                           })}
                                                           <div>
                                                               {e.title}
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           </a>


                                       )
                                   })}
                               </div>
                           </div>
                        ):(null)}

                    </div>

                </div>
            </div>
       )
    }
}


