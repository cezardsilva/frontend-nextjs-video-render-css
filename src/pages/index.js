import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/index.css"


export default function Home() {
  const [videos, setVideos] = useState([]);
  const [editVideo, setEditVideo] = useState({ id: null, title: "", description: "", link: "", thumbnail: "", duration: 0 });


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("https://node-api-fvge.onrender.com/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error.message);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este vídeo?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://node-api-fvge.onrender.com/videos/${id}`);
      setVideos(prevVideos => prevVideos.filter(video => video.id !== id));
      alert("Vídeo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar vídeo:", error.message);
      alert("Erro ao excluir vídeo. Tente novamente.");
    }
  };

  const handleUpdate = async () => {
    if (!editVideo.id) return;

    try {
      await axios.put(`https://node-api-fvge.onrender.com/videos/${editVideo.id}`, {  // ID adicionado na URL!
        title: editVideo.title,
        description: editVideo.description,
        link: editVideo.link,
        thumbnail: editVideo.thumbnail,
        duration: editVideo.duration
      });

      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.id === editVideo.id
            ? { ...video, title: editVideo.title, description: editVideo.description, link: editVideo.link, thumbnail: editVideo.thumbnail, duration: editVideo.duration }
            : video
        )
      );

      setEditVideo({ id: null, title: "", description: "" });
      alert("Vídeo atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar vídeo:", error.message);
      alert("Erro ao atualizar vídeo. Tente novamente.");
    }
  };

  const handleEdit = (video) => {
    setEditVideo({
      id: video.id,
      title: video.title,
      description: video.description,
      link: video.link,
      thumbnail: video.thumbnail,
      duration: video.duration
    });
  };

  return (
    <>
      <div className="Container">
        <h1>Lista de Vídeos</h1>
        <a className="AddVideoLink" href="/videos/new">➕ Adicionar Vídeo</a>
        <div className="VideoList">
          {videos.length === 0 ? (
            <p>Nenhum vídeo encontrado...</p>
          ) : (
            videos.map((video) => (
              <div className="VideoItem" key={video.id}>
                {editVideo.id === video.id ? (
                  <>
                    <div className="EditContainer">
                      <span>Título</span><input
                        type="text"
                        value={editVideo.title}
                        onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
                      />
                    </div>
                    <div className="EditContainer">
                      <span>Descrição: </span><input
                        type="text"
                        value={editVideo.description}
                        onChange={(e) => setEditVideo({ ...editVideo, description: e.target.value })}
                      />
                    </div>
                    <div className="EditContainer">
                      <span>Link: </span><input
                        type="text"
                        value={editVideo.link}
                        onChange={(e) => setEditVideo({ ...editVideo, link: e.target.value })}
                      />
                    </div>
                    <div className="EditContainer">
                      <span>Thumbnail: </span><input
                        type="text"
                        value={editVideo.thumbnail}
                        onChange={(e) => setEditVideo({ ...editVideo, thumbnail: e.target.value })}
                      />
                    </div>
                    <div className="EditContainer">
                      <span>Duração(seg): </span><input
                        type="text"
                        value={editVideo.duration}
                        onChange={(e) => setEditVideo({ ...editVideo, duration: e.target.value })}
                      />
                    </div>
                <button className="view" onClick={handleUpdate}>Salvar Alterações</button>
              </>
            ) : (
          <>
            <h2>{video.title}</h2>
            <p className="desc">{video.description}</p>
            <img src={video.thumbnail} alt={video.title} />
            <p>Duração: {video.duration} segundos</p>
            <div className="ButtonContainer">
              <button className="delete" primary onClick={() => handleDelete(video.id)}>🗑 Deletar</button>
              <button className="view" onClick={() => window.open(video.link, "_blank")}>Assistir no YouTube</button>
              <button className="edit" onClick={() => handleEdit(video)}>✏️ Editar</button>
            </div>
          </>
                )}
        </div>
        ))
          )}
      </div>
    </div >
    </>
  );
}
