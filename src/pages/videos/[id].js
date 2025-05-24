import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VideoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://node-api-fvge.onrender.com/videos/${id}`)
        .then(response => setVideo(response.data))
        .catch(error => console.error("Erro ao buscar vídeo", error));
    }
  }, [id]);

  if (!video) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <a href={video.link}>Ver no YouTube</a>
    </div>
  );
}
