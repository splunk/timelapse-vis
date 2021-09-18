import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import { StyledContainer, StyledGreeting } from './DashboardselectorStyles';
import ListDashboards from '@splunk/listdashboards';



class DashboardSelector extends Component {


    static propTypes = {
        name: PropTypes.string,
    };

    static defaultProps = {
        name: 'User',
    };

    constructor(props) {
        super(props);
        this.state = { pickertype: "rangeslider", dashboardid: ""};
        this.handleChangePickerType = this.handleChangePickerType.bind(this);
        this.handleDashboardIdChange = this.handleDashboardIdChange.bind(this);
    }

    handleDashboardIdChange(event){
        this.setState({
            dashboardid: event.target.value
         });
    };
        
    handleChangePickerType (event){
        this.setState({
            pickertype: event.target.value
         });
    };

    render() {
        return (
            <StyledContainer>
               <p>Use the following form to build your custom dashboard URL:</p>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Select a Dashboard:
                            </td>
                            <td>
                                Select a Type of Input:
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ListDashboards changehandler={this.handleDashboardIdChange}/>
                            </td>
                            <td>
                                <select onChange={this.handleChangePickerType}>
                                    <option value="rangeslider">Range Slider</option>
                                    <option value="timelapse">Timelapse</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>Use the following URL to view your custom dashboard:</p>
            <a target="_blank" href={window.location.href.replace(/[^\/]+$/,'') + this.state.pickertype + "?dashboardid=" + this.state.dashboardid}>{window.location.href.replace(/[^\/]+$/,'') + this.state.pickertype + "?dashboardid=" + this.state.dashboardid}</a>
            </div>
            </StyledContainer>

            
        );
    }
}

export default DashboardSelector;
