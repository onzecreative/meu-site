import { useState, useEffect } from "react";
import { IconDeviceFloppy, IconPlus, IconTrash } from "@tabler/icons-react";

interface Props {
  id: string;
  label: string;
  defaultData: any;
}

export default function SectionEditor({ id, label, defaultData }: Props) {
  const [data, setData] = useState<any>(defaultData);
  const [jsonText, setJsonText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/admin/section/${id}`)
      .then((r) => r.json())
      .then((res) => {
        if (res && Object.keys(res).length > 0) {
          setData(res);
          const listData = res.items || res.stats || res.partners;
          if (listData) setJsonText(JSON.stringify(listData, null, 2));
        } else {
          const listData = defaultData.items || defaultData.stats || defaultData.partners;
          if (listData) setJsonText(JSON.stringify(listData, null, 2));
        }
      })
      .finally(() => setLoading(false));
  }, [id, defaultData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/section/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setMessage("Salvo com sucesso!");
      else {
        const errorData = await res.json().catch(() => ({}));
        setMessage("Erro Supabase: " + (errorData.error || "Erro de conexão"));
      }
    } catch {
      setMessage("Erro de conexão.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <div style={{ color: "rgba(255,255,255,0.5)", padding: "20px" }}>Carregando {label}...</div>;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    marginBottom: "16px",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    marginBottom: "6px",
    fontWeight: 600,
  };

  return (
    <section style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      padding: "32px",
      marginBottom: "32px",
    }}>
      <h2 style={{ fontSize: "20px", marginBottom: "24px" }}>{label}</h2>
      
      {message && (
        <div style={{
          background: message.includes("Erro") ? "rgba(255,82,82,0.1)" : "rgba(76,175,80,0.1)",
          color: message.includes("Erro") ? "#FF5252" : "#4CAF50",
          padding: "12px 16px", borderRadius: "8px", marginBottom: "24px", fontWeight: 500
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave}>
        {data.sectionTitle !== undefined && (
          <div>
            <label style={labelStyle}>Pequeno Título da Seção (ex: Nossos Serviços)</label>
            <input type="text" value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} style={inputStyle} />
          </div>
        )}
        {data.title !== undefined && (
          <div>
            <label style={labelStyle}>Título Principal</label>
            <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} style={inputStyle} />
          </div>
        )}
        {data.description !== undefined && (
          <div>
            <label style={labelStyle}>Descrição Extra</label>
            <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} style={{ ...inputStyle, minHeight: "80px" }} />
          </div>
        )}

        {/* Arrays generic handling as JSON for items */}
        {(data.items || data.stats || data.partners) && (
          <div>
            <label style={labelStyle}>Conteúdo em Lista Avançado (Cole o JSON aqui ou edite com cuidado)</label>
            <textarea 
              value={jsonText} 
              onChange={(e) => {
                setJsonText(e.target.value);
                try {
                  const arr = JSON.parse(e.target.value);
                  if (data.items) setData({ ...data, items: arr });
                  else if (data.stats) setData({ ...data, stats: arr });
                  else if (data.partners) setData({ ...data, partners: arr });
                } catch {
                  // ignorar erros de JSON enquanto digita
                }
              }} 
              style={{ ...inputStyle, minHeight: "250px", fontFamily: "monospace", fontSize: "12px" }} 
            />
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "-10px", marginBottom: "16px" }}>
              *Para alterar ícones, descrições e títulos dos cards, edite o texto JSON acima com cuidado para não quebrar as aspas.
            </p>
          </div>
        )}

        <button type="submit" disabled={saving} style={{
          background: "#DE3F0B", color: "white", border: "none", borderRadius: "8px",
          padding: "10px 20px", fontSize: "14px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", gap: "8px"
        }}>
          <IconDeviceFloppy size={18} /> {saving ? "Salvando..." : `Salvar ${label}`}
        </button>
      </form>
    </section>
  );
}
