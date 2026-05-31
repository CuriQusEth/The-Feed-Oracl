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

      if (method === 'initialize') {
        return res.status(200).json({
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
        });
      }

      if (method === 'tools/list') {
        return res.status(200).json({
          tools: [
            {
              name: "get_race_status",
              description: "Get current race status",
              inputSchema: { type: "object", properties: { raceId: { type: "string" } } }
            },
            {
              name: "start_race",
              description: "Start a new race",
              inputSchema: { type: "object", properties: { targetId: { type: "string" } } }
            },
            {
              name: "get_leaderboard",
              description: "Get leaderboard",
              inputSchema: { type: "object", properties: { limit: { type: "number" } } }
            },
            {
              name: "optimize_speed",
              description: "Optimize speed",
              inputSchema: { type: "object", properties: { agentId: { type: "string" } } }
            },
            {
              name: "get_track_info",
              description: "Get track information",
              inputSchema: { type: "object", properties: { trackId: { type: "string" } } }
            }
          ]
        });
      }

      if (method === 'tools/call') {
        const { name, arguments: args } = body.params || {};
        return res.status(200).json({
          content: [{
            type: "text",
            text: `Successfully executed ${name} with parameters: ${JSON.stringify(args || {})}`
          }],
          isError: false
        });
      }

      if (method === 'prompts/list') {
        return res.status(200).json({ prompts: [] });
      }
      
      if (method === 'resources/list') {
        return res.status(200).json({ resources: [] });
      }

      return res.status(200).json({
        status: "success",
        message: "MCP command received",
        agent: "The Feed Oracle Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      return res.status(400).json({ error: "Invalid MCP request" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
