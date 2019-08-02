var React = require("react");

class ShowEvent extends React.Component {
  render(){


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

            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <h1>Your Event</h1>
                            <p>{this.props.events.name}</p>
                            <p>{this.props.events.date}</p>
                            <p>{this.props.events.location}</p>
                            <p>{this.props.events.url}</p>
                            <p>{this.props.events.description}</p>
                          <a href="/"><button type="button" class="btn btn-primary">back</button></a>
                    </div>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

        </body>
    </html>
        );
    }
};

module.exports = ShowEvent;