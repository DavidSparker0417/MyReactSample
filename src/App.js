import {Container, NavDropdown, Nav, Navbar} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './bootstrap.min.css';
import logo from './logo.svg';
import MozTodo from './1. moz-todo-react/index';
import SimpleTodo from './2. todo-simple/index';
import Clock from './3. clock/App';
import ChangeBkColor from './4. change-bkcolor-by-button/App';
import ReactTableApp from './5. table-state/ReactTableApp';
import AdminApp from './6. admin-test/App';
import FluxApp from './7. flux/main';
import AniElemApp from './8. animate-element/AniElemApp';
import EmojiApp from './9. emoji/App';
import KendoApp from './10. kendo/App';
import ContextTestApp from './11. context/App';
import SvgApp from './12.svg/App';
import JsonApp from './13.json/App'

const MyNavBar = () => {
  return (
    <div>
    <><Navbar bg="dark" variant="dark" expand="lg">
    <Container>
    <img
        alt = ""
        src={logo}
        width="30"
        height="30"
      />
      <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <NavDropdown title="Exapmles" id="basic-nav-dropdown">
            <NavDropdown.Item href="/1.moz-todo">1. Todo</NavDropdown.Item>
            <NavDropdown.Item href="/2.simple-todo">2. Todo-Simple</NavDropdown.Item>
            <NavDropdown.Item href="/3.clock">3. Clock</NavDropdown.Item>
            <NavDropdown.Item href="/4.Change-bkcolor">4. Change Bk Color</NavDropdown.Item>
            <NavDropdown.Item href="/5.table-state">5. Table-State</NavDropdown.Item>
            <NavDropdown.Item href="/6.admin">6. Admin-Test</NavDropdown.Item>
            <NavDropdown.Item href="/7.flux">7. Flux-Test</NavDropdown.Item>
            <NavDropdown.Item href="/8.ani-elem">8. Animation Element</NavDropdown.Item>
            <NavDropdown.Item href="/9.emoji">9. Emoji</NavDropdown.Item>
            <NavDropdown.Item href="/10.kendo">10. Kendo</NavDropdown.Item>
            <NavDropdown.Item href="/11.context">11.Context</NavDropdown.Item>
            <NavDropdown.Item href="/12.svg">12.svg</NavDropdown.Item>
            <NavDropdown.Item href="/13.json">13.json</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar>
    </>
    </div>
  );
}
export default function App() {
  return (
    <Router>
      <MyNavBar />
      <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/about">
            <h1>About</h1>
          </Route>
          <Route path="/1.moz-todo">
            <MozTodo />
          </Route>
          <Route path="/2.simple-todo">
            <SimpleTodo />
          </Route>
          <Route path="/3.clock">
            <Clock />
          </Route>
          <Route path='/4.Change-bkcolor'>
            <ChangeBkColor />
          </Route>
          <Route path='/5.table-state'>
            <ReactTableApp />
          </Route>
          <Route path='/6.admin' component={AdminApp}/>
          <Route path='/7.flux' component={FluxApp}/>
          <Route path="/8.ani-elem" component={AniElemApp}/>
          <Route path="/9.emoji" component={EmojiApp}/>
          <Route path="/10.kendo" component={KendoApp}/>
          <Route path="/11.context" component={ContextTestApp}/>
          <Route path="/12.svg" component={SvgApp}/>
          <Route path="/13.json" component={JsonApp}/>
        </Switch>
    </Router>
  );
}