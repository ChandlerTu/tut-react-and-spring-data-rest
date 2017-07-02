'use strict';

// tag::vars[]
const React = require( 'react' );
const ReactDOM = require( 'react-dom' )
const client = require( './client' );
// end::vars[]

// tag::app[]
class App extends React.Component {

    constructor( props ) {
        super( props );
        this.state = { employees: [] };
    }

    componentDidMount() {
        client( { method: 'GET', path: '/api/employees' } ).done( response => {
            this.setState( { employees: response.entity._embedded.employees } );
        } );
    }

    render() {
        return (
            <div>
                <TodoApp />
            </div>
        )
    }
}
// end::app[]

class Timer extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { secondsElapsed: 0};
    }

    tick() {
        this.setState(( prevState ) => ( {
            secondsElapsed: prevState.secondsElapsed + 1
        } ) );
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 100 );
    }

    componentWillUnmount() {
        clearInterval( this.interval );
    }

    render() {
        return (
            <div>Seconds Elapsed: {(Array(2).join(0) + Math.floor(this.state.secondsElapsed/3600)).slice(-2)}:{(Array(2).join(0) + Math.floor(this.state.secondsElapsed%3600/60)).slice(-2)}:{(Array(2).join(0) + Math.floor(this.state.secondsElapsed%60)).slice(-2)}</div>
        );
    }
}

class TodoApp extends React.Component {
    constructor( props ) {
        super( props );
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.state = { items: [], text: '',secondsElapsed: 0 };
    }

    tick() {
        this.setState(( prevState ) => ( {
            secondsElapsed: prevState.secondsElapsed + 1
        } ) );
    }

    componentDidMount() {
      //  this.interval = setInterval(() => this.tick(), 1000 );
    }

    componentWillUnmount() {
        clearInterval( this.interval );
    }

    
    render() {
        return (
            <div>
                <h3>精力管理</h3>
                <ItemList items={this.state.items} />
                                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.text} />
                     <div> {(Array(2).join(0) + Math.floor(this.state.secondsElapsed/3600)).slice(-2)}:{(Array(2).join(0) + Math.floor(this.state.secondsElapsed%3600/60)).slice(-2)}:{(Array(2).join(0) + Math.floor(this.state.secondsElapsed%60)).slice(-2)} </div>
                </form>
                <button>{'开始'}</button>
                <button>{'取消'}</button>
            </div>
        );
    }

    handleChange( e ) {
        this.setState( { text: e.target.value } );
    }

    handleSubmit( e ) {
        e.preventDefault();
        var newItem = {
            text: this.state.text ,
time: (Array(2).join(0) + Math.floor(this.state.secondsElapsed/3600)).slice(-2)+':'+(Array(2).join(0) + Math.floor(this.state.secondsElapsed%3600/60)).slice(-2)+':'+(Array(2).join(0) + Math.floor(this.state.secondsElapsed%60)).slice(-2),
            id: Date.now()
        };
        
        clearInterval( this.interval );
        
        this.setState(( prevState ) => ( {
            items: prevState.items.concat( newItem ),
            secondsElapsed :0
        } ) );
        
        
        this.interval = setInterval(() => this.tick(), 1000 );
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map( item => (
                    <li key={item.id}>{item.text}</li>
                ) )}
            </ul>
        );
    }
}


class ItemList extends React.Component {

    render() {
        var items = this.props.items.map( item =>
        <Item key={item.id} item={item} />
    );
        
        return (
            <table>
                <tbody>
                    <tr>
                        <th>任务</th>
                        <th>耗时</th>
                        <th>开始时间</th>
                    </tr>
                    {items}
                </tbody>
            </table>
        )
    }
}

class Item extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.item.text}</td>
                <td>{this.props.item.time}</td>
                <td>{this.props.item.id}</td>
            </tr>
        )
    }
}

// tag::employee-list[]
class EmployeeList extends React.Component {
    render() {
        var employees = this.props.employees.map( employee =>
            <Employee key={employee._links.self.href} employee={employee} />
        );
        return (
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
                    </tr>
                    {employees}
                </tbody>
            </table>
        )
    }
}
// end::employee-list[]

// tag::employee[]
class Employee extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.lastName}</td>
                <td>{this.props.employee.description}</td>
            </tr>
        )
    }
}
// end::employee[]

// tag::render[]
ReactDOM.render(
    <App />,
    document.getElementById( 'react' )
)
// end::render[]

