import del from '../img/del.svg'
import edit from '../img/edit.svg'
export class helpDesk {
    constructor(element){
        this.element = element;
    }
    init(){
        this.listTicket();
        this.addTicket ();
    }
    static create (type,className,content){
        let element = document.createElement(type);
        if(className != null || className != undefined){
            element.classList.add(className)
        }
        if(content != null || content != undefined){
            element.textContent = content;
        }
        return element;
    }
    listTicket (){
        const xhr = new XMLHttpRequest ();
        xhr.open('get','http://localhost:7070?method=allTickets');
        xhr.send();
        let response = new Promise ((resolve,reject)=>{
            xhr.onload = function() {
                return resolve(JSON.parse(xhr.response))
            };
        })
        response.then((data)=>{
            for(let value of data ){
                let ticketList = this.element.querySelector('.ticket-list');
                let ticketItem = helpDesk.create ('div','ticket-list__item',null);
                ticketItem.setAttribute('id',value.id)
                let ticketCheck = helpDesk.create ('input','ticket-list__item__check',null);
                ticketCheck.setAttribute('type','checkBox')
                let ticketContent = helpDesk.create ('p','ticket-list__item__content',value.name);
                let ticketDate = helpDesk.create ('p','ticket-list__item__date',value.created);
                let ticketEdit = helpDesk.create ('a','ticket-list__item__edit',null);
                let ticketDelete= helpDesk.create ('a','ticket-list__item__delete',null);
                let imgdel = helpDesk.create ('img','ticket-list__item__img',null);
                imgdel.src = del;
                ticketDelete.appendChild(imgdel);
                let imgedit = helpDesk.create ('img','ticket-list__item__img',null);
                imgedit.src = edit;
                ticketEdit.appendChild(imgedit);
                ticketItem.appendChild(ticketCheck);
                ticketItem.appendChild(ticketContent);
                ticketItem.appendChild(ticketDate);
                ticketItem.appendChild(ticketEdit);
                ticketItem.appendChild(ticketDelete);
                ticketList.appendChild(ticketItem);
                ticketDelete.addEventListener('click',this.deleteTicket.bind(this))
                ticketEdit.addEventListener('click',this.updateTicket.bind(this))
                let ticketLongDesk = helpDesk.create ('p','ticket-list__item__longDesk',value.description);
                ticketCheck.addEventListener('change',(e)=>{
                    if(e.target.checked){
                    ticketItem.appendChild(ticketLongDesk);
                    ticketItem.style.flexDirection = "column";
                    }else{
                        ticketLongDesk.remove();
                        ticketItem.style.flexDirection = "row";
                    }
                })
            }
        })
    }
    addTicket (){
        let addBtn = this.element.querySelector('.ticket-add__btn');
        addBtn.addEventListener('click',(e)=>{
            let addTicketWindow = helpDesk.create('div','ticket-add__window',null);
            let form = helpDesk.create('form','ticket-add__window__from',null);
            let addTicketWindowHeader = helpDesk.create('h3','ticket-add__window__header','Добавить тикет');
            let addTicketWindowDeskShort = helpDesk.create('h4','ticket-add__window__desk','Краткое описание');
            let addTicketWindowinputShort = helpDesk.create('input','ticket-add__window__desk__inputshort',null);
            let addTicketWindowDeskLong = helpDesk.create('h3','ticket-add__window__desk','Подробное описание');
            let addTicketWindowinputLong = helpDesk.create('input','ticket-add__window__desk__inputlong',null);
            let addTicketWindowbtns = helpDesk.create('div','ticket-add__window__btns',null);
            let addTicketWindowbtnsCancel = helpDesk.create('button','ticket-add__window__cancel','Отмена');
            let addTicketWindowbtnsAdd = helpDesk.create('button','ticket-add__window__add','Ок');
            form.appendChild(addTicketWindowHeader);
            form.appendChild(addTicketWindowDeskShort);
            form.appendChild(addTicketWindowinputShort);
            form.appendChild(addTicketWindowDeskLong);
            form.appendChild(addTicketWindowinputLong);
            form.appendChild(addTicketWindowbtnsCancel);
            form.appendChild(addTicketWindowbtnsAdd);
            form.appendChild(addTicketWindowbtns);
            addTicketWindow.appendChild(form);
            this.element.appendChild(addTicketWindow)
            addTicketWindowbtnsCancel.addEventListener('click',()=>{
                addTicketWindow.remove();
            })
            addTicketWindowbtnsAdd.addEventListener('click',(e)=>{
                e.preventDefault();
                const body = {
                    name:addTicketWindowinputShort.value,
                    description:addTicketWindowinputLong.value,
                    created: Date.now(),
                }
                const bodyJson = JSON.stringify(body)
                console.log(bodyJson)
                const xhr = new XMLHttpRequest ();
                xhr.open('POST','http://localhost:7070?method=createTicket');
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(bodyJson);
                let response = new Promise ((resolve,reject)=>{
                    return resolve(xhr.response)
                })
                response.then((result)=>{
                    console.log(result)
                })
                let list = document.querySelectorAll('.ticket-list__item');
                list.forEach((element)=>{
                    element.remove()
                })
                addTicketWindow.remove();
                this.listTicket ()
            })

        })
    }
    deleteTicket(e){
        console.log(e.target)
        let id = e.target.parentElement.parentElement.getAttribute('id');
        const xhr = new XMLHttpRequest ();
        xhr.open('get',`http://localhost:7070?method=deleteById&id=${id}`)
        xhr.send();
        let response = new Promise ((resolve,reject)=>{
            return resolve(xhr.response)
        })
        response.then((result)=>{
            console.log(result)
        })
        let list = document.querySelectorAll('.ticket-list__item');
        list.forEach((element)=>{
            element.remove()
        })
        this.listTicket ()
        
    }
    updateTicket (e){
        let task = document.querySelector('.ticket');
        console.log(this.element)
        let id = e.target.parentElement.parentElement.getAttribute('id');
        console.log(id)
        let addTicketWindow = helpDesk.create('div','ticket-add__window',null);
        let form = helpDesk.create('form','ticket-add__window__from',null);
        let addTicketWindowHeader = helpDesk.create('h3','ticket-add__window__header','Изменить тикет');
        let addTicketWindowDeskShort = helpDesk.create('h4','ticket-add__window__desk','Краткое описание');
        let addTicketWindowinputShort = helpDesk.create('input','ticket-add__window__desk__inputshort',null);
        let addTicketWindowDeskLong = helpDesk.create('h3','ticket-add__window__desk','Подробное описание');
        let addTicketWindowinputLong = helpDesk.create('input','ticket-add__window__desk__inputlong',null);
        let addTicketWindowbtns = helpDesk.create('div','ticket-add__window__btns',null);
        let addTicketWindowbtnsCancel = helpDesk.create('button','ticket-add__window__cancel','Отмена');
        let addTicketWindowbtnsAdd = helpDesk.create('button','ticket-add__window__add','Ок');
        form.appendChild(addTicketWindowHeader);
        form.appendChild(addTicketWindowDeskShort);
        form.appendChild(addTicketWindowinputShort);
        form.appendChild(addTicketWindowDeskLong);
        form.appendChild(addTicketWindowinputLong);
        form.appendChild(addTicketWindowbtnsCancel);
        form.appendChild(addTicketWindowbtnsAdd);
        form.appendChild(addTicketWindowbtns);
        addTicketWindow.appendChild(form);
        task.appendChild(addTicketWindow)
        addTicketWindowbtnsCancel.addEventListener('click',()=>{
            addTicketWindow.remove();
        })
        addTicketWindowbtnsAdd.addEventListener('click',(e)=>{
            e.preventDefault();
            const body = {
                name:addTicketWindowinputShort.value,
                description:addTicketWindowinputLong.value,
                created: Date.now(),
            }
            const bodyJson = JSON.stringify(body)
            console.log(bodyJson)
            const xhr = new XMLHttpRequest ();
            xhr.open('POST',`http://localhost:7070?method=updateById&id=${id}`);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(bodyJson);
            let response = new Promise ((resolve,reject)=>{
                return resolve(xhr.response)
            })
            response.then((result)=>{
                console.log(result)
            })
            let list = document.querySelectorAll('.ticket-list__item');
                list.forEach((element)=>{
                    element.remove()
                })
                addTicketWindow.remove();
                console.log(this)
                list.forEach((element)=>{
                    element.remove()
                })
                this.listTicket ()
        })
    }
}