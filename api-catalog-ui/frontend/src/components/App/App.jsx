import React, { Component, Suspense } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BigShield from '../ErrorBoundary/BigShield/BigShield';
import ErrorContainer from '../Error/ErrorContainer';
import '../../webflow.css';
import './App.css';
import '../../assets/css/APIMReactToastify.css';
import PageNotFound from '../PageNotFound/PageNotFound';
import HeaderContainer from '../Header/HeaderContainer';
import Spinner from '../Spinner/Spinner';
import DetailPageContainer from '../DetailPage/DetailPageContainer';
import DashboardContainer from '../Dashboard/DashboardContainer';
import LoginContainer from '../Login/LoginContainer';
import Footer from '../Footer/Footer';

class App extends Component {
    render() {
        const { history, authentication } = this.props;
        const isLoading = true;
        return (
            <div className="App">
                <BigShield history={history}>
                    <div className="content">
                        {authentication.showHeader !== undefined &&
                            authentication.showHeader === true && <HeaderContainer />}
                        <ToastContainer />
                        <ErrorContainer />
                        <Suspense fallback={<Spinner isLoading={isLoading} />}>
                            <Router history={history}>
                                <Switch>
                                    <Route path="/" exact render={() => <Redirect replace to="/login" />} />
                                    <Route
                                        path="/login"
                                        exact
                                        render={(props, state) => <LoginContainer {...props} {...state} />}
                                    />
                                    <Route
                                        exact
                                        path="/dashboard"
                                        render={(props, state) => (
                                            <BigShield>
                                                <DashboardContainer {...props} {...state} />
                                            </BigShield>
                                        )}
                                    />
                                    <Route
                                        path="/tile/:tileID"
                                        render={(props, state) => (
                                            <BigShield history={history}>
                                                <DetailPageContainer {...props} {...state} />
                                            </BigShield>
                                        )}
                                    />
                                    <Route
                                        render={(props, state) => (
                                            <BigShield history={history}>
                                                <PageNotFound {...props} {...state} />
                                            </BigShield>
                                        )}
                                    />
                                </Switch>
                            </Router>

                        </Suspense>
                    </div>
                    {authentication.showHeader !== undefined && authentication.showHeader === true && <Footer />}
                </BigShield>
            </div>
        );
    }
}

export default App;
