import DataSource from '@splunk/datasources/DataSource';
import DataSet from '@splunk/datasource-utils/DataSet';
import { globalTime } from './timecontext';

function capAt(fields, columns, timeColIdx, untilRow) {
    return DataSet.fromJSONCols(
        fields,
        columns.map((c) => c.slice(0, untilRow))
    );
}

function nullAfter(fields, columns, timeColIdx, untilRow) {
    return DataSet.fromJSONCols(
        fields,
        columns.map((c, i) => {
            if (i === timeColIdx) {
                return c;
            }
            return c.map((v, r) => (r >= untilRow ? null : v));
        })
    );
}

export default class TimelapseDataSource extends DataSource {
    constructor(options = {}, context = {}) {
        super(options, context);
        this.uri = options.uri;
        this.data = options.data;
    }

    request(options) {
        options = options || {};
        return (observer) => {
            const onabortCallbacks = [];

            const timeFieldIdx = this.data.fields.indexOf('_time');

            const parsedTimes = this.data.columns[timeFieldIdx].map((v) => new Date(v).getTime());

            const updateUntilTime = ([time]) => {
                const t = globalTime._cur;
                console.log(new Date(time));
                let untilRow = parsedTimes.findIndex((v) => v > t);
                console.log(untilRow);
                if (untilRow < 0) {
                    untilRow = Infinity;
                }
                const fn = capAt;
                observer.next({
                    data: fn(this.data.fields, this.data.columns, timeFieldIdx, untilRow),
                    meta: {},
                });
            };

            onabortCallbacks.push(globalTime.subscribeToTimeSpan(updateUntilTime));

            return () => {
                for (const cb of onabortCallbacks) {
                    try {
                        cb();
                    } catch (e) {
                        console.error('Abort callback failed', e);
                    }
                }
            };
        };
    }
}
