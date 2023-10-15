function buttonclickerhandler1() {
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
  // Function to get the local IP address
  function getLocalIP() {
    return new Promise((resolve, reject) => {
      const pc = new RTCPeerConnection();
      pc.createDataChannel('');

      pc.createOffer()
        .then(sdp => {
          pc.setLocalDescription(sdp);
        })
        .catch(error => {
          reject(error);
        });

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          const localIP = e.candidate.candidate.split(" ")[4];
          resolve(localIP);
          pc.onicecandidate = null; // Remove the event handler to prevent multiple calls
          pc.close(); // Close the RTCPeerConnection
        }
      };
    });
  }

  // Get and display the local IP address
  async function main() {
    try {
      let ip1 = 0;
      getLocalIP()
        .then(ip => {
          ip1 = ip
          console.log("Local IP Address: " + ip);
        })
        .catch(error => {
          console.error("Error getting IP address: " + error);
        });
      console.log("wassap")
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      // Show a map centered at latitude / longitude.
      currLoc = [latitude, longitude];
      const postsElement = document.querySelector(".postTitleInput");
      const postsElement1 = document.querySelector(".postContentsInput");
      const newPost = {
        title: (postsElement.value),
        content: (postsElement1.value),
        createdLat: latitude,
        createdLong: longitude,
        other: {ip1}
      };
      fetch("http://127.0.0.1:5000/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost),
      })
        .then((data) => {
          console.log("wassap");
          location.replace("index.html");
        })
    } catch (error) {
      console.error("Error getting location:", error);
    }
  }
  main()
}

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
