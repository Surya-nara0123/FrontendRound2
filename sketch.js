document.addEventListener("DOMContentLoaded", function () {
    let currLoc;
    async function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async function main() {
        try {
            const position = await getCurrentLocation();
            const { latitude, longitude } = position.coords;
            // Show a map centered at latitude / longitude.
            currLoc = [latitude, longitude];
            
            console.log(currLoc);
            fetch("http://127.0.0.1:5000/getPosts", {
                method: "GET",
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const posts = data;
                    console.log(data)

                    const postsElement = document.querySelector(".posts");

                    for (const post of posts) {
                        const postElement = document.createElement("div");
                        postElement.className = "post"
                        const heading = document.createElement("div")
                        heading.className = "heading"
                        const title = document.createElement("div");
                        title.className = "title"
                        const distance = document.createElement("div");
                        distance.className = "distance"
                        const contents = document.createElement("div");
                        contents.className = "contents"

                        title.innerHTML = post["title"];

                        function calculateDistance(lat1, lon1, lat2, lon2) {
                            const earthRadius = 6371; // Radius of the Earth in kilometers
                        
                            // Convert latitude and longitude from degrees to radians
                            const lat1Rad = (lat1 * Math.PI) / 180;
                            const lon1Rad = (lon1 * Math.PI) / 180;
                            const lat2Rad = (lat2 * Math.PI) / 180;
                            const lon2Rad = (lon2 * Math.PI) / 180;
                        
                            // Haversine formula
                            const dLat = lat2Rad - lat1Rad;
                            const dLon = lon2Rad - lon1Rad;
                            const a =
                                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                                Math.sin(dLon / 2) * Math.sin(dLon / 2);
                            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        
                            // Calculate the distance
                            const distance = Math.round(earthRadius * c);
                            
                            return distance; // Distance in kilometers
                        }
                        // const R = 6371e3;
                        // const φ1 = post["createdLat"] * Math.PI / 180; // φ, λ in radians
                        // const φ2 = currLoc[0] * Math.PI / 180;
                        // const Δφ = (post["createdLat"] - currLoc[0]) * Math.PI / 180;
                        // const Δλ = (post["createdLong"] - currLoc[1]) * Math.PI / 180;
                        // const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                        //     Math.cos(φ1) * Math.cos(φ2) *
                        //     Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                        // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                        // const distanceValue = R * c / 1000; // in metres                ;
                        distance.innerHTML = calculateDistance(currLoc[0], currLoc[1], post["createdLat"], post["createdLong"])

                        contents.innerHTML = "<br>" + post["content"];

                        heading.appendChild(title);
                        heading.appendChild(distance);
                        postElement.appendChild(heading);
                        postElement.appendChild(contents);

                        postsElement.appendChild(postElement);
                    }
                })
        } catch (error) {
            console.error("Error getting location:", error);
        }
    }
    main()

});
var flag = false;
function buttonOnclickHandler() {
    if (!flag) {
        options = document.querySelector(".options");
        createPost = document.createElement("div");
        createPost.className = "createPost"
        managePosts = document.createElement("div");
        managePosts.className = "managePosts"
        createPost.innerHTML += "<a href='createPost.html'><button class='createPostButton'><h4>Create an new Post</h4></button></a>";
        options.appendChild(createPost);
        options.appendChild(managePosts);
        flag = true;
    } else {
        managePosts = document.querySelector(".managePosts");
        createPost = document.querySelector(".createPost");
        managePosts.remove();
        createPost.remove();
        flag = false;
    }
}


/*
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                },
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

*/