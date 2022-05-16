import DataSource from '@splunk/datasources/DataSource';
import DataSet from '@splunk/datasource-utils/DataSet';
import { globalTime } from './timecontext';

function capAt(fields, columns, timeColIdx, untilRow) {
    return DataSet.fromJSONCols(
        fields,
        columns.map((c) => c.slice(0, untilRow))
    );
}

function selectLast(fields, columns, timeColIdx, untilRow, count) {
    return DataSet.fromJSONCols(
        fields,
        columns.map((c) => c.slice(untilRow - count, untilRow))
    );
}

function none(fields, columns, timeColIdx, untilRow, count) {
    return DataSet.fromJSONCols(fields, columns);
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
        if (options.hasOwnProperty('timelapseMethod')) {
            this.timelapseMethod = options.timelapseMethod;
        } else {
            this.timelapseMethod = 'capAt';
        }
        if (options.hasOwnProperty('paths_count')) {
            this.paths_count = options.paths_count;
        } else {
            this.paths_count = 1;
        }
    }

    request(options) {
        options = options || {};
        return (observer) => {
            const onabortCallbacks = [];

            const timeFieldIdx = this.data.fields.indexOf('_time');

            const parsedTimes = this.data.columns[timeFieldIdx].map((v) => new Date(v).getTime());

            const updateUntilTime = ([time]) => {
                const t = globalTime._cur;
                let untilRow = parsedTimes.findIndex((v) => v > t);

                if (untilRow < 0) {
                    untilRow = Infinity;
                }

                if (this.timelapseMethod == 'selectLast') {
                    observer.next({
                        data: selectLast(
                            this.data.fields,
                            this.data.columns,
                            timeFieldIdx,
                            untilRow,
                            this.paths_count
                        ),
                        meta: { status: 'done', totalCount: 1 },
                    });
                } else if (this.timelapseMethod == 'capAt') {
                    observer.next({
                        data: capAt(this.data.fields, this.data.columns, timeFieldIdx, untilRow),
                        meta: { status: 'done', totalCount: 1 },
                    });
                } else if (this.timelapseMethod == 'none') {
                    observer.next({
                        data: none(this.data.fields, this.data.columns),
                        meta: { status: 'done', totalCount: 1 },
                    });
                } else if (this.timelapseMethod == 'nullAfter') {
                    observer.next({
                        data: nullAfter(
                            this.data.fields,
                            this.data.columns,
                            timeFieldIdx,
                            untilRow
                        ),
                        meta: { status: 'done', totalCount: 1 },
                    });
                } else {
                    observer.next({
                        data: capAt(this.data.fields, this.data.columns, timeFieldIdx, untilRow),
                        meta: { status: 'done', totalCount: 1 },
                    });
                }
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
