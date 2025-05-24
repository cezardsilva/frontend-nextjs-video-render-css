import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function EditVideo() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://node-api-fvge.onrender.com/videos/${id}`)
        .then(response => setForm(response.data))
        .catch(error => console.error("Erro ao buscar vídeo", error));
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`https://node-api-fvge.onrender.com/videos/${id}`, form);
    router.push("/");
  };

  if (!form) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Vídeo</h1>
      <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button type="submit">Salvar</button>
    </form>
  );
}
