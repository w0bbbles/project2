var React = require("react");

class Home extends React.Component {
  render(){
    console.log(this.props.events)
  let eventArray = this.props.events.map(events => {
    return(

            <tr>
                <td>{events.name}</td>
                <td>{events.start_date}</td>
                <td>{events.location}</td>
                <td><a href={events.url}> link </a></td>
                <td>{events.description}</td>
            </tr>

        )
    });

    return (
        <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link rel={"stylesheet"} href={`/style.css`} />
        </head>
            <body>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" href="/">EVENTion</a>
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                      <a className="nav-item nav-link" href="/create">Create Event<span class="sr-only">(current)</span></a>
                      <a className="nav-item nav-link" href="/register/new">Register</a>
                      <a className="nav-item nav-link" href="/login/new">Log In</a>
                      <a className="nav-item nav-link" href="/logout">Log Out</a>
                    </div>
                  </div>
                </nav>
              <h1>What's Happening!</h1>
                <table class="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Location</th>
                      <th scope="col">Website</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                        {eventArray}
                </table>
            </body>
        </html>
        )
    }
};

module.exports = Home;