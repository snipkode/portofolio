const API_KEY = "AIzaSyBCmZCk1KvPdtbo9qGR6qQkuCf02Nv8wHw"; // Replace with your API key

// Example playlist with video IDs
const videoIds = [
  "hlbVWjAHSqs", // Replace these with actual YouTube video IDs
  "hlbVWjAHSqs",
  "hlbVWjAHSqs",
  "hlbVWjAHSqs",
  "hlbVWjAHSqs",
];

async function fetchVideoData(videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    const video = data.items[0];

    // Get video duration in ISO 8601 format
    const durationISO = video.contentDetails.duration;

    // Convert ISO duration to a human-readable format (e.g., '1:30:45' for 1 hour, 30 minutes, and 45 seconds)
    const duration = formatDuration(durationISO);

    return {
      title: video.snippet.title,
      views: video.statistics.viewCount,
      thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      duration: duration, // Human-readable duration
      uploadDate: video.snippet.publishedAt,
    };
  } else {
    console.error("Video data not found");
  }
}

function formatDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;

  return `${hours > 0 ? hours + "h " : ""}${minutes > 0 ? minutes + "m " : ""}${
    seconds > 0 ? seconds + "s" : ""
  }`.trim();
}

async function initPlaylist() {
  const playlistContainer = document.getElementById("playlist");
  const videoCount = document.getElementById("videoCount");
  videoCount.textContent = `${videoIds.length} videos`;

  for (let i = 0; i < videoIds.length; i++) {
    const videoId = videoIds[i];
    const videoData = await fetchVideoData(videoId);

    const videoElement = document.createElement("div");
    videoElement.className =
      "playlist-item rounded-lg overflow-hidden cursor-pointer";
    videoElement.onclick = () => openVideo(videoData);

    videoElement.innerHTML = `
                    <div class="relative group">
                        <img src="${videoData.thumbnail}" alt="${
      videoData.title
    }" class="w-full rounded-lg">
                        <span class="video-duration absolute bottom-2 right-2 text-white">${
                          videoData.duration
                        }</span>
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                            <svg class="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div class="p-3">
                        <h3 class="text-white font-medium line-clamp-2 mb-1">${
                          videoData.title
                        }</h3>
                        <div class="text-gray-400 text-sm">
                            <span>${videoData.views} views</span>
                            <span class="mx-1">•</span>
                            <span>${new Date(
                              videoData.uploadDate
                            ).toLocaleDateString()}</span>
                        </div>
                    </div>
                `;

    playlistContainer.appendChild(videoElement);
  }
}

function openVideo(videoData) {
  const modal = document.getElementById("videoModal");
  const modalContent = modal.querySelector(".modal-content");
  const player = document.getElementById("player");
  const videoTitle = document.getElementById("videoTitle");

  player.innerHTML = ` 
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/${videoData.id}?autoplay=1"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="absolute inset-0 w-full h-full"
                ></iframe>
            `;

  videoTitle.textContent = videoData.title;

  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("active");
    modalContent.classList.add("active");
  }, 10);

  document.addEventListener("keydown", handleEscKey);
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  const modalContent = modal.querySelector(".modal-content");
  const player = document.getElementById("player");

  modal.classList.remove("active");
  modalContent.classList.remove("active");

  setTimeout(() => {
    modal.classList.add("hidden");
    player.innerHTML = "";
  }, 300);

  document.removeEventListener("keydown", handleEscKey);
}

function handleEscKey(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

document.getElementById("videoModal").addEventListener("click", (e) => {
  if (e.target.id === "videoModal") {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", initPlaylist);
