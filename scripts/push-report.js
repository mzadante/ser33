import { Client } from '@notionhq/client';
import "dotenv/config";
import fs from 'fs';
import path from 'path';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const PAGE_ID = process.env.NOTION_PAGE_ID;

async function pushReport() {
  const filePath = path.resolve('.agents', 'history', 'report_to_push.md');
  if (!fs.existsSync(filePath)) {
    console.error("❌ No hay reporte pendiente para pushear.");
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  if (!content.trim()) return;

  const lines = content.split('\n');
  const blocks = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.startsWith('### ')) {
      blocks.push({ object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: line.replace('### ', '') } }] } });
    } else if (line.startsWith('## ')) {
      blocks.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: line.replace('## ', '') } }] } });
    } else if (line.startsWith('# ')) {
      blocks.push({ object: 'block', type: 'heading_1', heading_1: { rich_text: [{ type: 'text', text: { content: line.replace('# ', '') } }] } });
    } else if (line.startsWith('- ')) {
      blocks.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: line.substring(2).trim() } }] } });
    } else if (line.startsWith('> ')) {
      blocks.push({ object: 'block', type: 'quote', quote: { rich_text: [{ type: 'text', text: { content: line.replace('> ', '') } }] } });
    } else if (!line.startsWith('---')) {
      blocks.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: line.substring(0, 2000) } }] } });
    }
  }

  const dateStr = new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' });
  
  // Envolvemos el reporte en un bloque de tipo Toggle (Desplegable) para que Notion no se sature de texto
  const toggleBlock = {
    object: 'block',
    type: 'toggle',
    toggle: {
      rich_text: [
        { type: 'text', text: { content: `🤖 Reporte de Antigravity — ${dateStr}` } }
      ],
      children: blocks.slice(0, 99) // Limit to 99 blocks as per API limits for nested children
    }
  };

  try {
    await notion.blocks.children.append({
      block_id: PAGE_ID,
      children: [toggleBlock, { object: 'block', type: 'divider', divider: {} }]
    });
    console.log(`✅ Reporte enviado a Notion cronológicamente.`);
    
    // Archivar el reporte localmente en un log
    const logPath = path.resolve('.agents', 'history', 'reports_log.md');
    fs.appendFileSync(logPath, `\n\n## 🤖 Reporte: ${dateStr}\n` + content);
    
    // Limpiar archivo pendiente
    fs.unlinkSync(filePath);
    
  } catch (error) {
    console.error("❌ Error enviando reporte a Notion:", error.body ? error.body : error);
  }
}

pushReport();
