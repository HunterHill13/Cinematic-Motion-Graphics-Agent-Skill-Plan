# Generate V16 QC Assets using FFmpeg
$video = "projects/persian_editorial_motion_test_v16/renders/final.mp4"
$qc = "projects/persian_editorial_motion_test_v16/qc"
$frames = "$qc/frames"
$trans = "$qc/transitions"

New-Item -ItemType Directory -Force -Path $frames, $trans | Out-Null

Write-Host "Extracting 12 representative shot frames aligned to V16 acoustic events..."
ffmpeg -y -ss 00:00:03.000 -i $video -vframes 1 -q:v 2 "$frames/f01_shot01_intro.jpg"
ffmpeg -y -ss 00:00:07.800 -i $video -vframes 1 -q:v 2 "$frames/f02_shot01_keyword.jpg"
ffmpeg -y -ss 00:00:13.200 -i $video -vframes 1 -q:v 2 "$frames/f03_shot02_stamp.jpg"
ffmpeg -y -ss 00:00:17.500 -i $video -vframes 1 -q:v 2 "$frames/f04_shot02_decree.jpg"
ffmpeg -y -ss 00:00:28.500 -i $video -vframes 1 -q:v 2 "$frames/f05_shot03_c1_gpa.jpg"
ffmpeg -y -ss 00:00:34.500 -i $video -vframes 1 -q:v 2 "$frames/f06_shot03_c2_stamp.jpg"
ffmpeg -y -ss 00:00:41.500 -i $video -vframes 1 -q:v 2 "$frames/f07_shot03_c3_articles.jpg"
ffmpeg -y -ss 00:00:50.000 -i $video -vframes 1 -q:v 2 "$frames/f08_shot04_timeline.jpg"
ffmpeg -y -ss 00:00:52.500 -i $video -vframes 1 -q:v 2 "$frames/f09_shot04_barrier.jpg"
ffmpeg -y -ss 00:01:04.000 -i $video -vframes 1 -q:v 2 "$frames/f10_shot05_pedestals_rise.jpg"
ffmpeg -y -ss 00:01:10.000 -i $video -vframes 1 -q:v 2 "$frames/f11_shot05_thresholds_peak.jpg"
ffmpeg -y -ss 00:01:14.500 -i $video -vframes 1 -q:v 2 "$frames/f12_shot06_outro_seal.jpg"

Write-Host "Assembling 3x4 Master Contact Sheet via FFmpeg filter_complex..."
ffmpeg -y `
  -i "$frames/f01_shot01_intro.jpg" `
  -i "$frames/f02_shot01_keyword.jpg" `
  -i "$frames/f03_shot02_stamp.jpg" `
  -i "$frames/f04_shot02_decree.jpg" `
  -i "$frames/f05_shot03_c1_gpa.jpg" `
  -i "$frames/f06_shot03_c2_stamp.jpg" `
  -i "$frames/f07_shot03_c3_articles.jpg" `
  -i "$frames/f08_shot04_timeline.jpg" `
  -i "$frames/f09_shot04_barrier.jpg" `
  -i "$frames/f10_shot05_pedestals_rise.jpg" `
  -i "$frames/f11_shot05_thresholds_peak.jpg" `
  -i "$frames/f12_shot06_outro_seal.jpg" `
  -filter_complex "[0:v]scale=640:360[v0];[1:v]scale=640:360[v1];[2:v]scale=640:360[v2];[3:v]scale=640:360[v3];[4:v]scale=640:360[v4];[5:v]scale=640:360[v5];[6:v]scale=640:360[v6];[7:v]scale=640:360[v7];[8:v]scale=640:360[v8];[9:v]scale=640:360[v9];[10:v]scale=640:360[v10];[11:v]scale=640:360[v11];[v0][v1][v2]hstack=inputs=3[row1];[v3][v4][v5]hstack=inputs=3[row2];[v6][v7][v8]hstack=inputs=3[row3];[v9][v10][v11]hstack=inputs=3[row4];[row1][row2][row3][row4]vstack=inputs=4[out]" `
  -map "[out]" -q:v 2 "$qc/contact_sheet_master_v16.jpg"

Write-Host "Extracting V16 transition strips for all 5 Carry Boundaries..."
$transitions = @(
  @{ name="t1_hook_to_decree"; s=11.400; m=11.666; e=12.000 },
  @{ name="t2_decree_to_criteria"; s=20.400; m=20.666; e=21.000 },
  @{ name="t3_criteria_to_timewindow"; s=48.000; m=48.333; e=48.800 },
  @{ name="t4_timewindow_to_thresholds"; s=56.300; m=56.666; e=57.000 },
  @{ name="t5_thresholds_to_outro"; s=71.500; m=71.833; e=72.200 }
)

foreach ($t in $transitions) {
  $n = $t.name
  ffmpeg -y -ss $t.s -i $video -vframes 1 -q:v 2 "$trans/${n}_before.jpg"
  ffmpeg -y -ss $t.m -i $video -vframes 1 -q:v 2 "$trans/${n}_mid.jpg"
  ffmpeg -y -ss $t.e -i $video -vframes 1 -q:v 2 "$trans/${n}_after.jpg"

  ffmpeg -y `
    -i "$trans/${n}_before.jpg" `
    -i "$trans/${n}_mid.jpg" `
    -i "$trans/${n}_after.jpg" `
    -filter_complex "[0:v]scale=640:360[v0];[1:v]scale=640:360[v1];[2:v]scale=640:360[v2];[v0][v1][v2]hstack=inputs=3[out]" `
    -map "[out]" -q:v 2 "$trans/transition_${n}_strip.jpg"
}

Write-Host "Extracting 100% typography crop on Shot 1 Keyphrase..."
ffmpeg -y -i "$frames/f02_shot01_keyword.jpg" -filter_complex "crop=800:450:560:315" -q:v 2 "$qc/crop_100pct_center.jpg"

Write-Host "V16 QC Generation Finished Successfully!"
