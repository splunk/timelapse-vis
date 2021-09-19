import React, { Component } from 'react';
import Select from '@splunk/react-ui/Select';

export default class ListDashboards extends Component {
    constructor(props) {
        super(props);
        this.state = { indexes: [] };
        this.fetchIndexes();
    }

    onCheck = itemId => {
        const indexes = this.state.indexes;
        const item = indexes.find(currentItem => currentItem.id === itemId);
        item.done = !item.done;
        this.setState({ indexes });
    };



    fetchIndexes() {

        const qs = obj =>
            Object.entries(obj)
                .map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
                .join('&');

        fetch(`/splunkd/services/data/ui/views?${qs({
            output_mode: 'json',
            count: 0,
            offset: 0,
            search: `(isDashboard=1 AND isVisible=1 AND (version=2))`,
        })}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const indexes = data.entry.map((entry, index) => ({
                    id: index,
                    title: entry.name,
                    done: false,
                }));
                this.setState({ indexes });
            })
            .catch(e => {
                console.error('Error during index retrieval/parsing', e);
            });
    }

    render() {
        const indexes = this.state.indexes;
        const itemRows = [];

        for (let item of indexes) {
            const row = (
                <Select.Option value={item.title} label={item.title} />
            );
            itemRows.push(row);
        }
        console.log(indexes)
        return (
            <Select onChange={this.props.changehandler} id="dashboardid">

                {itemRows}
                </Select>
        );
    }
}