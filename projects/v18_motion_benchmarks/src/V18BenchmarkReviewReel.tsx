import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Benchmark1_KineticTypeSlam } from './Benchmark1_KineticTypeSlam';
import { Benchmark2_DotToLineRibbon } from './Benchmark2_DotToLineRibbon';
import { Benchmark3_ShapeMorphToChart } from './Benchmark3_ShapeMorphToChart';
import { Benchmark4_RingTunnelDepth } from './Benchmark4_RingTunnelDepth';
import { Benchmark5_ClichéVsCinematic } from './Benchmark5_ClichéVsCinematic';
import { Shot01_HookV18 } from '../../persian_editorial_motion_test_v18/src/shots/Shot01_HookV18';
import { Shot02_DecreeV18 } from '../../persian_editorial_motion_test_v18/src/shots/Shot02_DecreeV18';
import { Shot03_CriteriaV18 } from '../../persian_editorial_motion_test_v18/src/shots/Shot03_CriteriaV18';
import { Shot04_TimeWindowV18 } from '../../persian_editorial_motion_test_v18/src/shots/Shot04_TimeWindowV18';
import { Shot05_ThresholdsV18 } from '../../persian_editorial_motion_test_v18/src/shots/Shot05_ThresholdsV18';
import { Shot06_OutroV18 } from '../../persian_editorial_motion_test_v18/src/shots/Shot06_OutroV18';

const ReviewBadge: React.FC<{ num: string; title: string }> = ({ num, title }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 40,
      left: 40,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      backgroundColor: 'rgba(7, 9, 14, 0.85)',
      border: '1px solid rgba(212, 175, 55, 0.4)',
      borderRadius: 12,
      padding: '10px 20px',
      color: '#FFFFFF',
      fontFamily: 'system-ui, sans-serif',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
      pointerEvents: 'none',
      zIndex: 9999,
    }}
  >
    <div
      style={{
        backgroundColor: '#D4AF37',
        color: '#07090E',
        fontWeight: 900,
        fontSize: 16,
        padding: '3px 10px',
        borderRadius: 6,
      }}
    >
      {num}
    </div>
    <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.02em' }}>{title}</div>
  </div>
);

/**
 * V18 BENCHMARK REVIEW REEL
 * 11 Excerpts x 90 frames (3.0s each) = 990 frames (33.0s @ 30 FPS)
 * 1. B1 — Kinetic Type Slam
 * 2. B2 — Dot -> Line -> Ribbon
 * 3. B3 — Shape Morph -> Chart
 * 4. B4 — Ring Tunnel
 * 5. B5 — Cliché vs Cinematic
 * 6. Shot 01 — Hook & Attribution Strike
 * 7. Shot 02 — Statute Decree Monolith
 * 8. Shot 03 — Tripartite Criteria Milestone
 * 9. Shot 04 — Calendar Cutoff Collision
 * 10. Shot 05 — Ascending Score Pedestals
 * 11. Shot 06 — Institutional Crest Resolve
 */
export const V18BenchmarkReviewReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      {/* 01. B1 — Kinetic Type Slam (0 - 90f) */}
      <Sequence from={0} durationInFrames={90}>
        <Benchmark1_KineticTypeSlam />
        <ReviewBadge num="01" title="BENCHMARK 1 — Kinetic Type Slam" />
      </Sequence>

      {/* 02. B2 — Dot -> Line -> Ribbon (90 - 180f) */}
      <Sequence from={90} durationInFrames={90}>
        <Benchmark2_DotToLineRibbon />
        <ReviewBadge num="02" title="BENCHMARK 2 — Dot → Line → Ribbon" />
      </Sequence>

      {/* 03. B3 — Shape Morph -> Chart (180 - 270f) */}
      <Sequence from={180} durationInFrames={90}>
        <Benchmark3_ShapeMorphToChart />
        <ReviewBadge num="03" title="BENCHMARK 3 — Shape Morph → Chart" />
      </Sequence>

      {/* 04. B4 — Ring Tunnel (270 - 360f) */}
      <Sequence from={270} durationInFrames={90}>
        <Benchmark4_RingTunnelDepth />
        <ReviewBadge num="04" title="BENCHMARK 4 — Ring Tunnel Depth" />
      </Sequence>

      {/* 05. B5 — Cliché vs Cinematic (360 - 450f) */}
      <Sequence from={360} durationInFrames={90}>
        <Benchmark5_ClichéVsCinematic />
        <ReviewBadge num="05" title="BENCHMARK 5 — Cliché vs Cinematic" />
      </Sequence>

      {/* 06. Shot 01 excerpt: Hero strike at f234 (450 - 540f) */}
      <Sequence from={450} durationInFrames={90}>
        <Sequence from={-180}>
          <Shot01_HookV18 />
        </Sequence>
        <ReviewBadge num="06" title="SHOT 01 — Hook & Attribution Strike" />
      </Sequence>

      {/* 07. Shot 02 excerpt: Decree monolith at f45 (540 - 630f) */}
      <Sequence from={540} durationInFrames={90}>
        <Sequence from={-20}>
          <Shot02_DecreeV18 />
        </Sequence>
        <ReviewBadge num="07" title="SHOT 02 — Statute Decree Monolith" />
      </Sequence>

      {/* 08. Shot 03 excerpt: Criteria GPA lock at f235 (630 - 720f) */}
      <Sequence from={630} durationInFrames={90}>
        <Sequence from={-180}>
          <Shot03_CriteriaV18 />
        </Sequence>
        <ReviewBadge num="08" title="SHOT 03 — Tripartite Criteria Milestone" />
      </Sequence>

      {/* 09. Shot 04 excerpt: Timeline barrier collision at f125 (720 - 810f) */}
      <Sequence from={720} durationInFrames={90}>
        <Sequence from={-80}>
          <Shot04_TimeWindowV18 />
        </Sequence>
        <ReviewBadge num="09" title="SHOT 04 — Calendar Cutoff Collision" />
      </Sequence>

      {/* 10. Shot 05 excerpt: Score Pedestals at f270 (810 - 900f) */}
      <Sequence from={810} durationInFrames={90}>
        <Sequence from={-240}>
          <Shot05_ThresholdsV18 />
        </Sequence>
        <ReviewBadge num="10" title="SHOT 05 — Ascending Score Pedestals" />
      </Sequence>

      {/* 11. Shot 06 excerpt: Seal Crest collision at f40 (900 - 990f) */}
      <Sequence from={900} durationInFrames={90}>
        <Sequence from={-10}>
          <Shot06_OutroV18 />
        </Sequence>
        <ReviewBadge num="11" title="SHOT 06 — Institutional Crest Resolve" />
      </Sequence>
    </AbsoluteFill>
  );
};
