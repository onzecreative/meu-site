"use client";
import { useState } from "react";
import { IconTruck, IconLock, IconUser } from "@tabler/icons-react";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        window.location.href = "/admin";
      } else {
        const data = await res.json();
        setError(data.error || "Credenciais inválidas");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    padding: "14px 14px 14px 44px",
    color: "white",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "fixed",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(222,63,11,0.12) 0%, transparent 70%)",
          top: "-150px",
          left: "-150px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "40px 36px",
          backdropFilter: "blur(20px)",
          position: "relative",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              background: "#DE3F0B",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconTruck size={22} color="white" />
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: "white",
                display: "block",
              }}
            >
              LogiNord
            </span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
              Painel Administrativo
            </span>
          </div>
        </div>

        <h1
          style={{
            color: "white",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            marginBottom: "8px",
          }}
        >
          Entrar
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "28px" }}>
          Acesse o painel de controle do site
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ position: "relative" }}>
            <IconUser
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.3)",
              }}
            />
            <input
              id="admin-username"
              type="text"
              placeholder="Usuário"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              autoComplete="username"
              style={inputStyle}
            />
          </div>

          <div style={{ position: "relative" }}>
            <IconLock
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.3)",
              }}
            />
            <input
              id="admin-password"
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              autoComplete="current-password"
              style={inputStyle}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#FF5252",
                fontSize: "13px",
                background: "rgba(255,82,82,0.1)",
                border: "1px solid rgba(255,82,82,0.2)",
                borderRadius: "8px",
                padding: "10px 14px",
              }}
            >
              {error}
            </p>
          )}

          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "rgba(222,63,11,0.6)" : "#DE3F0B",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              marginTop: "4px",
            }}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", marginTop: "28px", textAlign: "center" }}>
          Acesso restrito a administradores
        </p>
      </div>
    </div>
  );
}
