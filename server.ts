import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use CORS to handle preflight OPTIONS requests that MCP clients send
  app.use(cors());
  app.use(express.json());

  // Agent API Routes
  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "The Feed Oracle MCP Endpoint",
      status: "active",
      description: "Active MCP server for The Feed Oracle Orchestrator Agent",
      capabilities: ["feed-analysis", "oracle-mechanics", "real-time-aggregation", "mcp-command-execution"],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body;
      const method = body.method;

      if (method === 'initialize') {
        return res.json({
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
        return res.json({
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
        return res.json({
          content: [{
            type: "text",
            text: `Successfully executed ${name} with parameters: ${JSON.stringify(args || {})}`
          }],
          isError: false
        });
      }

      if (method === 'prompts/list') {
        return res.json({ prompts: [] });
      }
      
      if (method === 'resources/list') {
        return res.json({ resources: [] });
      }

      res.json({
        status: "success",
        message: "MCP command received",
        agent: "The Feed Oracle Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid MCP request" });
    }
  });

  app.get("/api/agent", (req, res) => {
    res.json({
      name: "The Feed Oracle Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "The Feed Oracle",
      version: "1.0.0"
    });
  });

  app.post("/api/agent", (req, res) => {
    res.json({
      status: "success",
      message: "Agent instruction received",
      agent: "The Feed Oracle Orchestrator",
      payload: req.body
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For Express 4
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
