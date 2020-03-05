import moment from "moment";

class TDate {
    static minus(d1, d2) {
        return moment(d1, "M/D/YY").diff(moment(d2, "M/D/YY"));
    }

    static classicFormat(date) {
        return moment(date, "M/D/YY").format("DD/MM/YYYY");
    }
}

export default TDate;