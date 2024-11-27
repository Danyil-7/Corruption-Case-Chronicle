11. Sampling FE Routes

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/submit-case" component={SubmitCase} roles={['admin', 'data_analyst', 'user']} />
                <PrivateRoute path="/admin-dashboard" component={AdminDashboard} roles={['admin', 'data_analyst']} />
                <Route path="/cases/:id" component={CaseDetails} />
                <Route path="/" component={CaseList} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

// PrivateRoute Component
function PrivateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {
                token = localStorage.getItem('token')
                if (!token) {
                    return <Redirect to="/login" />
                }

                user = decodeJWT(token)
                if (!roles.includes(user.role)) {
                    return <Redirect to="/" />
                }

                return <Component {...props} />
            }}
        />
    )
}

