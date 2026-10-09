/**
 * ============================================================================
 * CLAUDE MOTION DESIGN SYSTEM: FLOW DIAGRAM & ARCHITECTURE NETWORKS
 * ============================================================================
 * 
 * Signature tech explainer components:
 * - Interactive flow nodes with icon badges and status glows
 * - Curved SVG connection wires with animated traveling light packets
 * - Staggered activation ripples as data passes through each node
 * - Clean architecture hierarchy for AI / software / process explainers
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { GlassContainer } from './GlassContainer';

export interface FlowNodeData {
  id: string;
  title: string;
  subtitle: string;
  iconText?: string;
  color?: string; // hex
  x: number;
  y: number;
  activationFrame?: number;
}

export interface FlowConnection {
  fromId: string;
  toId: string;
  startFrame: number;
  durationFrames?: number;
  color?: string;
}

export interface FlowDiagramProps {
  nodes: FlowNodeData[];
  connections: FlowConnection[];
  delayFrames?: number;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  connections,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Create a map of node coordinates for drawing lines
  const nodeMap = new Map<string, FlowNodeData>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 1. SVG CONNECTION WIRES & TRAVELING DATA PACKETS */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          {connections.map((c, i) => (
            <linearGradient
              key={`grad-${i}`}
              id={`connGrad-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={c.color || '#38bdf8'} stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor={c.color || '#818cf8'} stopOpacity="0.4" />
            </linearGradient>
          ))}
        </defs>

        {connections.map((conn, idx) => {
          const fromNode = nodeMap.get(conn.fromId);
          const toNode = nodeMap.get(conn.toId);
          if (!fromNode || !toNode) return null;

          const duration = conn.durationFrames || 35;
          const p = interpolate(
            frame,
            [conn.startFrame, conn.startFrame + duration],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.inOut(Easing.quad),
            }
          );

          // Bezier control points for smooth organic curve
          const midX = (fromNode.x + toNode.x) / 2;
          const pathD = `M ${fromNode.x} ${fromNode.y} C ${midX} ${fromNode.y}, ${midX} ${toNode.y}, ${toNode.x} ${toNode.y}`;

          // Calculate current packet position along cubic bezier
          const t = p;
          const cx1 = midX;
          const cy1 = fromNode.y;
          const cx2 = midX;
          const cy2 = toNode.y;
          const px =
            Math.pow(1 - t, 3) * fromNode.x +
            3 * Math.pow(1 - t, 2) * t * cx1 +
            3 * (1 - t) * Math.pow(t, 2) * cx2 +
            Math.pow(t, 3) * toNode.x;
          const py =
            Math.pow(1 - t, 3) * fromNode.y +
            3 * Math.pow(1 - t, 2) * t * cy1 +
            3 * (1 - t) * Math.pow(t, 2) * cy2 +
            Math.pow(t, 3) * toNode.y;

          const wireActive = frame >= conn.startFrame;

          return (
            <g key={idx}>
              {/* Background Wire Path */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(255, 255, 255, 0.16)"
                strokeWidth="3"
                strokeDasharray="8 6"
              />

              {/* Active Conduit Glow */}
              {wireActive && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={`url(#connGrad-${idx})`}
                  strokeWidth="4"
                  opacity={p > 0 && p < 1 ? 1.0 : 0.45}
                  filter={`drop-shadow(0 0 8px ${conn.color || '#38bdf8'}88)`}
                />
              )}

              {/* Traveling Light Pulse Packet (High-Intensity Glowing Comet) */}
              {p > 0.01 && p < 0.99 && (
                <g>
                  {/* Outer Atmospheric Aura */}
                  <circle
                    cx={px}
                    cy={py}
                    r="24"
                    fill={conn.color || '#38bdf8'}
                    opacity="0.45"
                    filter="blur(6px)"
                  />
                  {/* Medium Core Glow */}
                  <circle
                    cx={px}
                    cy={py}
                    r="12"
                    fill={conn.color || '#38bdf8'}
                    opacity="0.8"
                    filter={`drop-shadow(0 0 12px ${conn.color || '#38bdf8'})`}
                  />
                  {/* Pin-Sharp White Hot Nucleus */}
                  <circle
                    cx={px}
                    cy={py}
                    r="6.5"
                    fill="#ffffff"
                    filter="drop-shadow(0 0 4px #ffffff)"
                  />
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* 2. NODES (GLASS CARDS) */}
      {nodes.map((node, i) => {
        const nodeDelay = delayFrames + i * 8;
        const isActivated =
          node.activationFrame !== undefined && frame >= node.activationFrame;

        // Activation pulse scale
        let pulseScale = 1.0;
        let pulseGlow = '0 0 20px rgba(56, 189, 248, 0.2)';
        if (node.activationFrame && frame >= node.activationFrame) {
          const actFrame = frame - node.activationFrame;
          if (actFrame < 25) {
            pulseScale = 1.0 + Math.sin((actFrame / 25) * Math.PI) * 0.08;
            pulseGlow = `0 0 35px ${node.color || '#38bdf8'}88`;
          }
        }

        return (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: node.x,
              top: node.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <GlassContainer
              width={260}
              height={100}
              delayFrames={nodeDelay}
              accentColor={node.color || '#38bdf8'}
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `scale(${pulseScale})`,
                boxShadow: pulseGlow,
                border: isActivated
                  ? `1.5px solid ${node.color || '#38bdf8'}`
                  : '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              {/* Node Icon Badge */}
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  backgroundColor: `${node.color || '#38bdf8'}22`,
                  border: `1px solid ${node.color || '#38bdf8'}55`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 800,
                  color: node.color || '#38bdf8',
                  boxShadow: `0 0 12px ${node.color || '#38bdf8'}33`,
                  flexShrink: 0,
                }}
              >
                {node.iconText || '⚡'}
              </div>

              {/* Node Labels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#ffffff',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {node.title}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#94a3b8',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {node.subtitle}
                </span>
              </div>
            </GlassContainer>
          </div>
        );
      })}
    </div>
  );
};
