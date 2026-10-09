/**
 * ============================================================================
 * CLAUDE MOTION DIRECTOR
 * ============================================================================
 * 
 * High-level director orchestrating prompt-to-video scene architecture
 * in the Claude Motion paradigm:
 * 
 * 1. Hook Scene: Kinetic headline, badge, subtitle, preview container.
 * 2. Concept / Architecture Scene: Multi-node flow diagram with pulse conduits.
 * 3. Evidence / Metrics Scene: Spring-loaded stat cards, gauges, charts.
 * 4. Climax / Resolution Scene: Synthesis, call to action, persistent world.
 * ============================================================================
 */

export interface ClaudeMotionSceneSpec {
  id: string;
  type: 'HOOK' | 'FLOW_DIAGRAM' | 'METRICS' | 'RESOLUTION';
  durationInFrames: number;
  badgeText: string;
  badgeColor: string;
  headlineText: string;
  headlineHighlights: string[];
  subtitleText: string;
}

export interface ClaudeMotionProjectSpec {
  title: string;
  fps: number;
  totalDurationFrames: number;
  scenes: ClaudeMotionSceneSpec[];
}

export class ClaudeMotionDirector {
  /**
   * Generates a calibrated 4-scene narrative specification from a user topic.
   */
  public static planProject(topic: string): ClaudeMotionProjectSpec {
    return {
      title: topic,
      fps: 30,
      totalDurationFrames: 360, // 12 seconds
      scenes: [
        {
          id: 'scene_1_hook',
          type: 'HOOK',
          durationInFrames: 95,
          badgeText: 'AI COGNITIVE ARCHITECTURE',
          badgeColor: '#38bdf8',
          headlineText: 'AUTONOMOUS REASONING IN MOTION',
          headlineHighlights: ['REASONING', 'MOTION'],
          subtitleText: 'Deterministic orchestration across federated model endpoints with sub-millisecond multi-agent routing.',
        },
        {
          id: 'scene_2_flow',
          type: 'FLOW_DIAGRAM',
          durationInFrames: 125,
          badgeText: 'PIPELINE EXECUTION',
          badgeColor: '#818cf8',
          headlineText: 'Federated Multi-Agent Dataflow',
          headlineHighlights: ['Federated', 'Dataflow'],
          subtitleText: 'Continuous packet traversal with verification handoffs at each layer.',
        },
        {
          id: 'scene_3_metrics',
          type: 'METRICS',
          durationInFrames: 95,
          badgeText: 'PERFORMANCE BENCHMARKS',
          badgeColor: '#34d399',
          headlineText: 'Production Reliability & Scale',
          headlineHighlights: ['Reliability', 'Scale'],
          subtitleText: 'Empirically verified metrics under high-throughput concurrent loads.',
        },
        {
          id: 'scene_4_resolution',
          type: 'RESOLUTION',
          durationInFrames: 60,
          badgeText: 'ENTERPRISE READY',
          badgeColor: '#c084fc',
          headlineText: 'THE FUTURE OF AGENTIC MOTION',
          headlineHighlights: ['AGENTIC', 'MOTION'],
          subtitleText: 'Transform ideas, complex architectures, and data into captivating motion pictures with code-level precision.',
        },
      ],
    };
  }
}
