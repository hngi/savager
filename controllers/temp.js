<a class="col-7 col-md-3 col-lg-2 navbar-brand" href="#top"><img class="img-fluid w-75" src="./img/savagecollector-logo.png"
              alt="Savage Collection Logo"> </a>
    
    
          <button class="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarResponsive"
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon" role="button"></span>
          </button>
    
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-items"><a href="#" class="nav-link">Home</a></li>
              <%if(user) { %>
                <li class="nav-items"><a href="/posts/upload" class="nav-link">Upload</a></li>
            <%}%>
              <li class="nav-items"><a href="/aboutus" class="nav-link">About</a></li>
              <li class="nav-items"><a href="#" class="nav-link">Top Rated</a></li>
              <li class="nav-items"><a href="#" class="nav-link">Newest</a></li>
    
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">Categories</a>
                <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item " href="#">Savage</a>
                  <a class="dropdown-item " href="#">Stand Up</a>
                  <a class="dropdown-item " href="#">Dank Memes</a>
                </div>
              </li>
    
              <li class="nav-items"><a href="/contact" class="nav-link">Contact Us</a></li>
              <li class="nav-items"><a href="/signup" class="nav-link">Signup</a></li>
              <li class="nav-items"><a href="/login" class="nav-link">Login</a></li>
              <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn nav_button my-2 my-sm-0" type="submit">Search</button>
              </form>
            </ul>
          </div>