let row=document.querySelector(".row");
let column=document.querySelector(".column");
let header=document.querySelector("#header")
let table=document.querySelector("table")


window.onbeforeunload = function()
{
    var conf = confirm("Your data not save.\n Are you sure?");
    if(conf)
    {
        window.location.reload();
    }
    else
    {
        return "";
    }
};
window.onbeforeunload = function (e) {
    e = e || window.event;
    
    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Sure?';
    }
    
    // For Safari
    return 'Sure?';
};
function ValueToggle(){
    let TD=[...document.querySelectorAll("td")]
    TD.forEach((item, index)=>{
        item.addEventListener("click",()=>{
            for(let i=0;i<TD.length;i++){
                TD[i].style.backgroundColor="";
            }
            item.innerText=item.innerText=="0"? "1":"0"
            item.style.backgroundColor="rgb(0, 0, 0)"
            
        })
        item.addEventListener("contextmenu",(e)=>{
            for(let i=0;i<TD.length;i++){
                TD[i].style.backgroundColor="";
            }
            item.innerText="X"
            item.style.backgroundColor="rgb(0, 0, 0)"
            e.preventDefault()
        })
    })
    

    
}
ValueToggle()  


function RowAdder(){
    ValueToggle()  
    function firstChild(){
        let header=document.querySelector("#header")
        for(let i=0;i<header.children.length;i++){
            if(header.children[i].classList.contains("output")){
                return i;
            }
        }
    }
    let btn_output=document.querySelector("#Output");
    row.addEventListener("click",()=>{
        ValueToggle()
        let output=[...document.querySelectorAll(".opHeader")];
        let header=document.querySelector("#header")
        let tmpTr=document.createElement("tr");
        for(let i=0;i<header.childElementCount;i++){
            let tmpTd=document.createElement("td");
            tmpTd.innerText="0"
            let className=(i>=header.childElementCount-output.length && i<header.childElementCount)?"output":"_";
            tmpTd.classList.add(className);
            tmpTr.append(tmpTd);
        }
        table.children[0].append(tmpTr);
        ValueToggle()
        
    })
    column.addEventListener("click",()=>{
        ValueToggle()
        let header=document.querySelector("#header")
        let table=document.querySelector("table")
        let lastName
        for(let i=0;i<header.childElementCount;i++){
            if(header.children[i].classList.contains("output")){
                lastName=header.children[i-1].innerText
                break
            }
        }
        let tmpHeader=document.createElement("th");
        tmpHeader.innerText=String.fromCharCode(lastName.charCodeAt(0)+1);
        tmpHeader.setAttribute("contenteditable","");
        header.insertBefore(tmpHeader,header.children[firstChild()]);
        for(let i=0;i<table.children[0].childElementCount;i++){
            if(table.children[0].children[i].id!="header"){
                lastChild=table.children[0].children[i].children[firstChild()-1]
                let tmpTd=document.createElement("td");
                tmpTd.innerText="0";
                table.children[0].children[i].insertBefore(tmpTd,lastChild);
            }
        }
        
        let output=[...document.querySelectorAll(".opHeader")];
        let count=Math.pow(2,header.childElementCount-output.length);
        header=document.querySelector("#header")
        table=document.querySelector("table")
        let completeRow=(count-table.children[0].childElementCount)
        for(let i=0;i<=completeRow;i++){
            let tmpTr=document.createElement("tr");
            for(let j=0;j<header.childElementCount;j++){
                let tmpTd=document.createElement("td");
                tmpTd.innerText="0"
                let className=(j>=header.childElementCount-output.length && j<header.childElementCount)?"output":"_";
                tmpTd.classList.add(className);
                tmpTr.append(tmpTd);
                
                
            }
            table.children[0].append(tmpTr);
        }
        ValueToggle()
    })
    btn_output.addEventListener("click",()=>{
        ValueToggle()
        let output=[...document.querySelectorAll(".output")];
        
        let header=document.querySelector("#header")
        
        tmpTh=document.createElement("th");
        tmpTh.setAttribute("contenteditable","")
        tmpTh.innerText="Output";
        tmpTh.classList.add("output","opHeader")
        output.forEach((item,index)=>{
            tmpTh.innerText=tmpTh.innerText==item.innerText?tmpTh.innerText+1:tmpTh.innerText;
            
        })
        header.append(tmpTh)
        let table=document.querySelector("table")
        header=document.querySelector("#header")
        for(let i=0;i<table.children[0].childElementCount;i++){
            if(table.children[0].children[i].id!="header"){
                let lastChild=table.children[0].children[i].children[table.children[0].children[i].childElementCount-1]
                let tmpTd=document.createElement("td");
                tmpTd.classList.add("output")
                tmpTd.innerText="0";
                table.children[0].children[i].append(tmpTd);
                
                
            }
        }
        ValueToggle()
    })
    
    
    
}
RowAdder()

function Delete(){
    ValueToggle()  
    let del_r=document.querySelector(".Delete_row");
    let del_c=document.querySelector(".Delete_column");
    let del_pos_col=document.querySelector(".Delete_sp_col");
    let del_pos_row=document.querySelector(".Delete_sp_row");
    
    del_r.addEventListener("click",()=>{
        ValueToggle() 
        let row=document.querySelectorAll("tr");
        if(table.children[0].children.length>2){
            table.children[0].deleteRow(table.children[0].childElementCount-1)
        }else{
            alert("table at least has 1 row or cell")
        }
        ValueToggle()  
    })
    del_c.addEventListener("click",()=>{
        ValueToggle() 
        let row=document.querySelectorAll("tr");
        let output=[...document.querySelectorAll(".opHeader")];
        let i=0;
        row.forEach((item,index)=>{
            if(item.children.length-output.length>1){
                item.deleteCell(item.children.length-output.length-1);
            }else {
                if(i==0){
                    alert("table at least has 1 row or column");
                    i++
                }
            }
        })
        let header=document.querySelector("#header")
        output=[...document.querySelectorAll(".opHeader")];
        let count=Math.pow(2,header.childElementCount-output.length);
        let table=document.querySelector("table");
        let completeRow=table.children[0].childElementCount-count;
        console.log(completeRow)
        for(let i=1;i<completeRow;i++){
            table.children[0].deleteRow(table.children[0].childElementCount-1)
        }
        ValueToggle()  
    })
    del_pos_col.addEventListener("click",()=>{
        ValueToggle() 
        let table=document.querySelector("table");
        let row=document.querySelectorAll("tr");
        let pos=document.querySelector("#pos_data_col");
        let output=[...document.querySelectorAll(".opHeader")];
        if(pos.valueAsNumber<=row[0].children.length && pos.valueAsNumber>0){
            let i=0;
            row.forEach((item,index)=>{
                if(item.children.length-output.length>1){
                    item.deleteCell(pos.valueAsNumber-1);
                    
                }else {
                    if(i==0){
                        alert("table at least has 1 row or column");
                        i++
                    }
                }
            })
        }else{
            alert("Position smaller than or bigger than column");
        }
        ValueToggle()  
    })
    
    del_pos_row.addEventListener("click",()=>{
        ValueToggle() 
        let table=document.querySelector("table");
        let row=document.querySelectorAll("tr");
        let pos=document.querySelector("#pos_data_row");
        if(pos.valueAsNumber>0 && pos.valueAsNumber<=table.children[0].children.length){
            if(table.children[0].children.length>2){
                table.children[0].deleteRow(pos.valueAsNumber)
            }else{
                alert("table at least has 1 row or cell")
            }
            
        }else{
            alert("Position smaller than or bigger than row");
        }
        ValueToggle()  
    })
}
Delete();
function FixScroll(){
    var Btn_con=document.querySelector("#Button_container")
    var table_con=document.querySelector("#table_container");
    window.addEventListener("scroll",(e)=>{
        if(window.scrollY>0){
            Btn_con.style.position="fixed"
            Btn_con.style.top="0px"
            table_con.style.marginTop=`${Btn_con.offsetHeight}px`;
        }else{
            Btn_con.style.position=""
            Btn_con.style.top=""
            table_con.style.marginTop="";
        }
    })
}
FixScroll()

function generate(){
    let output=[...document.querySelectorAll(".output")];
    let outputHead=[...document.querySelectorAll(".opHeader")];
    let header=[...document.querySelector("#header").children]
    let _text=[],text_1="",_text_1=[],text_2="",tmp_1="",tmp_2="";
    let k=0;
    let x=0;
    // for(let i=0;i<header.length;i++){
    //     if(header[i].classList.contains("output")){
    //         _text[k]=`${header[i].innerText}=`;
    //         k++;
    //     }
    // }
    let table=document.querySelector("table").children[0]
    for(k=header.length-outputHead.length;k<header.length;k++){
        text_1="";
        text_2="";
        for(let i=0;i<table.childElementCount;i++){
            if(table.children[i].children[k].innerText=="1"){
                for(let j=0;j<header.length-outputHead.length;j++){
                    if(table.children[i].children[j].innerText=="1"){
                        //text_1+=header[j].innerText;
                        tmp_1+=header[j].innerText;
                        //text_2+=header[j].innerText;
                        tmp_2+=header[j].innerText;
                    }else if(table.children[i].children[j].innerText=="0"){
                        //text_1+=`!${header[j].innerText}`;
                        tmp_1+=`!${header[j].innerText}`;
                        //text_2+=`\\\overline{${header[j].innerText}}`;
                        tmp_2+=`\\\overline{${header[j].innerText}}`;
                    }else{
                        tmp_1+="";
                        tmp_2+=""
                    }
                }

                if(!isExist(tmp_1,text_1)){
                    text_1+=tmp_1+"+";
                    tmp_1="";
                }else{
                    tmp_1="";
                }
                if(!isExist(tmp_2,text_2)){
                    text_2+=tmp_2+"+";
                    tmp_2="";
                }else{
                    tmp_2="";
                }
            }
        }
        text_1=text_1[text_1.length-1]=="+"?outputHead[x].innerText+"="+text_1.slice(0,-1):outputHead[x].innerText+"="+text_1;
        text_2=text_2[text_2.length-1]=="+"?outputHead[x].innerText+"="+text_2.slice(0,-1):outputHead[x].innerText+"="+text_2;
        _text.push(text_1);
        _text_1.push(text_2);
        x++;
        
    }
    
    // for(let j=1;j<table.childElementCount;j++){
    //     if(table.children[j].children[header.length-1].innerText=="1"){
    //         for(let i=0;i<header.length-1;i++){
    //             if(table.children[j].children[i].innerText=="1"){
    //                 _text+=header[i].innerText;
    //             }else{
    //                 _text+="!"+header[i].innerText;
    //             }
    //         }
    //             _text+="+";
    
    //     }
    
    // }
    text_1="",text_2="";
    _text.forEach((item,index)=>{
        text_1+="<p>"+item+"</p>"
    })
    _text_1.forEach((item,index)=>{
        text_2+="<p>"+item+"</p>"
    })
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    navigator.clipboard.writeText(_text_1);
    Swal.fire({
        title: 'Are you want to copy this?',
        html: `${text_1}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Copy'
    }).then((result) => {
        if (result.isConfirmed) {
            navigator.clipboard.writeText(_text);
            
            Swal.fire(
                'Copies',
                'success'
                )
            }
        })
}
function isExist(text,text1){
    for(let i=0;i<text1.split("+").length;i++){
        if(text1.split("+")[i]==text){
            return true
        }
    }
    return false;
}
