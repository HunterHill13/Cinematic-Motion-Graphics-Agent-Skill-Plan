$renders = @(
  @{ id = "V25-DotToLineFidelity"; out = "renders/v25/V25_01_DOT_TO_LINE_FIDELITY.mp4" },
  @{ id = "V25-HeavyImpact"; out = "renders/v25/V25_02_HEAVY_IMPACT.mp4" },
  @{ id = "V25-ElasticBounce"; out = "renders/v25/V25_03_ELASTIC_BOUNCE.mp4" },
  @{ id = "V25-RigidReconfiguration"; out = "renders/v25/V25_04_RIGID_RECONFIGURATION.mp4" },
  @{ id = "V25-CircleStarMorph"; out = "renders/v25/V25_05_CIRCLE_STAR_MORPH.mp4" },
  @{ id = "V25-LetterGeometryMorph"; out = "renders/v25/V25_06_LETTER_GEOMETRY_MORPH.mp4" },
  @{ id = "V25-BarLineTransform"; out = "renders/v25/V25_07_BAR_LINE_TRANSFORM.mp4" },
  @{ id = "V25-RibbonTunnelMotion"; out = "renders/v25/V25_08_RIBBON_TUNNEL_MOTION.mp4" },
  @{ id = "V25-CameraThroughFidelity"; out = "renders/v25/V25_09_CAMERA_THROUGH_FIDELITY.mp4" },
  @{ id = "V25-KineticTypeSlam"; out = "renders/v25/V25_10_KINETIC_TYPE_SLAM.mp4" },
  @{ id = "V25-ABReview"; out = "renders/v25/V25_AB_REVIEW.mp4" }
)

foreach ($r in $renders) {
  Write-Host "Rendering $($r.id) -> $($r.out)..."
  npx remotion render src/index.ts $r.id $r.out
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed rendering $($r.id)"
    exit 1
  }
}

Write-Host "ALL V25 RENDERS COMPLETED SUCCESSFULLY!"
