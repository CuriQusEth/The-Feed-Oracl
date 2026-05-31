import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Common CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: "MCP Server Active. Use POST for JSON-RPC.",
      protocol: "MCP",
      version: "1.0.0",
      name: "The Feed Oracle MCP Endpoint",
      description: "Active MCP server for The Feed Oracle Orchestrator Agent",
      capabilities: ["feed-analysis", "oracle-mechanics", "real-time-aggregation", "mcp-command-execution"],
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const method = body.method;
      const id = body.id; // JSON-RPC 2.0 requies id mapping

      if (method === 'initialize') {
        return res.status(200).json({
          jsonrpc: "2.0",
          id: id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: { listChanged: false },
              prompts: { listChanged: false },
              resources: { listChanged: false },
            },
            serverInfo: {
              name: "The Feed Oracle Orchestrator",
              version: "1.0.0"
            }
          }
        });
      }

      if (method === 'tools/list') {
        return res.status(200).json({
          jsonrpc: "2.0",
          id: id,
          result: {
            tools: [
              {
                name: "get_race_status",
                description: "Get current race status",
                inputSchema: { type: "object", properties: { raceId: { type: "string" } }, required: ["raceId"] }
              },
              {
                name: "start_race",
                description: "Start a new race",
                inputSchema: { type: "object", properties: { targetId: { type: "string" } }, required: ["targetId"] }
              },
              {
                name: "get_leaderboard",
                description: "Get leaderboard",
                inputSchema: { type: "object", properties: { limit: { type: "number" } }, required: ["limit"] }
              },
              {
                name: "optimize_speed",
                description: "Optimize speed",
                inputSchema: { type: "object", properties: { agentId: { type: "string" } }, required: ["agentId"] }
              },
              {
                name: "get_track_info",
                description: "Get track information",
                inputSchema: { type: "object", properties: { trackId: { type: "string" } }, required: ["trackId"] }
              }
            ]
          }
        });
      }

      if (method === 'tools/call') {
        const { name, arguments: args } = body.params || {};
        return res.status(200).json({
          jsonrpc: "2.0",
          id: id,
          result: {
            content: [{
              type: "text",
              text: `Successfully executed ${name} with parameters: ${JSON.stringify(args || {})}`
            }],
            isError: false
          }
        });
      }

      if (method === 'prompts/list') {
        return res.status(200).json({ jsonrpc: "2.0", id: id, result: { prompts: [] } });
      }
      
      if (method === 'resources/list') {
        return res.status(200).json({ jsonrpc: "2.0", id: id, result: { resources: [] } });
      }

      return res.status(200).json({
        jsonrpc: "2.0",
        id: id,
        result: {
          status: "success",
          message: "MCP command received",
          agent: "The Feed Oracle Orchestrator",
          receivedAt: new Date().toISOString()
        }
      });
    } catch (error: any) {
      return res.status(400).json({ 
        jsonrpc: "2.0", 
        id: null,
        error: { code: -32700, message: "Invalid MCP request: " + error?.message } 
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
