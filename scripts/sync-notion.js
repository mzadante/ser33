import { Client } from '@notionhq/client';
import "dotenv/config";
import fs from 'fs';
import path from 'path';

// Utilizando la nueva sintaxis ESM
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const PAGE_ID = process.env.NOTION_PAGE_ID;

async function appendMarkdownToNotion(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Archivo no encontrado: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const blocks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Headings
    if (line.startsWith('### ')) {
      blocks.push({
        object: 'block', type: 'heading_3',
        heading_3: { rich_text: [{ type: 'text', text: { content: line.replace('### ', '') } }] }
      });
    } else if (line.startsWith('## ')) {
      blocks.push({
        object: 'block', type: 'heading_2',
        heading_2: { rich_text: [{ type: 'text', text: { content: line.replace('## ', '') } }] }
      });
    } else if (line.startsWith('# ')) {
      blocks.push({
        object: 'block', type: 'heading_1',
        heading_1: { rich_text: [{ type: 'text', text: { content: line.replace('# ', '') } }] }
      });
    } 
    // Checkboxes (Tareas completadas y pendientes)
    else if (line.startsWith('- [x]')) {
      blocks.push({
        object: 'block', type: 'to_do',
        to_do: { 
          rich_text: [{ type: 'text', text: { content: line.replace('- [x]', '').trim() } }],
          checked: true
        }
      });
    } else if (line.startsWith('- [ ]')) {
      blocks.push({
        object: 'block', type: 'to_do',
        to_do: { 
          rich_text: [{ type: 'text', text: { content: line.replace('- [ ]', '').trim() } }],
          checked: false
        }
      });
    }
    // Bulleted lists
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        object: 'block', type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ type: 'text', text: { content: line.substring(2).trim() } }] }
      });
    }
    // Quotes
    else if (line.startsWith('> ')) {
      blocks.push({
        object: 'block', type: 'quote',
        quote: { rich_text: [{ type: 'text', text: { content: line.replace('> ', '') } }] }
      });
    }
    // Normal paragraph (limitar a 2000 chars por restricciones de API)
    else if (!line.startsWith('---')) {
      blocks.push({
        object: 'block', type: 'paragraph',
        paragraph: { rich_text: [{ type: 'text', text: { content: line.substring(0, 2000) } }] }
      });
    }
  }

  // Agregamos un timestamp (divisor visual)
  const timestampBlock = {
    object: 'block', type: 'divider', divider: {}
  };
  const titleBlock = {
    object: 'block', type: 'heading_2', 
    heading_2: { rich_text: [{ type: 'text', text: { content: `🔄 Sync: ${new Date().toLocaleString()}` } }] }
  };

  const chunks = [];
  const finalBlocks = [timestampBlock, titleBlock, ...blocks];
  
  // Notion API permite maximo 100 blocks por children.append request
  for (let i = 0; i < finalBlocks.length; i += 100) {
    chunks.push(finalBlocks.slice(i, i + 100));
  }

  try {
    for (const chunk of chunks) {
      await notion.blocks.children.append({
        block_id: PAGE_ID,
        children: chunk
      });
    }
    console.log(`✅ Sincronización a Notion EXITOSA para: ${path.basename(filePath)}`);
  } catch (error) {
    console.error("❌ Error en la sincronización con Notion:", error.body ? error.body : error);
  }
}

async function run() {
  console.log("Iniciando Especialista en Documentación (Notion Sync)...");
  if (!PAGE_ID || !process.env.NOTION_TOKEN) {
    console.error("❌ Faltan credenciales en el archivo .env");
    return;
  }

  // Rutas relativas a la carpeta raíz del proyecto (donde se ejecuta node)
  const historyDir = path.resolve('.agents', 'history');
  
  await appendMarkdownToNotion(path.join(historyDir, 'project_status.md'));
  await appendMarkdownToNotion(path.join(historyDir, 'technical_audit.md'));
  await appendMarkdownToNotion(path.join(historyDir, 'changelog.md'));
  await appendMarkdownToNotion(path.join(historyDir, 'session_lessons.md'));
  
  console.log("🎉 Documentación enviada al Notion del equipo (Status, Audit, Changelog, Lessons).");
}

run();
