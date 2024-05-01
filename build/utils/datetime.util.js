"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeUtil = void 0;
const core_1 = require("@js-joda/core");
class DateTimeUtil {
    static toString(localDate) {
        if (localDate instanceof core_1.LocalDate) {
            return localDate.format(DateTimeUtil.DATE_FORMATTER);
        }
        else if (localDate instanceof core_1.LocalDateTime) {
            return localDate.format(DateTimeUtil.DATE_TIME_FORMATTER);
        }
        return '';
    }
    static toDate(localDate) {
        if (!localDate) {
            return null;
        }
        return (0, core_1.convert)(localDate).toDate();
    }
    static toLocalDate(date) {
        if (!date) {
            return null;
        }
        return core_1.LocalDate.from((0, core_1.nativeJs)(date));
    }
    static toLocalDateTime(date) {
        if (!date) {
            return null;
        }
        return core_1.LocalDateTime.from((0, core_1.nativeJs)(date));
    }
    static toLocalDateBy(strDate) {
        if (!strDate) {
            return null;
        }
        return core_1.LocalDate.parse(strDate, DateTimeUtil.DATE_FORMATTER);
    }
    static toLocalDateTimeBy(strDate) {
        if (!strDate) {
            return null;
        }
        return core_1.LocalDateTime.parse(strDate, DateTimeUtil.DATE_TIME_FORMATTER);
    }
    static toLocalDateMilliTimeBy(strDate) {
        if (!strDate) {
            return null;
        }
        return core_1.LocalDateTime.parse(strDate, DateTimeUtil.DATE_MILLI_TIME_FORMATTER);
    }
}
exports.DateTimeUtil = DateTimeUtil;
DateTimeUtil.DATE_FORMATTER = core_1.DateTimeFormatter.ofPattern('yyyy-MM-dd');
DateTimeUtil.DATE_TIME_FORMATTER = core_1.DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');
DateTimeUtil.DATE_MILLI_TIME_FORMATTER = core_1.DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss:AA');
//# sourceMappingURL=datetime.util.js.map