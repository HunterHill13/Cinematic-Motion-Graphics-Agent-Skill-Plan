import { interpolate, Easing } from 'remotion';

export interface DiagramNodeState {
  id: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export interface DiagramEdgeState {
  fromId: string;
  toId: string;
  drawProgress: number;
}

export interface DiagramBuildState {
  nodes: DiagramNodeState[];
  edges: DiagramEdgeState[];
  overallProgress: number;
}

/**
 * MECHANISM: DiagramBuild
 * Progressive assembly of connected graph/schematic topology.
 */
export function calculateDiagramBuild(
  frame: number,
  startFrame: number,
  nodeInterval: number = 8,
  edgeDuration: number = 12,
  nodeConfigs: Array<{ id: string; x: number; y: number }>,
  edgeConfigs: Array<{ fromId: string; toId: string }>
): DiagramBuildState {
  const nodes = nodeConfigs.map((node, i) => {
    const trigger = startFrame + i * nodeInterval;
    if (frame < trigger) {
      return { id: node.id, x: node.x, y: node.y, scale: 0, opacity: 0 };
    }
    const raw = Math.min(1, (frame - trigger) / 10);
    const scale = interpolate(Easing.bezier(0.34, 1.56, 0.64, 1)(raw), [0, 1], [0.2, 1.0]);
    const opacity = interpolate(raw, [0, 0.2, 1], [0, 0.8, 1]);
    return { id: node.id, x: node.x, y: node.y, scale, opacity };
  });

  const edges = edgeConfigs.map((edge, i) => {
    const trigger = startFrame + nodeInterval + i * nodeInterval;
    if (frame < trigger) {
      return { fromId: edge.fromId, toId: edge.toId, drawProgress: 0 };
    }
    const raw = Math.min(1, (frame - trigger) / edgeDuration);
    const drawProgress = Easing.bezier(0.16, 1, 0.3, 1)(raw);
    return { fromId: edge.fromId, toId: edge.toId, drawProgress };
  });

  const totalDuration = nodeConfigs.length * nodeInterval + edgeDuration;
  const overallProgress = Math.min(1, Math.max(0, (frame - startFrame) / totalDuration));

  return { nodes, edges, overallProgress };
}

export interface DiagramDecomposeState {
  fragmentOffsets: Array<{ x: number; y: number; rotate: number; opacity: number }>;
}

/**
 * MECHANISM: DiagramDecompose
 * Disassembles an existing structural layout into dispersing fragments.
 */
export function calculateDiagramDecompose(
  frame: number,
  startFrame: number,
  duration: number,
  fragmentCount: number,
  explosionForce: number = 120
): DiagramDecomposeState {
  if (frame <= startFrame) {
    return {
      fragmentOffsets: Array.from({ length: fragmentCount }).map(() => ({ x: 0, y: 0, rotate: 0, opacity: 1 })),
    };
  }

  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const eased = Easing.bezier(0.2, 0.8, 0.2, 1)(raw);

  const fragmentOffsets = Array.from({ length: fragmentCount }).map((_, i) => {
    const angle = (i * (360 / fragmentCount) * Math.PI) / 180;
    const dist = interpolate(eased, [0, 1], [0, explosionForce + (i % 3) * 30]);
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    const rotate = interpolate(eased, [0, 1], [0, (i % 2 === 0 ? 1 : -1) * 45]);
    const opacity = interpolate(raw, [0, 0.6, 1], [1, 0.7, 0]);
    return { x, y, rotate, opacity };
  });

  return { fragmentOffsets };
}
