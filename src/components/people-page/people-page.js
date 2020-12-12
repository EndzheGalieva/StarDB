import React, {Component} from 'react';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import './people-page.css';
import SwapiService from "../../services/swapi-service";
import Row from '../row';
import ErrorIndicator from "../error-indicator";

class ErrorBoundry extends Component {

    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }


    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return this.props.children;
    }
}

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3
    };


    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson});
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear}) => (
                    `${name} (${gender}, ${birthYear})`)}/>
        );

        const personDetails = (
            <ErrorBoundry>
                <PersonDetails personId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return (
            <Row left={itemList} right={personDetails}/>
        );
    }
}
