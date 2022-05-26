import React, { Component } from 'react';
import Select from '@splunk/react-ui/Select';
import PropTypes from 'prop-types'

export default class ListDashboards extends Component {
    static propTypes = {
        changehandler: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = { indexes: [] };
        this.fetchIndexes();
    }
    
    onCheck = (itemId) => {
        const {indexes} = this.state;
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
                search: `(isDashboard=1 AND isVisible=1 AND (version=2))`,
            })}`,
            { credentials: 'include' }
        )
            .then((res) => res.json())
            .then((data) => {
                const indexes = data.entry.map((entry, index) => ({
                    id: index,
                    title: entry.name,
                    done: false,
                }));
                this.setState({ indexes });
            })
            .catch((e) => {
                console.error('Error during index retrieval/parsing', e);
            });
    }

    render() {
        const {indexes} = this.state;
        return (
            <Select onChange={this.props.changehandler} id="dashboardid">
                {indexes.map(([key,item]) => (
                    <Select.Option key={key} value={item.title} label={item.title} />
                ))}
            </Select>
        );
    }
}
