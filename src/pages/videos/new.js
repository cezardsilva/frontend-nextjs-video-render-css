import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "../videos/new.css"



export default function CreateVideo() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", link: "", thumbnail: "", duration: "" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Agora verificamos `isClient` dentro do JSX, sem impedir o React de montar os hooks
  if (!isClient || typeof window === "undefined") {
    return <h1>Carregando...</h1>; // Substituímos `null` para evitar o erro
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Enviando dados:", form);

    if (!form.title || !form.description || !form.link || !form.thumbnail || !form.duration) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const response = await axios.post("https://node-api-fvge.onrender.com/videos", form);
      console.log("Resposta do servidor:", response.data);

      alert("Vídeo criado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao criar vídeo:", error.message);
      alert("Erro ao criar vídeo. Verifique os dados e tente novamente.");
    }
  };

  return (
    <>
      <div className="Container">
        <h1>Criar Novo Vídeo</h1>
        <a className="BackToHome" href="/">✔️ Home</a>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Título" onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input type="text" placeholder="Descrição" onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input type="text" placeholder="Link do vídeo" onChange={(e) => setForm({ ...form, link: e.target.value })} />
          <input
            type="text"
            placeholder="Imagem Thumbnail"
            onChange={(e) => {
              const link = form.link; // Pegamos o valor do link do vídeo
              setForm({
                ...form,
                thumbnail: link.includes("yout")
                  ? `https://img.youtube.com/vi/${e.target.value}/0.jpg`
                  : e.target.value, // Se não for do YouTube, apenas salva o valor inserido
              });
            }}
          />
          <input
            type="text"
            placeholder="Duração (hh:mm:ss)"
            onChange={(e) => setForm({ ...form, duration: e.target.value })} // Apenas captura o valor
            onBlur={(e) => { // Valida apenas quando o usuário sai do campo
              const value = e.target.value;
              const [hours, minutes, seconds] = value.split(":").map(Number); // Converte para números

              if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
                alert("Formato inválido! Use hh:mm:ss");
              } else {
                const totalSeconds = hours * 3600 + minutes * 60 + seconds;
                setForm({ ...form, duration: totalSeconds });
              }
            }}
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    </>
  );
}
