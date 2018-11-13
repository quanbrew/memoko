import * as React from 'react';
import './App.css';
import { findItem, Item, randomTree } from "../item";
import { Root } from "./Root";
import { BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom";
import { Switch } from "react-router";
import { NotFound } from "./NotFound";
import ScrollToTop from "./ScrollToTop";


interface Props {
}

interface State {
  root: Item;
}


class App extends React.Component<Props, State> {
  update = (root: Item, callback?: () => void) => this.setState({ root }, callback);

  constructor(props: Props) {
    super(props);
    const root = randomTree();
    this.state = { root };
  }

  renderItemById = ({ match }: RouteComponentProps<{ id: string }>) => {
    const item = findItem(this.state.root, match.params.id);
    if (item === null)
      return <NotFound/>;
    else
      return this.renderItem(item);
  };

  renderItem = (item: Item) => {
    return (
      <Root
        key={ item.id }
        item={ item }
        update={ this.update }
      />
    )
  };

  public render() {
    const { root } = this.state;

    return (
      <Router>
        <ScrollToTop>
          <main className='App'>
            <Switch>
              <Route path="/" exact render={ () => this.renderItem(root) }/>
              <Route path="/:id" render={ this.renderItemById }/>
              <Route component={ NotFound }/>
            </Switch>
          </main>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
