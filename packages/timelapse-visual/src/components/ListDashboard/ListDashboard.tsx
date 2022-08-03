/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import Select from '@splunk/react-ui/Select';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QS } from '../types/splunkTypes';

interface ListDashboardProps {
    changeHandler: (_event: unknown, { value }: { value: any; }) => void;
}


interface ListDashboardState {
    indexes: any;
}

export default class ListDashboard extends Component<ListDashboardProps, ListDashboardState> {

    constructor(props: ListDashboardProps) {
        super(props);
        this.state = { indexes: [] };
        this.fetchIndexes();
    }

    onCheck = (itemId) => {
        const { indexes } = this.state;
        const item = indexes.find((currentItem) => currentItem.id === itemId);
        item.done = !item.done;
        this.setState({ indexes });
    };

    fetchIndexes() {
        const qs = (obj) =>
            Object.entries(obj)
                .map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
                .join('&');

        fetch(
            `/splunkd/services/data/ui/views?${qs({
                output_mode: 'json',
                count: 0,
                offset: 0,
                search: `(isDashboard=1 AND isVisible=1 AND version=2)`,
            })}`,
            { credentials: 'include' }
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const indexes = data.entry.map((entry, index) => ({
                    id: index,
                    title: entry.name,
                    done: false,
                }));
                this.setState({ indexes: indexes });
            })
            .catch((e) => {
                console.error('Error during index retrieval/parsing', e);
            });
    }

    render(): JSX.Element {
        const { indexes } = this.state;
        const { changeHandler } = this.props;

        return (
            <Select onChange={changeHandler} id="dashboardid">
                {indexes.map((item) => (
                    <Select.Option key={item.id} value={item.title} label={item.title} />
                ))}
            </Select>
        );
    }
}
