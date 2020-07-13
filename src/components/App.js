import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router ,Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { fetchPosts } from "../actions/posts";
import { Home, Navbar , Page404, Login} from "./"; 

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  

  render() {
    const { posts } = this.props;
    console.log("PROPPPP", this.props);
    console.log("post", posts);
    return (
     
      <Router>
      < div>
        <Navbar />
        <Switch>  
        <Route exact path="/"
        render={(props) =>{
        return <Home posts= {posts}  />;
        }}
        />
        <Route path='/login' component={Login}/>
        <Route component={Page404} />
        </Switch>
      </div>
      </Router> 
    
     
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
