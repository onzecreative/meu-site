import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Testing connection...");
  const { data, error } = await supabase.from("site_content").select("id").limit(1);
  if (error) {
    if (error.code === '42P01') {
      console.error("ERRO: A tabela 'site_content' não existe no banco de dados.");
    } else {
      console.error("ERRO DE CONEXÃO: ", error.message);
    }
    process.exit(1);
  }
  console.log("Conexão bem sucedida. A tabela site_content existe!");
}

testConnection();
