const output = document.getElementById("output");

// ----------------------
// Task 1: GET using fetch()
// ----------------------
document.getElementById("fetchBtn").addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => {
            if (!response.ok) throw new Error("Server error: " + response.status);
            return response.json();
        })
        .then(data => {
            output.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
        })
        .catch(err => {
            output.innerHTML = `<p class="error">Fetch Error: ${err.message}</p>`;
        });
});

// ----------------------
// Task 2: GET using XHR
// ----------------------
document.getElementById("xhrBtn").addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            output.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
        } else {
            output.innerHTML = `<p class="error">XHR Error: ${xhr.status}</p>`;
        }
    };

    xhr.onerror = function () {
        output.innerHTML = `<p class="error">Network Error (XHR)</p>`;
    };

    xhr.send();
});

// ----------------------
// Task 3: POST request
// ----------------------
document.getElementById("postForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postBody").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body })
    })
        .then(response => {
            if (!response.ok) throw new Error("POST failed: " + response.status);
            return response.json();
        })
        .then(data => {
            output.innerHTML = `<h3>Post Created!</h3>
                                <p>ID: ${data.id}</p>
                                <p>${data.title}</p>
                                <p>${data.body}</p>`;
        })
        .catch(err => {
            output.innerHTML = `<p class="error">POST Error: ${err.message}</p>`;
        });
});

// ----------------------
// Task 4: PUT using XHR
// ----------------------
document.getElementById("putForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("putId").value;
    const title = document.getElementById("putTitle").value;
    const body = document.getElementById("putBody").value;

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            output.innerHTML = `<h3>Post Updated!</h3>
                                <p>ID: ${data.id}</p>
                                <p>${data.title}</p>
                                <p>${data.body}</p>`;
        } else {
            output.innerHTML = `<p class="error">PUT Error: ${xhr.status}</p>`;
        }
    };

    xhr.onerror = function () {
        output.innerHTML = `<p class="error">Network Error (PUT)</p>`;
    };

    xhr.send(JSON.stringify({ title, body }));
});
