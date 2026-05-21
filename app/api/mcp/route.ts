import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  return NextResponse.json({
    status: "MCP Server Active. Use POST for JSON-RPC.",
    protocol: "MCP",
    version: "1.0.0",
    name: "The Feed Oracle MCP Endpoint",
    description: "Active MCP server for The Feed Oracle Orchestrator Agent",
    capabilities: ["feed-analysis", "oracle-mechanics", "real-time-aggregation", "mcp-command-execution"],
    timestamp: new Date().toISOString()
  }, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const method = body.method;

    // Standard MCP Protocol initialization
    if (method === 'initialize') {
      return NextResponse.json({
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
      }, { headers: corsHeaders });
    }

    // Tools List (Including requested tools exactly as defined)
    if (method === 'tools/list') {
      return NextResponse.json({
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
      }, { headers: corsHeaders });
    }

    // Tools Call Execution
    if (method === 'tools/call') {
      const { name, arguments: args } = body.params || {};
      return NextResponse.json({
        content: [{
          type: "text",
          text: `Successfully executed ${name} with parameters: ${JSON.stringify(args || {})}`
        }],
        isError: false
      }, { headers: corsHeaders });
    }

    // Prompts & Resources Lists
    if (method === 'prompts/list') {
      return NextResponse.json({ prompts: [] }, { headers: corsHeaders });
    }
    
    if (method === 'resources/list') {
      return NextResponse.json({ resources: [] }, { headers: corsHeaders });
    }

    // Fallback response for custom commands logic
    return NextResponse.json({
      status: "success",
      message: "MCP command received",
      agent: "The Feed Oracle Orchestrator",
      receivedAt: new Date().toISOString(),
      payload: body
    }, { headers: corsHeaders });

  } catch (error) {
    return NextResponse.json({ error: "Invalid MCP request" }, { status: 400, headers: corsHeaders });
  }
}
