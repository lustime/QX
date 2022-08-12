const lu_conf = $prefs.valueForKey('lus_conf');
const conf = eval('(' + lu_conf + ')')
const kqyc = conf.kqyc;
const method = "POST";
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
const first_day = year + '-' + month + '-' + '01';
const last_day = year + '-' + month + '-' + day;
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
    const result = response.body;
    var lateOrLeaveEarlyTimes = result.bo.abnormalAttendanceStatisticDTO.lateOrLeaveEarlyTimes;
    var absenceTimes = result.bo.abnormalAttendanceStatisticDTO.absenceTimes;
    var msg_all = "缺席:" + absenceTimes + "次" + "\n" + "迟到早退:" + lateOrLeaveEarlyTimes + "次" + "\n";
    $notify("考勤异常", "", msg_all); // Success!
    $done();
}, reason => {
    // reason.error
    $notify("Title", "Subtitle", reason.error); // Error!
    $done();
});
