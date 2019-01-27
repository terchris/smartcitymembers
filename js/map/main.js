

/**
 * This is a template of how to add the map a page and how to fetch/add members to the map
 */











// Constructing the map in a HTML container with id = 'container'
var MainMap = new Map("container", 5, 64, 13);


// Defining query-url, layer title and layer id
var url = "http://data.urbalurba.com/api/3/action/organization_list?all_fields=true&include_extras=true",
    title = "Medlemmer";
var hash = MainMap.addLayer(title);



// Fetching member data from query-url
axios.get(url)
  .then(function(response) {
    var data = response.data;
    for(var urld of data.result) {
      if(urld.locationData) {
        // Replacing single quotes with double quotes, and parsing
        var latlng = JSON.parse(urld.locationData.replace(/\'/g, "\""));

        // Adding the member to the map by marker
        // The 'addMarker' method takes the following parameters:
        //    param1: latitude
        //    param2: longitude
        //    param3: popup HTML-content
        //    param4: A reference to the marker icon (type: .png/.jpg/etc.)
        //    param5: A list of all layers the marker should be added to
        var markerId = MainMap.addMarker(latlng.latlng.lat, latlng.latlng.lng,
                                        `<h5><a href=\"${urld.website}\" target=\"_blank\">${urld.display_name}</a></h5>
                                          <img src=\"${urld.image_url}\" alt=\"\" id=\"organization_logo\">
                                          <p><b>type</b>: ${urld.organization_type}</p>
                                          <p><b>beskrivelse</b>: ${urld.description}</p>
                                          <p>
                                            <b>Kontakt:</b> ${urld.contact_name} , ${urld.contact_title} <br>
                                                            <a href=\"tel:${urld.contact_mobile}\" target=\"_blank\">${urld.contact_mobile}</a> <br>
                                                            <a href=\"mailto:${urld.contact_email}\" target=\"_blank\">${urld.contact_email}</a>
                                          </p>`,
                                        "https://image.flaticon.com/icons/svg/33/33622.svg", [hash]);
      }
    }
  })
  .catch(function(error) {
    console.error(error);
  });
