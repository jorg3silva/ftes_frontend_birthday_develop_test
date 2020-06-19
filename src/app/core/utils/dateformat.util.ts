import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
    readonly DT_FORMAT = 'DD-MM-YYYY';

    parse(value: string): NgbDateStruct {
        if (value) {
            const mdt = moment(value.trim(), this.DT_FORMAT);
            return { day: mdt.day(), month: mdt.month() + 1, year: mdt.year() };
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        if (!date) {
            return '';
        }
        const mdt = moment([date.year, date.month - 1, date.day]);
        return mdt.isValid() ? mdt.format(this.DT_FORMAT) : '';
    }
}
