/* JSON loaded from github */
var url = "https://raw.githubusercontent.com/Xinacris/summer2020_Wolt/master/restaurants.json";
var all_restaurants = [];
/* this tells the page to wait until jQuery has loaded, so you can use the Ajax call */
$(document).ready(function() {
  $.ajax({
    url: url,
    dataType: 'json',
    error: function() {
      console.log('JSON FAILED for data');
    },
    success: function(results) {
      /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
      all_restaurants = results.restaurants;
      render_restaurants(all_restaurants);
    }
  })
})

function render_restaurants(restaurants) {
  var restaurantsList = document.getElementById("restaurantsList")
  restaurants.forEach(function(a) {
    if (a.online == false) {
      restaurantsList.insertAdjacentHTML('beforeend', "<div class='grid-item offline'><div class=item-title><p class=font-weight-bold>" + a.name + "</div>" + "<img src=" + a.image + "><div class= details-container><div class=description> " + a.description + "</div><p></p><a  target='_blank' rel='noopener noreferrer' class='btn btn-dark' href=http://www.google.com/maps/place/" + a.location[1] + "," + a.location[0] + ">Find on Map</a></div></p></div>");
    } else {
      restaurantsList.insertAdjacentHTML('beforeend', "<div class='grid-item' id=restaurantRow><div class=item-title><p class=font-weight-bold>" + a.name + "</div>" + "<img src=" + a.image + "><div class= details-container><div class=description> " + a.description + "</div><p></p><a  target='_blank' rel='noopener noreferrer' class='btn btn-dark' href=http://www.google.com/maps/place/" + a.location[1] + "," + a.location[0] + ">Find on Map</a></div></p></div>")
    }
  })
}

function sortHide(n) { //n is a switch that determines which button is clicked, 0 is for sorting, 1 is for hiding.
  var rows, x, y, shouldSwitch, dir, switchcount = 0;
  rows = document.getElementsByClassName("grid-item");
  var sort = document.getElementById("sortButton");
  var hide = document.getElementById("hideButton");
  if (n == 0) {
    switching = true;
    dir = "asc"; // Set the sorting direction to ascending:
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      switching = false; // Start by saying: no switching is done:
      for (i = 0; i < (all_restaurants.length - 1); i++) {
        shouldSwitch = false; // Start by saying there should be no switching:
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("p")[n];
        y = rows[i + 1].getElementsByTagName("p")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            sort.innerHTML = 'Sort Alphabetically (Z>A)';
            shouldSwitch = true; // If so, mark as a switch and break the loop:
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            sort.innerHTML = 'Sort Alphabetically (A>Z)';
            shouldSwitch = true; // If so, mark as a switch and break the loop:
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++; // Each time a switch is done, increase this count by 1:
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  } else if (n == 1) {
    var elements = document.getElementsByClassName("offline"); //getting offline restaurants data.
    Array.prototype.forEach.call(elements, function(element) {
      if (element.style.display == '') {
        hideButton.innerHTML = 'All Restaurants';
        element.style.display = 'none'
      } else {
        hideButton.innerHTML = 'Available Restaurants';
        element.style.display = '';
      }
    });
  }
}
