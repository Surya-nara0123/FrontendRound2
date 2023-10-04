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
            const posts = [
                {
                    "id": "1",
                    "title": "New Post Title",
                    "content": "\t\t\tNew Post \tContent Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content ",
                    "createdLat": 123.456,
                    "createdLong": 789.012
                },
                {
                    "id": "2",
                    "title": "Post Title 2",
                    "content": "Post Content 2",
                    "createdLat": 456.789,
                    "createdLong": 12.345
                }
            ];

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

                const latDiff = post["createdLat"] - currLoc[0];
                const longDiff = post["createdLong"] - currLoc[1];
                const distanceValue = Math.sqrt(latDiff * latDiff + longDiff * longDiff);
                distance.innerHTML = distanceValue.toFixed(2);

                contents.innerHTML = "<br>" + post["content"];

                heading.appendChild(title);
                heading.appendChild(distance);
                postElement.appendChild(heading);
                postElement.appendChild(contents);

                postsElement.appendChild(postElement);
            }
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
        createPost.innerHTML += "<button class='createPostButton'><h4>Create an new Post</h4></button>";
        managePosts.innerHTML += "<button class='manageePostsButton'><h4>manage your Posts</h4></button>";
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