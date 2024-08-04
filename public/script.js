document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.querySelector('#video-container');

    getData().then((videos) => {
        videos.forEach((title, index) => {
            const button = document.createElement('button');
            button.id = index;
            button.innerHTML = title;
            button.addEventListener('click', () => {
                fetch(`/videos/play/${index}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
            })
            videoContainer.appendChild(button);
        });
    });
});

const getData = async () => {
    const response = await fetch('/videos/list');
    const json = await response.json();
    console.log(json);
    return json;
};

