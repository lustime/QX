const lu_conf = $prefs.valueForKey('lus_conf');
console.log(lu_conf);
console.log(666);
const conf = eval('(' + lu_conf+ ')')
console.log(conf)
const kqyc = conf.kqyc;
const method = "POST";
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
const first_day = year + '-' + month + '-' + '01';
const last_day = year + '-' +month + '-' +day;
const data = {
    "command": "KQ-JG-002",
    "params": {
        "pageDTO": {
            "pageSize": "100",
            "pageNo": "1"
        },
        "startDate": first_day,
        "endDate": last_day,
        "displayType": "01",
        "empId": kqyc.empId
    }
};

const myRequest = {
    url: kqyc.url,
    method: method, // Optional, default GET.
    headers: kqyc.headers, // Optional.
    body: JSON.stringify(data) // Optional.
};

$task.fetch(myRequest).then(response => {
    // response.statusCode, response.headers, response.body
    console.log(response.body);
    $notify("考勤异常", "", response.body); // Success!
    $done();
}, reason => {
    // reason.error
    $notify("Title", "Subtitle", reason.error); // Error!
    $done();
});
