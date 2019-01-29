export function randomDate(startDate:Date, endDate:Date):Date{
    let date = new Date();
    date.setTime(Math.floor(randomNumber(startDate.getTime(), endDate.getTime())));
    return date;
}

export function randomNumber(min:number, max:number):number{
    return Math.random() * (max-min) + min;
}