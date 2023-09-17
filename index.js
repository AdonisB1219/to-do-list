import express from "express"
import bodyParser from "body-parser"

const port = 3000;
const app = express();

let todayList = [];
let tomorrow = [];
let next_weeks = [];
let past = [];
let list = [];
let cont = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {list : list});
});

app.get("/today", (req, res) => {
    res.render("index.ejs", {list : todayList, todayCol : "hola"});
});

app.get("/tomorrow", (req, res) => {
    res.render("index.ejs", {list : tomorrow, tomorrowCol : "hola"});
});

app.get("/next_weeks", (req, res) => {
    next_weeks.sort((a, b) => {
        if (a.dateForComparing > b.dateForComparing) {
          return 1;
        }
        if (a.dateForComparing < b.dateForComparing) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    res.render("index.ejs", {list : next_weeks, nextWeeksCol : "hola"});
});

app.get("/past", (req, res) => {
    past.sort((a, b) => {
        if (a.dateForComparing > b.dateForComparing) {
          return 1;
        }
        if (a.dateForComparing < b.dateForComparing) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    res.render("index.ejs", {list : past, pastCol : "hola"});
});

app.post("/submit", (req, res) =>{
    let date = (req.body["date"]);
    let today = new Date();
    let ymd = date.split("-");
    let year = Number(ymd[0]);
    let month = Number(ymd[1] - 1);
    let day = Number(ymd[2]);
    let toDoDate = new Date();
    toDoDate.setDate(day);
    toDoDate.setFullYear(year);
    toDoDate.setMonth(month);
    let toDo = {todo : req.body["todo"], date : toDoDate.toDateString(), dateForComparing : toDoDate, checked : false, id : cont};
    cont ++;
    if(today.getFullYear() == year && today.getMonth() == month){
        if(today.getDate() == day){
            todayList.push(toDo);
            list = todayList;
        }
        else if(today.getDate() + 1 == day){
            tomorrow.push(toDo);
            list = tomorrow;
        }
        else if(today.getDate() < day){
            next_weeks.push(toDo);
            list = next_weeks;
        }
        else if(today.getDate() > day){
            past.push(toDo);
            list = past;
        }
    }
    else if(today.getMonth() < month || today.getFullYear() < year){
        console.log(today.getMonth() + " " + today.getFullYear());
        next_weeks.push(toDo);
        list = next_weeks;

    }
    else if((today.getMonth() > month || today.getFullYear() > year) && year != 0){
        past.push(toDo);
        list = past;
    }
    list.sort((a, b) => {
        if (a.dateForComparing > b.dateForComparing) {
          return 1;
        }
        if (a.dateForComparing < b.dateForComparing) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

        res.render("index.ejs", {list : list});
    
});

app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});


